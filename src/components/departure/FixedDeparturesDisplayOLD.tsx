// src/components/FixedDeparturesDisplay.tsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { fetchDeparturesData } from '../services/swuService'; // Ensure this path is correct
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material'; // Type-only import for SelectChangeEvent

// Utility function for loading route icons
const loadRouteIcon = (routeNumber: string, callback: (url: string | null) => void) => {
  const imageUrl = `/icons/Linie_${routeNumber}_Pikto.gif`;
  const fallbackUrl = '/icons/tram_logo.png';

  const img = new Image();

  img.onload = () => callback(imageUrl);
  img.onerror = () => {
    // Try to load the fallback image
    const fallbackImg = new Image();
    fallbackImg.onload = () => callback(fallbackUrl);
    fallbackImg.onerror = () => {
      console.error('Both primary and fallback route icons failed to load.');
      callback(null); // or fallbackUrl again, or a placeholder
    };
    fallbackImg.src = fallbackUrl;
  };

  img.src = imageUrl;
};

interface Departure {
  RouteNumber: string;
  DepartureTimeScheduled: string;
  DepartureDirectionText: string;
  DepartureDeviation: number;
}

// Define interface for a stop option
interface StopOption {
  id: string;
  name: string;
}

// Define props interface for the component
interface FixedDeparturesDisplayProps {
  allStops: StopOption[]; // New prop: list of all available stops
  initialStopId?: string; // New prop: the initially selected stop ID for this instance
}

// Define the refresh duration (15 minutes in milliseconds)
const MAX_REFRESH_DURATION = 15 * 60 * 1000; // 15 minutes, as per original intent

const FixedDeparturesDisplay: React.FC<FixedDeparturesDisplayProps> = ({ allStops, initialStopId }) => {
  // State for the currently selected stop ID for THIS display
  const [selectedStopId, setSelectedStopId] = useState<string>(
    initialStopId || (allStops.length > 0 ? allStops[0].id : '')
  );

  // Derive the selected stop name based on selectedStopId
  // const selectedStopName = allStops.find(stop => stop.id === selectedStopId)?.name || 'Select Stop'; // No longer directly used for display

  const [departures, setDepartures] = useState<Departure[]>([]);
  const [routeIcons, setRouteIcons] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTimerExpired, setRefreshTimerExpired] = useState(false); // New state for timer expiration
  const [currentTime, setCurrentTime] = useState(new Date()); // State for current time for countdown

  const componentRef = useRef<HTMLDivElement>(null);
  const refreshIntervalIdRef = useRef<NodeJS.Timeout | null>(null); // Ref to store interval ID for data fetch
  const countdownIntervalIdRef = useRef<NodeJS.Timeout | null>(null); // Ref to store interval ID for countdown
  const refreshTimeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Ref to store timeout ID for max refresh duration
  const [componentWidth, setComponentWidth] = useState(0);

  const COUNTDOWN_HIDE_BREAKPOINT = 200; // Renamed for clarity, applies to countdown now
  const TEXT_TRUNCATE_BREAKPOINT = 280;

  const showCountdown = componentWidth > COUNTDOWN_HIDE_BREAKPOINT;
  const truncateDirectionText = componentWidth <= TEXT_TRUNCATE_BREAKPOINT;

  // Function to fetch departures
  // Now takes selectedStopId from state
  const getDepartures = useCallback(async (initialLoad: boolean = false) => {
    if (!selectedStopId) {
      setError("No stop selected.");
      setIsLoading(false);
      setDepartures([]);
      return;
    }

    // Only attempt to fetch if the refresh timer hasn't expired
    if (!initialLoad && refreshTimerExpired) {
      console.log(`Refresh limit reached for stop ${selectedStopId}, not fetching new departures.`);
      return;
    }

    if (initialLoad) {
      setIsLoading(true);
      setError(null);
    }

    try {
      const fetchedDepartures = await fetchDeparturesData(selectedStopId); // Use selectedStopId
      setDepartures(fetchedDepartures);
      setError(null);
    } catch (err) {
      console.error(`Error fetching departures for stop ${selectedStopId}:`, err);
      if (departures.length === 0 || initialLoad) {
        setError("Failed to load departure data.");
      }
    } finally {
      if (initialLoad) {
        setIsLoading(false);
      }
    }
  }, [selectedStopId, refreshTimerExpired, departures.length]); // Added selectedStopId to dependencies

  // Effect for initial fetch and setting up data refresh interval
  useEffect(() => {
    // Clear existing intervals/timeouts on stopId change or unmount
    if (refreshIntervalIdRef.current) {
      clearInterval(refreshIntervalIdRef.current);
      refreshIntervalIdRef.current = null;
    }
    if (refreshTimeoutIdRef.current) {
      clearTimeout(refreshTimeoutIdRef.current);
      refreshTimeoutIdRef.current = null;
    }

    // Reset refresh timer expired state when stopId changes
    setRefreshTimerExpired(false);

    // Only fetch if a stop is selected
    if (selectedStopId) {
      getDepartures(true); // Initial fetch for the newly selected stop

      refreshIntervalIdRef.current = setInterval(() => {
        if (!refreshTimerExpired) { // Check state before fetching
          getDepartures(false);
        }
      }, 15000); // Refresh every 15 seconds

      refreshTimeoutIdRef.current = setTimeout(() => {
        setRefreshTimerExpired(true);
        console.log(`15-minute refresh limit reached for stop ${selectedStopId}. Automatic refreshing stopped.`);
        if (refreshIntervalIdRef.current) {
          clearInterval(refreshIntervalIdRef.current);
          refreshIntervalIdRef.current = null;
        }
      }, MAX_REFRESH_DURATION);
    } else {
      // If no stop is selected, ensure no data is shown and loading is off
      setDepartures([]);
      setIsLoading(false);
      setError("No stop selected.");
    }


    // Cleanup function: clear both data refresh interval and max refresh timeout on unmount or stopId change
    return () => {
      if (refreshIntervalIdRef.current) {
        clearInterval(refreshIntervalIdRef.current);
        refreshIntervalIdRef.current = null;
      }
      if (refreshTimeoutIdRef.current) {
        clearTimeout(refreshTimeoutIdRef.current);
        refreshTimeoutIdRef.current = null;
      }
    };
  }, [selectedStopId, refreshTimerExpired, getDepartures]); // Added selectedStopId to dependencies

  // Effect for updating current time for countdown
  useEffect(() => {
    countdownIntervalIdRef.current = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update current time every second

    // Cleanup function: clear countdown interval on unmount
    return () => {
      if (countdownIntervalIdRef.current) {
        clearInterval(countdownIntervalIdRef.current);
        countdownIntervalIdRef.current = null;
      }
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  // Effect for loading route icons
  useEffect(() => {
    departures.forEach(dep => {
      if (!routeIcons[dep.RouteNumber]) {
        loadRouteIcon(dep.RouteNumber, (url) => {
          if (url) {
            setRouteIcons(prev => ({ ...prev, [dep.RouteNumber]: url }));
          }
        });
      }
    });
  }, [departures, routeIcons]);

  // Effect for observing component width
  useEffect(() => {
    if (!componentRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.contentBoxSize) {
          setComponentWidth(entry.contentBoxSize[0].inlineSize);
        } else {
          setComponentWidth(entry.contentRect.width);
        }
      }
    });

    resizeObserver.observe(componentRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Function to format countdown time
  const formatCountdown = (scheduledTimeStr: string, deviationSeconds: number): string => {
    const scheduledDate = new Date(scheduledTimeStr);
    // Calculate the actual departure time by adding the deviation
    const actualDepartureTime = new Date(scheduledDate.getTime() + deviationSeconds * 1000);
    const diffMs = actualDepartureTime.getTime() - currentTime.getTime();
    const diffSeconds = Math.round(diffMs / 1000);

    if (diffSeconds <= -60) {
      // If departure was more than a minute ago
      return 'Abgefahren';
    } else if (diffSeconds < 0) {
      // If departure was within the last minute
      return 'Jetzt';
    } else if (diffSeconds < 60) {
      // Less than a minute until departure
      return `in ${diffSeconds} s`;
    } else if (diffSeconds < 60 * 60) {
      // Less than an hour until departure (show in minutes)
      const minutes = Math.ceil(diffSeconds / 60);
      return `in ${minutes} min`;
    } else {
      // More than an hour until departure, show scheduled time
      return actualDepartureTime.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  const handleStopChange = (event: SelectChangeEvent<string>) => {
    setSelectedStopId(event.target.value as string);
  };

  return (
    <div ref={componentRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 relative flex-shrink-0">
      <h2 className="text-xl font-bold mb-3 border-b pb-2 text-gray-900 dark:text-white flex items-center justify-between">
        {/* Material-UI Select for stop selection */}
        <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
          <Select
            labelId="stop-select-label"
            id="stop-select"
            value={selectedStopId}
            onChange={handleStopChange}
            label="Haltestelle"
            disableUnderline // Remove the default underline for standard variant
            sx={{
              color: 'inherit', // Inherit text color from parent
              fontSize: '1.25rem', // Match h2 text size
              fontWeight: 'bold', // Match h2 font weight
              '& .MuiSelect-select': {
                paddingTop: '0', // Adjust padding to make it compact
                paddingBottom: '0', // Adjust padding to make it compact
              },
              '& .MuiSvgIcon-root': {
                color: 'inherit', // Inherit arrow color
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: 'background.paper', // Ensures dropdown background is correct in dark mode
                  color: 'text.primary', // Ensures text color is correct
                },
              },
            }}
          >
            {allStops.map((stop) => (
              <MenuItem key={stop.id} value={stop.id}>
                {stop.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {!isLoading && !refreshTimerExpired && selectedStopId ? ( // Show live indicator if not loading, timer not expired, and stop selected
          <span
            className="w-3 h-3 bg-gray-400 rounded-full animate-pulse flex-shrink-0 ml-2"
            title="Live-Daten werden alle 15 Sekunden aktualisiert"
          ></span>
        ) : !isLoading && refreshTimerExpired && selectedStopId ? ( // Show message if not loading, timer expired, and stop selected
          <span className="text-sm text-gray-600 dark:text-gray-300 flex-shrink-0 ml-2" title="Datenaktualisierung pausiert, da 15 Minuten seit der letzten Aktualisierung vergangen sind.">
            inaktiv
          </span>
        ) : null // Don't show anything during initial loading or if no stop selected
        }
      </h2>

      {/* Conditional rendering based on selectedStopId */}
      {!selectedStopId ? (
        <div className="text-center text-gray-600 dark:text-gray-300">Please select a stop.</div>
      ) : (
        <>
          {/* Initial loading message (only shown when no data is present yet) */}
          {isLoading && departures.length === 0 && (
            <div className="text-center text-gray-600 dark:text-gray-300">Lade Abfahrten...</div>
          )}

          {/* Error message (only shown if there's no data AND an error occurred) */}
          {error && departures.length === 0 && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-700 text-red-700 dark:text-red-300 px-4 py-3 rounded relative mb-3" role="alert">
              <strong className="font-bold">Fehler: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* No departures message (only shown if not loading and no error, and no departures) */}
          {!isLoading && !error && departures.length === 0 && (
            <div className="text-gray-600 dark:text-gray-300">Keine bevorstehenden Abfahrten.</div>
          )}

          {/* Main content: Always render if departures array has data, regardless of refreshing status */}
          {departures.length > 0 && (
            // Removed pr-2 from ul. Added scrollbar-gutter to ul for better scrollbar handling.
            <ul className="space-y-2 max-h-[220px] overflow-y-auto scrollbar-gutter">
              {departures.slice(0, 8).map((dep, i) => {
                // Format the countdown based on actual departure time
                const countdownText = formatCountdown(dep.DepartureTimeScheduled, dep.DepartureDeviation);

                const scheduledTimeFormatted = new Date(dep.DepartureTimeScheduled).toLocaleTimeString('de-DE', {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                const deviation = dep.DepartureDeviation || 0;
                const absDeviation = Math.abs(deviation);
                const delayMinutes = Math.floor(absDeviation / 60);
                const delaySeconds = absDeviation % 60;

                let deviationText = '';
                if (absDeviation > 30) { // Only show if deviation is larger than 30 seconds
                    if (absDeviation < 60) { // If less than 1 minute, only show seconds
                        deviationText = deviation > 0 ? `(+${delaySeconds}s)` : `(-${delaySeconds}s)`;
                    } else {
                        deviationText =
                            deviation > 0
                                ? `(+${delayMinutes}min ${delaySeconds}s)`
                                : `(-${delayMinutes}min ${delaySeconds}s)`;
                    }
                } else {
                    deviationText = ''; // Show nothing if deviation is 30s or less
                }

                return (
                  // Added px-1 to li for internal padding.
                  <li key={i} className="border-b dark:border-gray-700 pb-2 last:border-none">
                    {/* Added pr-4 to this div to ensure space for the scrollbar */}
                    <div className="flex items-center gap-2 text-sm pr-4">
                      <img
                        src={routeIcons[dep.RouteNumber] || '/icons/tram_logo.png'}
                        alt={`Linie ${dep.RouteNumber}`}
                        className="w-6 h-6 flex-shrink-0"
                      />
                      <div className="flex flex-col flex-grow min-w-0">
                        <span
                          className={`font-medium text-gray-900 dark:text-white ${truncateDirectionText ? 'truncate' : ''}`}
                        >
                          {dep.DepartureDirectionText}
                        </span>
                        {/* Display the scheduled time below the direction for clarity, now including conditional deviation */}
                        <span className="text-gray-600 dark:text-gray-300 text-xs">
                          {scheduledTimeFormatted} {deviationText}
                        </span>
                      </div>
                      {showCountdown && ( // Show countdown if component width allows
                        <span
                          className={`font-semibold text-sm flex-shrink-0 ${
                            countdownText === 'Abgefahren' || countdownText === 'Jetzt'
                              ? 'text-gray-500 dark:text-gray-400' // Grey for past/current
                              : 'text-gray-700 dark:text-gray-400' // Standard color for future countdown
                          }`}
                        >
                          {countdownText}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default FixedDeparturesDisplay;
// src/components/FixedDeparturesDisplay.tsx
import React, { useEffect, useState, useRef } from 'react';
import { fetchDeparturesData } from '../services/swuService';

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

// Define props interface for the component
interface FixedDeparturesDisplayProps {
  stopId: string;
  stopName: string; // Add stopName as a prop for dynamic titles
}

// Define the refresh duration (15 minutes in milliseconds)
const MAX_REFRESH_DURATION = 5 * 60 * 1000; // 5 minutes

const FixedDeparturesDisplay: React.FC<FixedDeparturesDisplayProps> = ({ stopId, stopName }) => {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [routeIcons, setRouteIcons] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTimerExpired, setRefreshTimerExpired] = useState(false); // New state for timer expiration

  const componentRef = useRef<HTMLDivElement>(null);
  const refreshIntervalIdRef = useRef<NodeJS.Timeout | null>(null); // Ref to store interval ID
  const refreshTimeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Ref to store timeout ID
  const [componentWidth, setComponentWidth] = useState(0);

  const DEVIATION_HIDE_BREAKPOINT = 200;
  const TEXT_TRUNCATE_BREAKPOINT = 280;

  const showDeviation = componentWidth > DEVIATION_HIDE_BREAKPOINT;
  const truncateDirectionText = componentWidth <= TEXT_TRUNCATE_BREAKPOINT;

  // Function to fetch departures
  const getDepartures = async (initialLoad: boolean = false) => {
    // Only attempt to fetch if the refresh timer hasn't expired
    if (!initialLoad && refreshTimerExpired) {
      console.log('Refresh limit reached, not fetching new departures.');
      return;
    }

    if (initialLoad) {
      setIsLoading(true);
      setError(null);
    } // We don't need a separate 'isRefreshing' state for UI, as old data stays
      // and the live indicator handles the "activity" status.

    try {
      const fetchedDepartures = await fetchDeparturesData(stopId);
      setDepartures(fetchedDepartures);
      setError(null);
    } catch (err) {
      console.error(`Error fetching departures for stop ${stopId}:`, err);
      if (departures.length === 0 || initialLoad) {
        setError("Failed to load departure data.");
      }
    } finally {
      if (initialLoad) {
        setIsLoading(false);
      }
    }
  };

  // Effect for initial fetch and setting up interval
  useEffect(() => {
    getDepartures(true); // Initial fetch

    // Store interval ID in ref
    refreshIntervalIdRef.current = setInterval(() => {
      // Only refresh if the timer has not expired
      if (!refreshTimerExpired) {
        getDepartures(false);
      } else {
        // If expired, clear the interval immediately if not already cleared
        if (refreshIntervalIdRef.current) {
          clearInterval(refreshIntervalIdRef.current);
          refreshIntervalIdRef.current = null;
        }
      }
    }, 15000); // Refresh every 15 seconds

    // Set up the 15-minute timeout
    refreshTimeoutIdRef.current = setTimeout(() => {
      setRefreshTimerExpired(true);
      console.log('15-minute refresh limit reached. Automatic refreshing stopped.');
      // Clear the interval when timeout is reached
      if (refreshIntervalIdRef.current) {
        clearInterval(refreshIntervalIdRef.current);
        refreshIntervalIdRef.current = null;
      }
    }, MAX_REFRESH_DURATION);

    // Cleanup function: clear both interval and timeout on unmount
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
  }, [stopId, refreshTimerExpired]); // Add refreshTimerExpired to dependencies to react to its change

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

  return (
    <div ref={componentRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 relative flex-shrink-0">
      <h2 className="text-xl font-bold mb-3 border-b pb-2 text-gray-900 dark:text-white flex items-center justify-between">
        <span>{stopName}</span>
        {!isLoading && !refreshTimerExpired ? ( // Show live indicator if not loading and timer not expired
          <span
            className="w-3 h-3 bg-gray-400 rounded-full animate-pulse flex-shrink-0" // Added flex-shrink-0
            title="Live data refreshing"
          ></span>
        ) : !isLoading && refreshTimerExpired ? ( // Show message if not loading and timer expired
          <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0" title="Automatic refresh stopped after 15 minutes">
            inaktiv
          </span>
        ) : null // Don't show anything during initial loading
        }
      </h2>

      {/* Initial loading message (only shown when no data is present yet) */}
      {isLoading && departures.length === 0 && (
        <div className="text-center text-gray-600 dark:text-gray-300">Lade Abfahrten...</div>
      )}

      {/* Error message (only shown if there's no data AND an error occurred) */}
      {error && departures.length === 0 && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded relative mb-3" role="alert">
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
        <ul className="space-y-2">
          {departures.slice(0, 4).map((dep, i) => {
            const scheduled = new Date(dep.DepartureTimeScheduled).toLocaleTimeString('de-DE', {
              hour: '2-digit',
              minute: '2-digit',
            });
            const deviation = dep.DepartureDeviation || 0;
            const delayMinutes = Math.floor(Math.abs(deviation) / 60);
            const delaySeconds = Math.abs(deviation % 60);
            const delayText =
              deviation > 0
                ? `+${delayMinutes}min ${delaySeconds}s`
                : deviation < 0
                  ? `-${delayMinutes}min ${delaySeconds}s`
                  : 'Pünktlich';

            return (
              <li key={i} className="border-b dark:border-gray-700 pb-2 last:border-none">
                <div className="flex items-center gap-2 text-sm">
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
                    <span className="text-gray-600 dark:text-gray-300 text-xs">{scheduled}</span>
                  </div>
                  {showDeviation && (
                    <span
                      className={`font-semibold text-sm flex-shrink-0 ${
                        deviation > 0
                          ? 'text-red-600'
                          : deviation < 0
                            ? 'text-green-600'
                            : 'text-gray-700 dark:text-gray-400'
                      }`}
                    >
                      {delayText}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FixedDeparturesDisplay;
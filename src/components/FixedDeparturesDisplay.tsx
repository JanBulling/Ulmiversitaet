// src/components/FixedDeparturesDisplay.tsx
import React, { useEffect, useState } from 'react';
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

const FixedDeparturesDisplay: React.FC<FixedDeparturesDisplayProps> = ({ stopId, stopName }) => {
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [routeIcons, setRouteIcons] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true); // Keep initial isLoading true
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDepartures = async () => {
      setIsLoading(true); // Set loading to true when starting fetch
      setError(null);
      try {
        const fetchedDepartures = await fetchDeparturesData(stopId);
        setDepartures(fetchedDepartures);
      } catch (err) {
        console.error(`Error fetching departures for stop ${stopId}:`, err);
        setError("Failed to load departure data.");
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes (success or error)
      }
    };

    // Initial fetch
    getDepartures();

    // Set up interval for refreshing departures
    const intervalId = setInterval(getDepartures, 15000); // Refresh every 15 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [stopId]); // Add stopId to dependency array, re-fetch if it changes

  useEffect(() => {
    // Load route icons for all departures
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

  return (
    // Changed background to bg-white dark:bg-gray-800 for dark mode compatibility
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 relative flex-shrink-0">
      {/* Title font: text-gray-900 dark:text-white */}
      <h2 className="text-xl font-bold mb-3 border-b pb-2 text-gray-900 dark:text-white">
        {stopName}
      </h2>

      {isLoading && (
        <div className="text-center text-gray-600 dark:text-gray-300">Lade Abfahrten...</div>
      )}

      {error && (
        <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded relative mb-3" role="alert">
          <strong className="font-bold">Fehler: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {!isLoading && !error && departures.length === 0 && (
        <div className="text-gray-600 dark:text-gray-300">Keine bevorstehenden Abfahrten.</div>
      )}

      {!isLoading && !error && departures.length > 0 && (
        <ul className="space-y-2">
          {departures.slice(0, 4).map((dep, i) => { // Display only 3 departures
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
              // Border color will also need dark mode adjustment if it's visible
              <li key={i} className="border-b dark:border-gray-700 pb-2 last:border-none">
                <div className="flex items-center gap-2 text-sm">
                  <img
                    src={routeIcons[dep.RouteNumber] || '/icons/tram_logo.png'} // Fallback icon
                    alt={`Linie ${dep.RouteNumber}`}
                    className="w-6 h-6 flex-shrink-0"
                  />
                  <div className="flex flex-col flex-grow">
                    {/* Direction text: text-gray-900 dark:text-white */}
                    <span className="font-medium text-gray-900 dark:text-white">{dep.DepartureDirectionText}</span>
                    {/* Scheduled time text: text-gray-600 dark:text-gray-300 */}
                    <span className="text-gray-600 dark:text-gray-300 text-xs">{scheduled}</span>
                  </div>
                  <span
                    className={`font-semibold text-sm ${
                      deviation > 0
                        ? 'text-red-600' // Delays usually stay red
                        : deviation < 0
                          ? 'text-green-600' // Early usually stays green
                          : 'text-gray-700 dark:text-gray-400' // Pünktlich needs dark mode color
                    }`}
                  >
                    {delayText}
                  </span>
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
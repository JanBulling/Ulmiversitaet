// src/components/DepartureListItem.tsx
import React from 'react';
import type { Departure } from '../departure/types'; // Assuming types are defined
import { formatCountdown, getDeviationText } from '../departure/utils/timeFormatters';

interface DepartureListItemProps {
  departures: Departure[]; // This component now receives an array (group) of departures
  routeIconUrl: string | null;
  currentTime: Date;
  showCountdown: boolean;
  truncateDirectionText: boolean;
}

const DepartureListItem: React.FC<DepartureListItemProps> = ({
  departures,
  routeIconUrl,
  currentTime,
  showCountdown,
  truncateDirectionText,
}) => {
  if (!departures || departures.length === 0) {
    return null;
  }

  const mainDeparture = departures[0]; // For main info like direction and route icon

  // Calculate countdown once for the main departure
  const countdownText = formatCountdown(mainDeparture.DepartureTimeScheduled, mainDeparture.DepartureDeviation, currentTime);

  // Helper function to format time, with deviation directly added
  const formatTimeSlot = (dep: Departure, index: number) => {
    const scheduledTime = new Date(dep.DepartureTimeScheduled);
    let effectiveDepartureTime = new Date(scheduledTime); // Start with scheduled time

    // Add deviation in seconds to the scheduled time if it exists
    if (dep.DepartureDeviation !== null && dep.DepartureDeviation !== undefined) {
      effectiveDepartureTime.setSeconds(scheduledTime.getSeconds() + dep.DepartureDeviation);
    }

    // Format the effective departure time to show only hour and minute
    const effectiveDepartureTimeFormatted = effectiveDepartureTime.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <React.Fragment key={index}>
        {index > 0 && <span className="text-gray-400 dark:text-gray-500 mx-1">|</span>}
        <span className="flex items-center gap-0.5 font-mono">
          {effectiveDepartureTimeFormatted}
          {/* *** REMOVED Deviation Indicator Here as per your last instruction *** */}
        </span>
      </React.Fragment>
    );
  };

  return (
    <li className="border-b dark:border-gray-700 pb-2 last:border-none">
      <div className="flex items-center gap-2 text-sm pr-4">
        <img
          src={routeIconUrl || ''}
          alt={`Linie ${mainDeparture.RouteNumber}`}
          className="w-6 h-6 flex-shrink-0"
        />
        <div className="flex flex-col flex-grow min-w-0">
          <span
            className={`font-medium text-gray-900 dark:text-white ${truncateDirectionText ? 'truncate' : ''}`}
          >
            {mainDeparture.DepartureDirectionText}
          </span>
          <span className="text-gray-600 dark:text-gray-300 text-xs flex flex-wrap items-center">
            {departures.map(formatTimeSlot)} {/* Use the simplified formatter */}
          </span>
        </div>
        {showCountdown && (
          <span
            className={`font-semibold text-sm flex-shrink-0
              ${countdownText === 'Abgefahren' || countdownText === 'Jetzt'
                ? 'text-gray-500 dark:text-gray-400'
                : 'text-gray-700 dark:text-gray-400'
              }`
            }
          >
            {countdownText}
          </span>
        )}
      </div>
    </li>
  );
};

export default DepartureListItem;
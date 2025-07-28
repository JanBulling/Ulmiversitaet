// src/components/DepartureListItem.tsx
import React from 'react';
import type { Departure } from '../departure/types'; // Assuming types are defined
import { formatCountdown, getDeviationText } from '../departure/utils/timeFormatters';

interface DepartureListItemProps {
  departure: Departure;
  routeIconUrl: string | null;
  currentTime: Date;
  showCountdown: boolean;
  truncateDirectionText: boolean;
}

const DepartureListItem: React.FC<DepartureListItemProps> = ({
  departure,
  routeIconUrl,
  currentTime,
  showCountdown,
  truncateDirectionText,
}) => {
  const countdownText = formatCountdown(departure.DepartureTimeScheduled, departure.DepartureDeviation, currentTime);
  const scheduledTimeFormatted = new Date(departure.DepartureTimeScheduled).toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const deviationText = getDeviationText(departure.DepartureDeviation || 0);

  return (
    <li className="border-b dark:border-gray-700 pb-2 last:border-none">
      <div className="flex items-center gap-2 text-sm pr-4">
        {/* Fallback to a default image if routeIconUrl is null or undefined */}
        <img
          src={routeIconUrl || '/icons/tram_logo.png'} // Ensure '/icons/tram_logo.png' exists or choose another fallback
          alt={`Linie ${departure.RouteNumber}`}
          className="w-6 h-6 flex-shrink-0"
        />
        <div className="flex flex-col flex-grow min-w-0">
          <span
            className={`font-medium text-gray-900 dark:text-white ${truncateDirectionText ? 'truncate' : ''}`}
          >
            {departure.DepartureDirectionText}
          </span>
          <span className="text-gray-600 dark:text-gray-300 text-xs">
            {scheduledTimeFormatted} {deviationText}
          </span>
        </div>
        {showCountdown && (
          <span
            className={`font-semibold text-sm flex-shrink-0
              ${countdownText === 'Abgefahren'
                ? 'text-gray-500 dark:text-gray-400'
                : countdownText === 'Jetzt' // Apply pulse animation and primary color for "Jetzt"
                  ? 'text-primary animate-pulse-now' // <--- Key change here
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
// src/components/FixedDeparturesDisplay.tsx
import React, { useRef } from 'react';
import type { SelectChangeEvent } from '@mui/material'; // Type-only import

import { useDepartures } from '../hooks/useDepartures';
import { useRouteIcons } from '../hooks/useRouteIcons';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { useComponentWidth } from '../hooks/useComponentWidth';

import StopSelector from './StopSelector';
import DepartureListItem from './DepartureListItem';

import type { StopOption } from '../components/types'; // Assuming types are defined here

// Define props interface for the component
interface FixedDeparturesDisplayProps {
  allStops: StopOption[];
  initialStopId?: string;
}

const COUNTDOWN_HIDE_BREAKPOINT = 200;
const TEXT_TRUNCATE_BREAKPOINT = 280;

const FixedDeparturesDisplay: React.FC<FixedDeparturesDisplayProps> = ({ allStops, initialStopId }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  // Use custom hooks for data and logic
  const {
    selectedStopId,
    setSelectedStopId,
    departures,
    isLoading,
    error,
    refreshTimerExpired,
  } = useDepartures({ initialStopId, allStops });

  const routeIcons = useRouteIcons(departures);
  const currentTime = useCurrentTime();
  const componentWidth = useComponentWidth(componentRef);

  const showCountdown = componentWidth > COUNTDOWN_HIDE_BREAKPOINT;
  const truncateDirectionText = componentWidth <= TEXT_TRUNCATE_BREAKPOINT;

  const handleStopChange = (event: SelectChangeEvent<string>) => {
    setSelectedStopId(event.target.value as string);
  };

  return (
    <div ref={componentRef} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 relative flex-shrink-0">
      <h2 className="text-xl font-bold mb-3 border-b pb-2 text-gray-900 dark:text-white flex items-center justify-between">
        <StopSelector
          selectedStopId={selectedStopId}
          allStops={allStops}
          onStopChange={handleStopChange}
        />

        {!isLoading && !refreshTimerExpired && selectedStopId ? (
          <span
            className="w-3 h-3 bg-gray-400 rounded-full animate-pulse flex-shrink-0 ml-2"
            title="Live-Daten werden alle 15 Sekunden aktualisiert"
          ></span>
        ) : !isLoading && refreshTimerExpired && selectedStopId ? (
          <span className="text-sm text-gray-600 dark:text-gray-300 flex-shrink-0 ml-2" title="Datenaktualisierung pausiert, da 15 Minuten seit der letzten Aktualisierung vergangen sind.">
            inaktiv
          </span>
        ) : null
        }
      </h2>

      {!selectedStopId ? (
        <div className="text-center text-gray-600 dark:text-gray-300">Please select a stop.</div>
      ) : (
        <>
          {isLoading && departures.length === 0 && (
            <div className="text-center text-gray-600 dark:text-gray-300">Lade Abfahrten...</div>
          )}

          {error && departures.length === 0 && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-700 text-red-700 dark:text-red-300 px-4 py-3 rounded relative mb-3" role="alert">
              <strong className="font-bold">Fehler: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {!isLoading && !error && departures.length === 0 && (
            <div className="text-gray-600 dark:text-gray-300">Keine bevorstehenden Abfahrten.</div>
          )}

          {departures.length > 0 && (
            <ul className="space-y-2 max-h-[220px] overflow-y-auto scrollbar-gutter">
              {departures.slice(0, 8).map((dep, i) => (
                <DepartureListItem
                  key={i}
                  departure={dep}
                  routeIconUrl={routeIcons[dep.RouteNumber]}
                  currentTime={currentTime}
                  showCountdown={showCountdown}
                  truncateDirectionText={truncateDirectionText}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default FixedDeparturesDisplay;
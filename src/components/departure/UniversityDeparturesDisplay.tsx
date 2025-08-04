// src/components/UniversityDeparturesDisplay.tsx
import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useDepartures } from '../departure/hooks/useDepartures';
import { useRouteIcons } from '../departure/hooks/useRouteIcons';
import { useComponentWidth } from '../departure/hooks/useComponentWidth';

import DepartureListItem from './DepartureListItem';

import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter
} from '../ui/dialog';
import type { StopOption } from '../departure/types';

interface UniversityDeparturesDisplayProps {
  allStops: StopOption[];
}

const COUNTDOWN_HIDE_BREAKPOINT = 200;
const TEXT_TRUNCATE_BREAKPOINT = 280;
const MAX_TAB_LABEL_LENGTH = 14; // Max characters for the custom tab label

// Helper function for text truncation
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
};

const UniversityDeparturesDisplay: React.FC<UniversityDeparturesDisplayProps> = ({ allStops }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const uniSuedStopId = '1240';
  const uniWestStopId = '1246';

  const customStopTabValue = 'custom-stop-selection';

  const [currentStopId, setCurrentStopId] = useState<string>(uniSuedStopId);
  const [activeTabValue, setActiveTabValue] = useState<string>(uniSuedStopId);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const {
    selectedStopId,
    departures,
    isLoading,
    error,
    refreshTimerExpired,
  } = useDepartures({ initialStopId: currentStopId, allStops });

  const routeIcons = useRouteIcons(departures);
  const componentWidth = useComponentWidth(componentRef);

  const showCountdown = componentWidth > COUNTDOWN_HIDE_BREAKPOINT;
  const truncateDirectionText = componentWidth <= TEXT_TRUNCATE_BREAKPOINT;

  // --- START: Changes for live countdown ---
  // 1. useState to hold the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // 2. useEffect to update currentTime every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every 1000ms (1 second)

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount
  // --- END: Changes for live countdown ---

  const displayedStopForCustomTab = useMemo(() => {
    return allStops.find(stop => stop.id === currentStopId);
  }, [allStops, currentStopId]);

  const getCustomTabLabel = useMemo(() => {
    if (currentStopId && currentStopId !== uniSuedStopId && currentStopId !== uniWestStopId) {
      const label = displayedStopForCustomTab ? displayedStopForCustomTab.name : "Ausgewählte Haltestelle";
      return truncateText(label, MAX_TAB_LABEL_LENGTH);
    }
    return "Mehr...";
  }, [currentStopId, uniSuedStopId, uniWestStopId, displayedStopForCustomTab]);

  const filteredStops = useMemo(() => {
    if (!searchTerm) {
      return allStops;
    }
    const lowercasedSearchTerm = searchTerm.trim().toLowerCase();
    if (lowercasedSearchTerm.length === 0) {
        return allStops;
    }
    return allStops.filter(stop =>
      stop.name.trim().toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [allStops, searchTerm]);


  const renderDepartureContent = useMemo(() => {
    if (!currentStopId) {
      return <div className="text-center text-muted-foreground">Bitte eine Haltestelle auswählen.</div>;
    }

    if (isLoading && departures.length === 0) {
      return <div className="text-center text-muted-foreground">Lade Abfahrten...</div>;
    }

    if (error && departures.length === 0) {
      return (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded relative mb-3" role="alert">
          <strong className="font-bold">Fehler: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      );
    }

    if (!isLoading && !error && departures.length === 0) {
      return <div className="text-muted-foreground">Keine bevorstehenden Abfahrten.</div>;
    }

    if (departures.length > 0) {
      return (
        <ul className="space-y-2 max-h-[220px] overflow-y-auto scrollbar-gutter">
          {departures.slice(0, 10).map((dep, i) => (
            <DepartureListItem
              key={i}
              departure={dep}
              routeIconUrl={routeIcons[dep.RouteNumber]}
              currentTime={currentTime} // Pass the continuously updating currentTime
              showCountdown={showCountdown}
              truncateDirectionText={truncateDirectionText}
            />
          ))}
        </ul>
      );
    }

    return null;
  }, [currentStopId, isLoading, departures, error, routeIcons, currentTime, showCountdown, truncateDirectionText]); // currentTime is now a dependency

  const handleStopSelect = (stopId: string) => {
    setCurrentStopId(stopId);
    if (stopId === uniSuedStopId) {
      setActiveTabValue(uniSuedStopId);
    } else if (stopId === uniWestStopId) {
      setActiveTabValue(uniWestStopId);
    } else {
      setActiveTabValue(customStopTabValue);
    }
    setIsDialogOpen(false);
    setSearchTerm('');
  };

  // Effect to manage body overflow for dialog
  useEffect(() => {
    if (isDialogOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    // Cleanup function
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isDialogOpen]);

  return (
    <div ref={componentRef} className="bg-background rounded-xl shadow-xl p-4 relative flex-shrink-0">
      {/* Title Echtzeit-ÖPNV and Live Activity Ball to the right of the whole window */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
          {/* New Tram SVG Icon from user */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-8 text-primary" // Tailwind classes handle size and color
          >
            <rect x="5" y="5" width="14" height="15" rx="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 2H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 16H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 5L12 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 22L8.00001 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 22L16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Echtzeit-ÖPNV
        </h2>
        {/* Live Activity Monitor - Moved to the right */}
        <div className="w-5 h-5 flex items-center justify-center">
          {selectedStopId ? (
                <svg
                width="24"
                height="26"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-24 rotate-90 text-primary"
                >
                <style>
                    {`
                    .wave {
                        stroke: currentColor;
                        stroke-width: 1.5;
                        stroke-linecap: round;
                        fill: none;
                    }

                    .wave--small {
                        animation: pulse-small 2s infinite ease-in-out;
                    }

                    .wave--big {
                        animation: pulse-big 2s infinite ease-in-out;
                    }

                    @keyframes pulse-small {
                        0%   { stroke-opacity: 0.3; transform: scale(0.95); }
                        20%  { stroke-opacity: 0.9; transform: scale(1); }
                        50%  { stroke-opacity: 0.5 }
                        100% { stroke-opacity: 0.3; transform: scale(0.95); }
                    }

                    @keyframes pulse-big {
                        0%   { stroke-opacity: 0.3; transform: scale(0.95); }
                        35%  { stroke-opacity: 0.9; transform: scale(0.95); }
                        50%  { stroke-opacity: 0.5; transform: scale(1); }
                        80%  { stroke-opacity: 0.25; }
                        100% { stroke-opacity: 0.3; transform: scale(0.95); }
                    }
                    `}
                </style>

                <path
                    d="M5.2 10.5C5.2 7.84905 7.34903 5.70001 10 5.70001"
                    className="wave wave--small"
                />
                <path
                    d="M2 10.5C2 6.08172 5.58172 2.5 10 2.5"
                    className="wave wave--big"
                />
                </svg>
          ) : (
            <span className="w-3 h-3"></span>
          )}
        </div>
      </div>

      {/* Error and Loading messages */}
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded relative mb-3" role="alert">
          <strong className="font-bold">Fehler: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {isLoading && departures.length === 0 && !error && (
        <div className="text-center text-muted-foreground mb-3">Lade Abfahrten...</div>
      )}

      {!currentStopId && !isLoading && !error && (
        <div className="text-center text-muted-foreground mb-3">Bitte eine Haltestelle auswählen.</div>
      )}

      {/* Tab Bar and Dialog */}
      <div className="flex items-center justify-between border-b pb-2 mb-3">
        <Tabs value={activeTabValue} onValueChange={(value) => {
          if (value !== customStopTabValue) {
            setCurrentStopId(value);
            setActiveTabValue(value);
          }
        }} className="flex-grow">
          <TabsList className="grid grid-cols-3 bg-secondary text-secondary-foreground">
            <TabsTrigger value={uniSuedStopId}>Uni Süd</TabsTrigger>
            <TabsTrigger value={uniWestStopId}>Uni West</TabsTrigger>
            <TabsTrigger
              value={customStopTabValue}
              onClick={() => setIsDialogOpen(true)}
            >
              {getCustomTabLabel}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* The Dialog component itself with search functionality */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] max-h-[50vh] sm:max-h-[80vh] flex flex-col rounded-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle>Alle Haltestellen</DialogTitle>
            <DialogDescription>
              Wähle eine Haltestelle aus der Liste.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto pr-4 flex-grow">
            <ul className="space-y-2">
              {filteredStops.length > 0 ? (
                filteredStops.map(stop => (
                  <li key={stop.id}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left text-foreground text-lg px-3 py-2 h-auto bg-primary/5"
                      onClick={() => handleStopSelect(stop.id)}
                    >
                      {stop.name}
                    </Button>
                  </li>
                ))
              ) : (
                <li className="text-center text-muted-foreground py-4">Keine Haltestellen gefunden.</li>
              )}
            </ul>
          </div>
          <div className="mt-4">
            <Input
              placeholder="Haltestelle suchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // ADDED: Ensuring font-size is at least 16px to prevent iOS zoom
              className="w-full text-base"
              autoFocus={false}
            />
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Schließen
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Departure Content */}
      {renderDepartureContent}
    </div>
  );
};

export default UniversityDeparturesDisplay;
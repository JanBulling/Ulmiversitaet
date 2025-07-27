// src/hooks/useDepartures.ts
// This hook fetches and manages real-time public transport departures for a selected stop,
// including automatic refreshing and handling loading/error states,
// adapting to either external stop control (props) or internal selection.
import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchDeparturesData } from '../services/swuService';
import type { Departure, StopOption } from '../types';

const MAX_REFRESH_DURATION = 15 * 60 * 1000; // 15 minutes

interface UseDeparturesOptions {
  initialStopId?: string; // Optional: provided by external source (like Tabs)
  allStops?: StopOption[]; // Optional: for internal selection (like dropdown)
}

interface UseDeparturesResult {
  selectedStopId: string; // The currently active stop ID (either initialStopId prop or internal state)
  setSelectedStopId: (stopId: string) => void; // Function to update the stop ID (only if not controlled by initialStopId prop)
  departures: Departure[];
  isLoading: boolean;
  error: string | null;
  refreshTimerExpired: boolean;
}

export const useDepartures = ({ initialStopId, allStops }: UseDeparturesOptions): UseDeparturesResult => {
  // Determine the effective stop ID the hook should use.
  // If initialStopId is provided from props, it takes precedence.
  // Otherwise, we use an internal state that can be managed by setSelectedStopId.
  const [internalSelectedStopId, setInternalSelectedStopId] = useState<string>(() => {
    if (initialStopId) {
      return initialStopId;
    }
    if (allStops && allStops.length > 0) {
      return allStops[0].id;
    }
    return '';
  });

  // The actual selectedStopId that the hook will operate on.
  // If initialStopId prop is provided, we use that directly.
  // Otherwise, we use the internal state.
  const currentActiveStopId = initialStopId || internalSelectedStopId;

  const [departures, setDepartures] = useState<Departure[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTimerExpired, setRefreshTimerExpired] = useState(false);

  const refreshIntervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const refreshTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  // Function to set the stop ID, only if not controlled by initialStopId prop
  const handleSetSelectedStopId = useCallback((stopId: string) => {
    if (!initialStopId) { // Only allow internal state change if prop isn't controlling it
      setInternalSelectedStopId(stopId);
    }
    // If initialStopId is provided, this function effectively does nothing,
    // as the control is external (via the prop).
  }, [initialStopId]);


  const getDepartures = useCallback(async (stopIdToFetch: string, initialLoad: boolean = false) => {
    if (!stopIdToFetch) {
      setError("No stop selected.");
      setIsLoading(false);
      setDepartures([]);
      return;
    }

    if (!initialLoad && refreshTimerExpired) {
       return;
    }

    if (initialLoad) {
      setIsLoading(true);
      setError(null);
    }

    try {
      const fetchedDepartures = await fetchDeparturesData(stopIdToFetch);
      setDepartures(fetchedDepartures);
      setError(null);
    } catch (err) {
      console.error(`Error fetching departures for stop ${stopIdToFetch}:`, err);
      if (departures.length === 0 || initialLoad) {
        setError("Failed to load departure data.");
      }
    } finally {
      if (initialLoad) {
        setIsLoading(false);
      }
    }
  }, [refreshTimerExpired, departures.length]);


  useEffect(() => {
    // This useEffect will run whenever currentActiveStopId changes,
    // ensuring data is fetched for the newly selected stop (either from tab or dropdown).
    
    // Cleanup previous timers
    if (refreshIntervalIdRef.current) {
      clearInterval(refreshIntervalIdRef.current);
      refreshIntervalIdRef.current = null;
    }
    if (refreshTimeoutIdRef.current) {
      clearTimeout(refreshTimeoutIdRef.current);
      refreshTimeoutIdRef.current = null;
    }

    setRefreshTimerExpired(false); // Reset expiration on new stop selection

    if (currentActiveStopId) {
      getDepartures(currentActiveStopId, true); // Initial fetch for the new stop

      // Set up refresh interval
      refreshIntervalIdRef.current = setInterval(() => {
        // Use the latest currentActiveStopId when refreshing
        getDepartures(currentActiveStopId, false);
      }, 15000);

      // Set up overall refresh timeout
      refreshTimeoutIdRef.current = setTimeout(() => {
        setRefreshTimerExpired(true);
         if (refreshIntervalIdRef.current) {
          clearInterval(refreshIntervalIdRef.current);
          refreshIntervalIdRef.current = null;
        }
      }, MAX_REFRESH_DURATION);
    } else {
      // If no stop is selected, clear departures and set appropriate state
      setDepartures([]);
      setIsLoading(false);
      setError("No stop selected.");
    }

    // Cleanup function for when the component unmounts or dependencies change
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
  }, [currentActiveStopId, getDepartures]);

  return {
    selectedStopId: currentActiveStopId, // Expose the currently active stop ID
    setSelectedStopId: handleSetSelectedStopId, // Expose the setter for internal control
    departures,
    isLoading,
    error,
    refreshTimerExpired
  };
};
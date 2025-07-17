// src/hooks/useDepartures.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchDeparturesData } from '../services/swuService';
import type { Departure, StopOption } from '../types'; // Assuming types are defined

const MAX_REFRESH_DURATION = 15 * 60 * 1000; // 15 minutes

interface UseDeparturesOptions {
  initialStopId?: string;
  allStops: StopOption[];
}

interface UseDeparturesResult {
  selectedStopId: string;
  setSelectedStopId: (stopId: string) => void;
  departures: Departure[];
  isLoading: boolean;
  error: string | null;
  refreshTimerExpired: boolean;
}

export const useDepartures = ({ initialStopId, allStops }: UseDeparturesOptions): UseDeparturesResult => {
  const [selectedStopId, setSelectedStopId] = useState<string>(
    initialStopId || (allStops.length > 0 ? allStops[0].id : '')
  );
  const [departures, setDepartures] = useState<Departure[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTimerExpired, setRefreshTimerExpired] = useState(false);

  const refreshIntervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const refreshTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const getDepartures = useCallback(async (initialLoad: boolean = false) => {
    if (!selectedStopId) {
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
      const fetchedDepartures = await fetchDeparturesData(selectedStopId);
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
  }, [selectedStopId, refreshTimerExpired, departures.length]);

  useEffect(() => {
    if (refreshIntervalIdRef.current) {
      clearInterval(refreshIntervalIdRef.current);
      refreshIntervalIdRef.current = null;
    }
    if (refreshTimeoutIdRef.current) {
      clearTimeout(refreshTimeoutIdRef.current);
      refreshTimeoutIdRef.current = null;
    }

    setRefreshTimerExpired(false);

    if (selectedStopId) {
      getDepartures(true);

      refreshIntervalIdRef.current = setInterval(() => {
        if (!refreshTimerExpired) {
          getDepartures(false);
        }
      }, 15000);

      refreshTimeoutIdRef.current = setTimeout(() => {
        setRefreshTimerExpired(true);
         if (refreshIntervalIdRef.current) {
          clearInterval(refreshIntervalIdRef.current);
          refreshIntervalIdRef.current = null;
        }
      }, MAX_REFRESH_DURATION);
    } else {
      setDepartures([]);
      setIsLoading(false);
      setError("No stop selected.");
    }

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
  }, [selectedStopId, refreshTimerExpired, getDepartures]);

  return { selectedStopId, setSelectedStopId, departures, isLoading, error, refreshTimerExpired };
};
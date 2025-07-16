import { useState, useEffect, useRef } from 'react';

const SWU_DEPARTURES_API_URL = 'https://api.swu.de/mobility/v1/stop/passage/Departures';

export const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const serverTimeRef = useRef<Date>(new Date());

  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const response = await fetch(SWU_DEPARTURES_API_URL);
        const data = await response.json();
        const timestampStr = data?.StopPassage?.CurrentTimestamp;
        const parsed = new Date(timestampStr);

        if (!isNaN(parsed.getTime())) {
          serverTimeRef.current = parsed;
          startTimeRef.current = Date.now();
          setCurrentTime(parsed);
        } else {
          console.warn("Invalid CurrentTimestamp from SWU API.");
        }
      } catch (error) {
        console.error("Failed to fetch SWU server time. Falling back to device time.", error);
      }
    };

    fetchServerTime();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const updated = new Date(serverTimeRef.current.getTime() + elapsed);
      setCurrentTime(updated);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return currentTime;
};
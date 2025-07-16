// src/hooks/useRouteIcons.ts
import { useState, useEffect } from 'react';
import { loadRouteIcon } from '../components/utils/iconLoader'; // Adjust the import path as necessary
import type { Departure } from '../components/types'; // Assuming Departure type is defined in types

export const useRouteIcons = (departures: Departure[]) => {
  const [routeIcons, setRouteIcons] = useState<{ [key: string]: string }>({});

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
  }, [departures, routeIcons]); // Add routeIcons to deps to ensure re-evaluation when new icons are added

  return routeIcons;
};
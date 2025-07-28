// src/hooks/useRouteIcons.ts
import { useState, useEffect } from 'react';
import type { Departure } from '../types';
import lineColorData from '../utils/lineColors.json'; // Import the JSON data

/**
 * Generates an SVG data URL for a given route number.
 * The SVG will be a square for routes "1" and "2", and a circle for others.
 * It will display the route number in white text on the appropriate line color,
 * or a fallback white background with a black border and black text.
 */
const generateRouteIcon = (routeNumber: string): string => {
  const defaultBgColor = '#FFFFFF';
  const defaultBorderColor = '#000000';
  const defaultTextColor = '#000000';

  let bgColor = lineColorData[routeNumber as keyof typeof lineColorData];
  let textColor = '#FFFFFF';
  let borderColor = 'transparent';

  if (!bgColor) {
    bgColor = defaultBgColor;
    borderColor = defaultBorderColor;
    textColor = defaultTextColor;
  }

  const isSquare = routeNumber === "1" || routeNumber === "2" || routeNumber === "202" || routeNumber === "201";
  const size = 40;
  const fontSize = 31; // Slightly larger
  const fontWeight = "400"; // Thinner

  if (routeNumber === "202" || routeNumber === "201") {
    bgColor = '#FFFFFF'; // Specific color for route 202
    textColor = '#000000'; // Black text for better contrast
    routeNumber = 'S';
  } 

  let svgShape: string;
  if (isSquare) {
    svgShape = `<rect x="0" y="0" width="${size}" height="${size}" fill="${bgColor}" stroke="${borderColor}" stroke-width="2"/>`;
  } else {
    svgShape = `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${bgColor}" stroke="${borderColor}" stroke-width="2"/>`;
  }

  const svgText = `<text x="50%" y="50%" fill="${textColor}" font-size="${fontSize}" font-weight="${fontWeight}" font-family="sans-serif" text-anchor="middle" dominant-baseline="central">${routeNumber}</text>`;

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${svgShape}${svgText}</svg>`;

  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
};


export const useRouteIcons = (departures: Departure[]) => {
  const [routeIcons, setRouteIcons] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const routesToProcess = new Set<string>();

    departures.forEach(dep => {
      if (!routeIcons[dep.RouteNumber]) {
        routesToProcess.add(dep.RouteNumber);
      }
    });

    if (routesToProcess.size > 0) {
      setRouteIcons(prevIcons => {
        const updatedIcons = { ...prevIcons };
        routesToProcess.forEach(routeNum => {
          updatedIcons[routeNum] = generateRouteIcon(routeNum);
        });
        return updatedIcons;
      });
    }
  }, [departures, routeIcons]);

  return routeIcons;
};
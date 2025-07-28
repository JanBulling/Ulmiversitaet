// src/services/swuService.ts

import type { Departure } from '../types';

const SWU_DEPARTURES_API_BASE_URL =
  'https://api.swu.de/mobility/v1/stop/passage/Departures?Limit=10&StopNumber=';

/**
 * Interface for a single departure object as it comes directly from the SWU API.
 * This directly reflects the structure you provided in the raw JSON.
 */
interface ApiDeparture {
  StopPointNumber: number;
  StopPointCode: string;
  PlatformName: string;
  VehicleNumber: number | null;
  VehicleCategory: number | null;
  RouteNumber: number; // API gives this as a number
  RouteName: string;
  Status: number;
  DepartureDirectionText: string; // <-- CORRECT NAME, as found in API response
  DepartureTimeScheduled: string; // ISO 8601 string with timezone offset
  DepartureTimeActual: string;    // ISO 8601 string with timezone offset
  DepartureCountdown: number;     // Seconds until departure
  DepartureDeviation: number;     // Deviation in seconds (API provides this directly!)
  CurrentTimestamp: string; // ISO 8601 string with timezone offset
  // Adding [key: string]: any; for any other unexpected properties
  [key: string]: any;
}

/**
 * Interface for the overall API response structure.
 */
interface ApiResponse {
  StopPassage?: {
    ServiceCategory: string;
    UpdateInterval: string;
    ContentScope: string;
    StopNumber: number;
    StopCode: string;
    StopName: string;
    Limit: number;
    OrderedBy: string;
    State: string;
    CurrentTimestamp: string;
    DepartureData?: ApiDeparture[];
  };
}

/**
 * Helper function to parse an API date string into a Date object.
 * The API provides ISO 8601 strings, so new Date() handles them directly.
 * This function primarily adds null/undefined safety and logging.
 *
 * @param dateString The date string from the API (e.g., "2025-07-16T23:00:00+02:00").
 * @returns A valid Date object, or an 'Invalid Date' object if the string is empty/null or parsing fails.
 */
function parseApiDateString(dateString: string | undefined): Date {
  if (!dateString) {
    console.warn("parseApiDateString: Received undefined or empty date string. Returning Invalid Date.");
    return new Date(NaN);
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error(`parseApiDateString: Failed to parse "${dateString}" into a valid Date object. Result: ${date}`);
  }
  return date;
}

export async function fetchDeparturesData(stopNr: string): Promise<Departure[]> {
  const response = await fetch(`${SWU_DEPARTURES_API_BASE_URL}${stopNr}`);
  if (!response.ok) {
    throw new Error(`HTTP-Fehler! Status: ${response.status}`);
  }

  const data: ApiResponse = await response.json();

  const mappedDepartures: Departure[] = data?.StopPassage?.DepartureData?.map(apiDep => {
    // API dates are already in ISO 8601 with timezone, so new Date() parses them directly.
    // Use the helper for safety/logging.
    const plannedDate = parseApiDateString(apiDep.DepartureTimeScheduled);
    const actualDate = parseApiDateString(apiDep.DepartureTimeActual); // Use actual for calculation if needed
    const currentTimestamp = parseApiDateString(apiDep.CurrentTimestamp);
    // The API already provides DepartureDeviation, so we can use it directly!
    const departureDeviation = apiDep.DepartureDeviation;
    
    return {
      RouteNumber: String(apiDep.RouteNumber), // Ensure RouteNumber is a string as per your type
      DepartureTimeScheduled: isNaN(plannedDate.getTime()) ? '' : plannedDate.toISOString(), // Store as reliable ISO string
      DepartureDirectionText: apiDep.DepartureDirectionText, // Directly use the correct API property
      DepartureDeviation: departureDeviation, // Use the deviation provided by API
      CurrentTimestamp: isNaN(currentTimestamp.getTime()) ? new Date() : currentTimestamp, // Use current timestamp from API
    };
  }) || [];

  return mappedDepartures;
}
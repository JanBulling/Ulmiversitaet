// src/types/index.ts

// Defines the structure for a single public transport departure
export interface Departure {
  RouteNumber: string;
  DepartureTimeScheduled: string; // e.g., "2025-07-16T22:45:00Z"
  DepartureDirectionText: string; // e.g., "Hauptbahnhof"
  DepartureDeviation: number;     // Deviation from scheduled time in seconds (e.g., 60 for +1 minute)
}

// Defines the structure for an option in your stop selection dropdown
export interface StopOption {
  id: string;   // Unique identifier for the stop (e.g., "stop123")
  name: string; // Display name of the stop (e.g., "Münsterplatz")
}
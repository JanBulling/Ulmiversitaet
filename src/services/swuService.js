// src/services/swuService.js
const SWU_STOPS_API_URL = 'https://api.swu.de/mobility/v1/stop/attributes/BaseData';
const SWU_VEHICLE_TRIP_API_URL = 'https://api.swu.de/mobility/v1/vehicle/trip/Trip';
const SWU_DEPARTURES_API_BASE_URL = 'https://api.swu.de/mobility/v1/stop/passage/Departures?Limit=4&StopNumber=';


export async function fetchStopData() {
  const response = await fetch(SWU_STOPS_API_URL);
  if (!response.ok) {
    throw new Error(`HTTP-Fehler! Status: ${response.status}`);
  }
  const data = await response.json();
  if (data?.StopAttributes?.StopData?.length) {
    return data.StopAttributes.StopData.map(stopData => ({
      id: stopData.StopNumber,
      name: stopData.StopName,
      latitude: stopData.StopCoordinates.Latitude,
      longitude: stopData.StopCoordinates.Longitude,
      platform: stopData.PlatformName, // Kept this comment here from original
    })).filter(s => s.latitude && s.longitude);
  } else {
    console.warn('Keine Haltestellendaten oder unerwartetes Format.', data);
    return [];
  }
}

export async function fetchDeparturesData(stopNr) {
  const response = await fetch(`${SWU_DEPARTURES_API_BASE_URL}${stopNr}`);
  if (!response.ok) {
    throw new Error(`HTTP-Fehler! Status: ${response.status}`);
  }
  const data = await response.json();
  return data?.StopPassage?.DepartureData || [];
}

export async function fetchAllVehiclePositions() {
  const response = await fetch(SWU_VEHICLE_TRIP_API_URL);
  if (!response.ok) {
    throw new Error(`HTTP-Fehler beim Abrufen der Trip-Daten! Status: ${response.status}`);
  }
  const data = await response.json();
  if (!data?.VehicleTrip?.TripData?.length) {
    console.warn('Keine oder ungültige Trip-Daten empfangen:', data);
    return [];
  }

  return data.VehicleTrip.TripData
    .filter(v => v.IsActive && v.PositionData)
    .map(v => ({
      id: v.VehicleNumber,
      latitude: v.PositionData.Latitude,
      longitude: v.PositionData.Longitude,
      routeNumber: v.JourneyData?.RouteNumber,
      directionText: v.JourneyData?.DepartureDirectionText,
      bearing: v.PositionData?.Bearing,
      category: v.VehicleCategory,
      deviation: v.TimeData?.Deviation || 0
    }));
}
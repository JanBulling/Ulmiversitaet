// src/services/swuService.js
const SWU_DEPARTURES_API_BASE_URL = 'https://api.swu.de/mobility/v1/stop/passage/Departures?Limit=10&StopNumber=';




export async function fetchDeparturesData(stopNr) {
  const response = await fetch(`${SWU_DEPARTURES_API_BASE_URL}${stopNr}`);
  if (!response.ok) {
    throw new Error(`HTTP-Fehler! Status: ${response.status}`);
  }
  const data = await response.json();
  return data?.StopPassage?.DepartureData || [];
}
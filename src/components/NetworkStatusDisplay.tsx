// src/components/NetworkStatusDisplay.tsx
import React, { useState, useEffect } from 'react';

// IP-Bereiche für Uni Ulm VPN (wie zuvor)
const UniUlmVpnIpRanges = [
  '134.60.240.0/23',
  '134.60.246.0/23',
  '134.60.248.0/22'
];

// NEU: IP-Bereiche für Uni Ulm Eduroam
const EduroamIpRanges = [
  '134.60.0.0/16',      // Größerer Bereich für Uni Ulm, der auch Eduroam umfassen sollte
  '193.197.64.0/22'     // Spezifischerer Eduroam-Bereich
];

// Helper to check if an IP is within a CIDR range
const isIpInCidr = (ip: string, cidr: string): boolean => {
  try {
    const [range, bitsStr] = cidr.split('/');
    const bits = parseInt(bitsStr || '32', 10);
    const ipNum = ip.split('.').reduce((acc, octet) => (acc << 8) | parseInt(octet, 10), 0) >>> 0;
    const rangeNum = range.split('.').reduce((acc, octet) => (acc << 8) | parseInt(octet, 10), 0) >>> 0;
    const mask = bits === 0 ? 0 : (-1 << (32 - bits)) >>> 0;
    return (ipNum & mask) === (rangeNum & mask);
  } catch (e) {
    console.error(`Error checking IP ${ip} against CIDR ${cidr}:`, e);
    return false;
  }
};

const NetworkStatusDisplay: React.FC = () => {
  // State für den Verbindungstyp: 'none', 'vpn', 'eduroam'
  const [connectionType, setConnectionType] = useState<'none' | 'vpn' | 'eduroam'>('none');

  useEffect(() => {
    const fetchNetworkStatus = async () => {
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        if (!ipResponse.ok) throw new Error(`Fehler beim Abrufen der IP (${ipResponse.status})`);
        
        const { ip } = await ipResponse.json();

        // Prüfen, ob die IP im VPN-Bereich liegt (Priorität 1)
        const isInVpnRange = UniUlmVpnIpRanges.some(range => isIpInCidr(ip, range) || ip === range);
        // Prüfen, ob die IP im Eduroam-Bereich liegt (Priorität 2, falls nicht VPN)
        const isInEduroamRange = EduroamIpRanges.some(range => isIpInCidr(ip, range) || ip === range);

        if (isInVpnRange) {
          setConnectionType('vpn');
        } else if (isInEduroamRange) {
          setConnectionType('eduroam');
        } else {
          setConnectionType('none'); // Keine der bekannten Verbindungen
        }
      } catch (err: any) {
        console.error("Netzwerkstatus-Fehler:", err.message);
        setConnectionType('none'); // Bei Fehler oder unbekanntem Status: keine Verbindung
      }
    };

    fetchNetworkStatus(); // Initialer Abruf beim Laden
    const interval = setInterval(fetchNetworkStatus, 5 * 60 * 1000); // Alle 5 Minuten aktualisieren

    return () => clearInterval(interval); // Aufräumen beim Unmount der Komponente
  }, []); // Leeres Dependency-Array bedeutet, dass dieser Effekt nur einmal beim Mounten ausgeführt wird

  // --- Bedingtes Rendering ---
  // Nur rendern, wenn eine VPN- oder Eduroam-Verbindung erkannt wurde
  if (connectionType !== 'none') {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-card rounded-md shadow-md">
        {/* Grünes Häkchen-Icon für beide verbundenen Zustände */}
        <svg className="text-green-500" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span>
          {connectionType === 'vpn'
            ? 'Verbunden mit Uni Ulm VPN'
            : 'Verbunden mit Eduroam (Uni Ulm)'}
        </span>
      </div>
    );
  }

  // Wenn keine bekannte Verbindung (connectionType ist 'none'), wird nichts gerendert
  return null;
};

export default NetworkStatusDisplay;
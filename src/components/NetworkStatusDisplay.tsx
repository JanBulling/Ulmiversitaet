// src/components/NetworkStatusDisplay.tsx
import React, { useState, useEffect } from 'react';

// Replace with actual IP ranges from Uni Ulm / BelWü
const BelWueIpRanges = [
  '134.60.240.0/23',
  '134.60.246.0/23',
  '134.60.248.0/22'
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
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchNetworkStatus = async () => {
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        if (!ipResponse.ok) throw new Error(`Fehler beim Abrufen der IP (${ipResponse.status})`);
        
        const { ip } = await ipResponse.json();
        const isInRange = BelWueIpRanges.some(range => isIpInCidr(ip, range) || ip === range);
        setIsConnected(isInRange);
      } catch (err: any) {
        console.error("Netzwerkstatus-Fehler:", err.message);
        setIsConnected(false); // Assume not connected on error
      }
    };

    fetchNetworkStatus(); // Initial fetch
    const interval = setInterval(fetchNetworkStatus, 5 * 60 * 1000); // Re-fetch every 5 minutes

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // --- Conditional Rendering ---
  // Only render the component if isConnected is true
  if (isConnected) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 bg-card rounded-md shadow-md">
        <svg className="text-green-500" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <span>Verbunden mit Uni-Netzwerk</span>
      </div>
    );
  }

  // If not connected, return null (show nothing)
  return null;
};

export default NetworkStatusDisplay;
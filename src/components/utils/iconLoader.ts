// src/utils/iconLoader.ts
const loadRouteIcon = (routeNumber: string, callback: (url: string | null) => void) => {
  const imageUrl = `/icons/Linie_${routeNumber}_Pikto.gif`;
  const fallbackUrl = '/icons/tram_logo.png';

  const img = new Image();

  img.onload = () => callback(imageUrl);
  img.onerror = () => {
    const fallbackImg = new Image();
    fallbackImg.onload = () => callback(fallbackUrl);
    fallbackImg.onerror = () => {
      console.error('Both primary and fallback route icons failed to load.');
      callback(null);
    };
    fallbackImg.src = fallbackUrl;
  };

  img.src = imageUrl;
};

export { loadRouteIcon };
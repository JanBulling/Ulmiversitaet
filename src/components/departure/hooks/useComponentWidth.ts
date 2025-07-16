import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

// Change the type of the ref parameter to allow HTMLElement | null
export const useComponentWidth = (ref: RefObject<HTMLElement | null>) => { // <--- CHANGE IS HERE
  const [componentWidth, setComponentWidth] = useState(0);

  useEffect(() => {
    // Crucially, check if ref.current is null before observing
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (entry.contentBoxSize) {
          setComponentWidth(entry.contentBoxSize[0].inlineSize);
        } else {
          setComponentWidth(entry.contentRect.width);
        }
      }
    });

    resizeObserver.observe(ref.current);

    return () => {
      // Ensure current exists before disconnecting
      if (ref.current) { // <--- ADDED NULL CHECK HERE FOR SAFETY
        resizeObserver.disconnect();
      }
    };
  }, [ref]); // Dependency array should include ref

  return componentWidth;
};
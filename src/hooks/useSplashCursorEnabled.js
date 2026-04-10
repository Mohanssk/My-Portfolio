import { useEffect, useState } from 'react';

const DESKTOP_MIN_WIDTH = 1024;
const MIN_MEMORY_GB = 4;
const MIN_LOGICAL_CORES = 4;

function shouldEnableSplashCursor() {
  if (typeof window === 'undefined') {
    return false;
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    return false;
  }

  if (window.innerWidth < DESKTOP_MIN_WIDTH) {
    return false;
  }

  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  if (coarsePointer) {
    return false;
  }

  if (navigator.maxTouchPoints > 0) {
    return false;
  }

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection?.saveData) {
    return false;
  }

  if (connection?.effectiveType && /(^2g$|slow-2g)/i.test(connection.effectiveType)) {
    return false;
  }

  if (typeof navigator.deviceMemory === 'number' && navigator.deviceMemory < MIN_MEMORY_GB) {
    return false;
  }

  if (
    typeof navigator.hardwareConcurrency === 'number' &&
    navigator.hardwareConcurrency <= MIN_LOGICAL_CORES
  ) {
    return false;
  }

  return true;
}

function addMediaListener(mediaQueryList, callback) {
  if (typeof mediaQueryList.addEventListener === 'function') {
    mediaQueryList.addEventListener('change', callback);
    return () => mediaQueryList.removeEventListener('change', callback);
  }

  mediaQueryList.addListener(callback);
  return () => mediaQueryList.removeListener(callback);
}

function useSplashCursorEnabled() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const updateEnabled = () => {
      setIsEnabled(shouldEnableSplashCursor());
    };

    updateEnabled();

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');

    const removeReducedMotionListener = addMediaListener(reducedMotionQuery, updateEnabled);
    const removeCoarsePointerListener = addMediaListener(coarsePointerQuery, updateEnabled);

    window.addEventListener('resize', updateEnabled, { passive: true });

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (typeof connection?.addEventListener === 'function') {
      connection.addEventListener('change', updateEnabled);
    }

    return () => {
      removeReducedMotionListener();
      removeCoarsePointerListener();
      window.removeEventListener('resize', updateEnabled);

      if (typeof connection?.removeEventListener === 'function') {
        connection.removeEventListener('change', updateEnabled);
      }
    };
  }, []);

  return isEnabled;
}

export default useSplashCursorEnabled;

// src/utils/timeFormatters.ts
export const formatCountdown = (scheduledTimeStr: string, deviationSeconds: number, currentTime: Date): string => {
  const scheduledDate = new Date(scheduledTimeStr);
  const actualDepartureTime = new Date(scheduledDate.getTime() + deviationSeconds * 1000);
  const diffMs = actualDepartureTime.getTime() - currentTime.getTime();
  const diffSeconds = Math.round(diffMs / 1000);

  if (diffSeconds <= -60) {
    return 'Abgefahren';
  } else if (diffSeconds < 0) {
    return 'Jetzt';
  } else if (diffSeconds < 60) {
    return `${diffSeconds} s`;
  } else if (diffSeconds < 60 * 60) {
    const minutes = Math.ceil(diffSeconds / 60);
    return `${minutes} min`;
  } else {
    return actualDepartureTime.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
};

export const getDeviationText = (deviation: number): string => {
  const absDeviation = Math.abs(deviation);
  if (absDeviation <= 30) {
    return '';
  }

  const delayMinutes = Math.floor(absDeviation / 60);
  const delaySeconds = absDeviation % 60;

  if (absDeviation < 60) {
    return deviation > 0 ? `(+${delaySeconds}s)` : `(-${delaySeconds}s)`;
  } else {
    return deviation > 0
      ? `(+${delayMinutes}min ${delaySeconds}s)`
      : `(-${delayMinutes}min ${delaySeconds}s)`;
  }
};
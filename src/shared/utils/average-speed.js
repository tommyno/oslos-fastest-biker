// Find average speed
export default function(distance, duration) {
  // Simple error check
  if (!distance || !duration) return;

  const distanceInKm = distance / 1000;
  const durationInHours = duration / 60 / 60;
  const kmPerHour = (distanceInKm / durationInHours).toFixed(0);

  return `${kmPerHour} km/h`;
}

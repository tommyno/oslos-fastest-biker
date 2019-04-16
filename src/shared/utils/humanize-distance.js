// Convert meters into more human friendly "2,45 km" or "806 meters"
export default function(meters) {
  // Simple error check
  if (!meters) return;

  // Convert to int to remove decimals
  const m = parseInt(meters);

  // Return meters if less than a km
  if (m < 999) return `${m} meters`;

  // Return km with two decimals
  const km = (m / 1000).toFixed(2).replace('.', ',');
  return `${km} km`;
}

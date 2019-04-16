// Convert seconds into more human friendly "x min, xx sek"
export default function(seconds) {
  const min = (seconds - (seconds % 60)) / 60;
  const sec = seconds % 60;
  let duration = '';
  if (min) {
    duration += `${min} min, `;
  }
  duration += `${sec} sek`;
  return duration;
}

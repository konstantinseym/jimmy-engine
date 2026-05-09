export function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("en-EN", {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

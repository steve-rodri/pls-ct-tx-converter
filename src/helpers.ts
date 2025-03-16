export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const pad = (n: number) => (n < 10 ? "0" + n : n)
  const month = pad(date.getUTCMonth() + 1)
  const day = pad(date.getUTCDate())
  const year = date.getUTCFullYear()
  const hours = pad(date.getUTCHours())
  const minutes = pad(date.getUTCMinutes())
  const seconds = pad(date.getUTCSeconds())
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`
}

export default function formatDate(date: string): string {
  const d = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: 'short',
    day: 'numeric',
  }
  return d.toLocaleDateString('en-GB', options).replace(',', '')
}

export const shortenText = (text: string, maxChars: number, shortSymbol = '...') => {
  if (text.length > maxChars) return text.slice(0, maxChars) + shortSymbol

  return text
}

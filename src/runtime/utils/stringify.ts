export function stringify(obj: Record<string, unknown>, prefix?: string): string {
  const pairs: string[] = []

  for (const key in obj) {
    const value = obj[key]
    if (value === undefined) continue

    const fullKey = prefix ? `${prefix}[${key}]` : key

    if (Array.isArray(value)) {
      value.forEach((item, i) => {
        if (item !== null && typeof item === 'object') {
          pairs.push(stringify(item as Record<string, unknown>, `${fullKey}[${i}]`))
        } else {
          pairs.push(`${fullKey}[${i}]=${encodeURIComponent(String(item))}`)
        }
      })
    } else if (value !== null && typeof value === 'object') {
      pairs.push(stringify(value as Record<string, unknown>, fullKey))
    } else {
      pairs.push(`${fullKey}=${encodeURIComponent(String(value))}`)
    }
  }

  return pairs.join('&')
}

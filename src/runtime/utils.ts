export function getExpirationDate (ms: number) {
  return new Date(Date.now() + ms)
}

export function isExpired (expires: Date | undefined) {
  if (!expires) { return false }
  if (new Date(expires) <= new Date()) {
    return true
  }
  return false
}

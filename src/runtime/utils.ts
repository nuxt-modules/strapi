export function getExpirationDate (ms: number) {
  return new Date(Date.now() + ms)
}

export function isExpired (expires: Date | undefined) {
  if (!expires) { return false }
  return new Date(expires) <= new Date()
}

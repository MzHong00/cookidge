export function generateKey() {
  const randomString = Math.random().toString(24).substring(2, 12);
  return `${Date.now()}${randomString}`;
}

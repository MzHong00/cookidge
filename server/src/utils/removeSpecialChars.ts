export function removeSpecialChars(input: string): string {
  return input.replace(/[^a-zA-Z0-9ㄱ-ㅎ가-힣\s]/g, "");
}

// "01", "02"… for the project numbers and the phone menu.
export function formatIndex(index: number): string {
  return String(index + 1).padStart(2, "0");
}

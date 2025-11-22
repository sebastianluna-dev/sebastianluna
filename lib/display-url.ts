// "https://365diasdeajedrez.com/" → "365diasdeajedrez.com": what the project
// card prints under the title and what the browser frame shows in its bar.
export function displayUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 8);

export function generateShortCode(): string {
  return nanoid();
}

export function getAnonymousToken(): string {
  if (typeof window === "undefined") return "";
  let token = localStorage.getItem("policywiz_anon_token");
  if (!token) {
    token = `anon_${customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 24)()}`;
    localStorage.setItem("policywiz_anon_token", token);
  }
  return token;
}

export function markdownToHtml(md: string): string {
  let html = md;
  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  // Lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");
  // Paragraphs
  html = html.replace(/\n\n/g, "</p><p>");
  html = `<p>${html}</p>`;
  // Clean up
  html = html.replace(/<p>(<h[1-3]>)/g, "$1");
  html = html.replace(/(<\/h[1-3]>)<\/p>/g, "$1");
  html = html.replace(/<p>(<ul>)/g, "$1");
  html = html.replace(/(<\/ul>)<\/p>/g, "$1");
  html = html.replace(/<p>\s*<\/p>/g, "");
  return html;
}

export function stripMarkdown(md: string): string {
  let text = md;
  text = text.replace(/^#{1,3} /gm, "");
  text = text.replace(/\*\*(.+?)\*\*/g, "$1");
  text = text.replace(/\*(.+?)\*/g, "$1");
  text = text.replace(/^- /gm, "• ");
  return text;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

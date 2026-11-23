import type { ReactNode } from "react";

const inlineFormatting = /\*\*([^\n]+?)\*\*|(?<!\w)_([^_\n]+)_(?!\w)/g;

export function plainDescription(text: string): string {
  return text.replace(inlineFormatting, (_, bold?: string, italic?: string) =>
    plainDescription(bold ?? italic ?? ""),
  );
}

function formatDescription(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let start = 0;

  for (const match of text.matchAll(inlineFormatting)) {
    const [marker, bold, italic] = match;
    parts.push(text.slice(start, match.index));
    parts.push(
      bold !== undefined ? (
        <strong key={match.index} className="font-bold">
          {formatDescription(bold)}
        </strong>
      ) : (
        <em key={match.index}>{formatDescription(italic)}</em>
      ),
    );
    start = match.index + marker.length;
  }

  parts.push(text.slice(start));
  return parts;
}

export function PostingDescription({ text }: { text: string }) {
  return formatDescription(text);
}

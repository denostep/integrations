import Client from "https://deno.land/x/notion_sdk@v2.2.3/src/Client.ts";
import { urlToIdError } from "./errors/formatErrors.ts";
import { RichText } from "./blockInterfaces.ts";

export const urlToId = {
  page: (url: string): string => {
    const match = url.match(/\/([\w-]+)\?/);
    if (match && match[1]) {
      const parts = match[1].split("-");
      if (parts.length > 1) {
        return parts[parts.length - 1];
      } else {
        return match[1];
      }
    } else {
      throw new urlToIdError(url);
    }
  },
  block: (url: string): string => {
    const match = url.match(/#([\w-]+)$/);
    if (match && match[1]) {
      return match[1];
    } else {
      throw new urlToIdError(url);
    }
  },
};

function wrapLinksInBlocks(text: string) {
  const regex = /(https?:\/\/[^\s]+)/g;
  return text.replace(regex, "_{{LINK=$1:: $1}}_");
}

export function parseRichText(str: string): RichText[] {
  str = wrapLinksInBlocks(str);
  console.log(str);
  const regex = /_{{(.*?)}}_/gs;
  const result: RichText[] = [];
  let lastIndex = 0;
  // throw new Error("not implemented");
  let match;
  while ((match = regex.exec(str)) !== null) {
    const plainText = str.slice(lastIndex, match.index);
    if (plainText) {
      result.push({
        type: "text",
        text: { content: plainText, link: null },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: plainText,
        href: null,
      });
    }

    const [, format] = match;
    const splitted = format.split("::");
    const [flagsPart, textPart] = [splitted[0], splitted.slice(1).join("::")];
    const flags = flagsPart.split(" ").map((flag) => flag.trim().toUpperCase());
    const text = textPart.trim();

    const annotations = {
      bold: flags.includes("BOLD"),
      italic: flags.includes("ITALIC"),
      strikethrough: flags.includes("STRIKETHROUGH"),
      underline: flags.includes("UNDERLINE"),
      code: flags.includes("CODE"),
      color: flags.find((flag) =>
        flag.startsWith("COLOR=")
      )?.split("=")[1].toLowerCase() ||
        "default",
    };
    const url = flags.find((flag) => flag.startsWith("LINK="))?.split("=")[1]
      .toLowerCase();
    result.push({
      type: "text",
      text: {
        content: text,
        link: url ? { url } : null,
      },
      annotations: annotations,
      plain_text: text,
      href: null,
    });

    lastIndex = regex.lastIndex;
  }

  const remainingText = str.slice(lastIndex);
  if (remainingText) {
    result.push({
      type: "text",
      text: { content: remainingText, link: null },
      annotations: {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: "default",
      },
      plain_text: remainingText,
      href: null,
    });
  }
  console.log(result);
  return result;
}

export async function maybeClient(client: Client | undefined, key: string) {
  return client ||
    new Client({ auth: key });
}

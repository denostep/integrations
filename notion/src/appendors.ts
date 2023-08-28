import axiod from "https://deno.land/x/axiod/mod.ts";

import {
  BLItemBlock,
  CalloutBlock,
  CodeBlock,
  EquationBlock,
  H1Block,
  H2Block,
  H3Block,
  NLIBlock,
  ParagraphBlock,
  QuoteBlock,
  ToDoBlock,
  ToggleTextBlock,
} from "./blockInterfaces.ts";
import { parseRichText } from "./helpers.ts";

type TypedDataBlock =
  | Partial<ParagraphBlock>
  | Partial<ToDoBlock>
  | Partial<CodeBlock>
  | Partial<H1Block>
  | Partial<H2Block>
  | Partial<H3Block>
  | Partial<BLItemBlock>
  | Partial<NLIBlock>
  | Partial<CalloutBlock>
  | Partial<QuoteBlock>
  | Partial<ToggleTextBlock>
  | Partial<EquationBlock>;
export class Appendor {
  key: string;
  constructor(key: string) {
    this.key = key;
  }

  appendBlock = async (blockId: string, data: any) => {
    const res = await axiod.patch(
      `https://api.notion.com/v1/blocks/${blockId}/children`,
      data,
      {
        headers: {
          "accept": "application/json",
          "Notion-Version": "2022-06-28",
          "content-type": "application/json",
          "Authorization": `Bearer ${this.key}`,
        },
      },
    );
    // console.log(res);
    if (res.status === 200) return res.data.results;
    // throw new Error(res.statusText);
  };
  makeParagraphBlock(text: string) {
    const maybeText = parseRichText(text);
    return {
      "paragraph": {
        "rich_text": maybeText,
      },
    } as Partial<ParagraphBlock>;
  }

  appendParagraph = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [this.makeParagraphBlock(text)],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as ParagraphBlock;
  };

  makeToDoBlock(text: string, checked: boolean) {
    const maybeText = parseRichText(text);
    return {
      "to_do": {
        "rich_text": maybeText,
        "checked": checked,
      },
    } as Partial<ToDoBlock>;
  }

  appendToDo = async (
    blockId: string,
    text: string,
    checked: boolean,
    after?: string,
  ) => {
    const data = {
      children: [this.makeToDoBlock(text, checked)],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as ToDoBlock;
  };

  makeCodeBlock(text: string, language: string) {
    const maybeText = parseRichText(text);
    return {
      "code": {
        "rich_text": maybeText,
        "language": language,
      },
    } as Partial<CodeBlock>;
  }

  appendCode = async (
    blockId: string,
    text: string,
    language: string,
    after?: string,
  ) => {
    const data = {
      children: [this.makeCodeBlock(text, language)],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as CodeBlock;
  };

  makeQuoteBlock(text: string) {
    const maybeText = parseRichText(text);
    return {
      "quote": {
        "rich_text": maybeText,
      },
    } as Partial<QuoteBlock>;
  }

  appendQuote = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [this.makeQuoteBlock(text)],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as QuoteBlock;
  };

  makeCalloutBlock(text: string, icon: string) {
    const maybeText = parseRichText(text);
    return {
      "callout": {
        "rich_text": maybeText,
        "icon": {
          type: "emoji",
          emoji: icon,
        },
      },
    } as Partial<CalloutBlock>;
  }

  appendCallout = async (
    blockId: string,
    text: string,
    icon: string,
    after?: string,
  ) => {
    const data = {
      children: [this.makeCalloutBlock(text, icon)],
      after,
    };

    return (await this.appendBlock(blockId, data))[0] as CalloutBlock;
  };

  makeH1Block(text: string) {
    const maybeText = parseRichText(text);
    return {
      "heading_1": {
        "rich_text": maybeText,
        "is_toggleable": false,
      },
    } as Partial<H1Block>;
  }

  appendH1 = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [this.makeH1Block(text)],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as H1Block;
  };

  makeH2Block(text: string) {
    const maybeText = parseRichText(text);
    return {
      "heading_2": {
        "rich_text": maybeText,
        "is_toggleable": false,
      },
    } as Partial<H2Block>;
  }

  appendH2 = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [this.makeH2Block(text)],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as H2Block;
  };

  makeH3Block(text: string) {
    const maybeText = parseRichText(text);
    return {
      "heading_3": {
        "rich_text": maybeText,
        "is_toggleable": false,
      },
    } as Partial<H3Block>;
  }

  appendH3 = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [this.makeH3Block(text)],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as H3Block;
  };

  makeBLItemBlock(text: string) {
    const maybeText = parseRichText(text);
    return {
      "bulleted_list_item": {
        "rich_text": maybeText,
      },
    } as Partial<BLItemBlock>;
  }

  appendBLItem = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [this.makeBLItemBlock(text)],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as BLItemBlock;
  };

  makeNLItemBlock(text: string) {
    const maybeText = parseRichText(text);
    return {
      "numbered_list_item": {
        "rich_text": maybeText,
      },
    } as Partial<NLIBlock>;
  }
  appendNLItem = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [this.makeNLItemBlock(text)],
      after,
    };

    return (await this.appendBlock(blockId, data))[0] as NLIBlock;
  };

  makeToggleTextBlock(text: string) {
    const maybeText = parseRichText(text);
    return {
      "toggle": {
        "rich_text": maybeText,
      },
    } as Partial<ToggleTextBlock>;
  }

  appendToggleText = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [this.makeToggleTextBlock(text)],
      after,
    };

    return (await this.appendBlock(blockId, data))[0] as ToggleTextBlock;
  };

  makeEquationBlock = (equation: string) => {
    return {
      "equation": {
        "expression": equation,
      },
    } as Partial<EquationBlock>;
  };

  appendEquationBlock = async (
    blockId: string,
    equation: string,
    after?: string,
  ) => {
    const data = {
      children: [this.makeEquationBlock(equation)],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as EquationBlock;
  };

  appendMultipleBlocks = async (
    blockId: string,
    blocksData: TypedDataBlock[],
  ) => {
    return (await this.appendBlock(blockId, { children: blocksData }));
  };

  appendColumn = async (
    blockId: string,
    blocksData: TypedDataBlock[],
    after?: string,
  ) => {
    const columns = [];
    for (const block of blocksData) {
      columns.push({
        "column": { children: [block] },
      });
    }
    const data = {
      children: [{ "column_list": { children: columns } }],
      after,
    };

    return (await this.appendBlock(blockId, data))[0];
  };

  append = {
    paragraph: this.appendParagraph,
    toDo: this.appendToDo,
    code: this.appendCode,
    quote: this.appendQuote,

    callout: this.appendCallout,

    h1: this.appendH1,

    h2: this.appendH2,

    h3: this.appendH3,

    blItem: this.appendBLItem,

    nlItem: this.appendNLItem,

    toggleText: this.appendToggleText,

    equation: this.appendEquationBlock,
  };
}

// (new Appendor("kjk")).appendMultipleBlocks(
//   "knkn",
//   await (new Appendor("kmkm").appendParagraph("оиои", "knkn", "", true)),
// );

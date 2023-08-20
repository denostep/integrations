import axiod from "https://deno.land/x/axiod/mod.ts";

import {
  BLItemBlock,
  CalloutBlock,
  CodeBlock,
  H1Block,
  H2Block,
  H3Block,
  NLIBlock,
  ParagraphBlock,
  QuoteBlock,
  ToDoBlock,
  ToggleTextBlock,
} from "./blockInterfaces.ts";

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
    console.log(res);
    if (res.status === 200) return res.data.results;
    // throw new Error(res.statusText);
  };

  appendParagraph = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [
        {
          "paragraph": {
            "rich_text": [
              {
                "text": {
                  "content": text,
                },
              },
            ],
          },
        },
      ],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as ParagraphBlock;
  };

  appendToDo = async (
    blockId: string,
    text: string,
    checked: boolean,
    after?: string,
  ) => {
    const data = {
      children: [
        {
          "to_do": {
            "rich_text": [
              {
                "text": {
                  "content": text,
                },
              },
            ],
            "checked": checked,
          },
        },
      ],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as ToDoBlock;
  };

  appendCode = async (
    blockId: string,
    text: string,
    language: string,
    after?: string,
  ) => {
    const data = {
      children: [
        {
          "code": {
            "rich_text": [
              {
                "text": {
                  "content": text,
                },
              },
            ],
            "language": language,
          },
        },
      ],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as CodeBlock;
  };

  appendQuote = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [
        {
          "quote": {
            "rich_text": [
              {
                "text": {
                  "content": text,
                },
              },
            ],
          },
        },
      ],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as QuoteBlock;
  };

  appendCallout = async (
    blockId: string,
    text: string,
    icon: string,
    after?: string,
  ) => {
    const data = {
      children: [
        {
          "callout": {
            "rich_text": [
              {
                "text": {
                  "content": text,
                },
              },
            ],
            "icon": {
              type: "emoji",
              emoji: icon,
            },
          },
        },
      ],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as CalloutBlock;
  };

  appendH1 = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [
        {
          "heading_1": {
            "rich_text": [
              {
                "text": {
                  "content": text,
                },
              },
            ],
            "is_toggleable": false,
          },
        },
      ],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as H1Block;
  };

  appendH2 = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [
        {
          "heading_2": {
            "rich_text": [
              {
                "text": {
                  "content": text,
                },
              },
            ],
            "is_toggleable": false,
          },
        },
      ],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as H2Block;
  };

  appendH3 = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [
        {
          "heading_3": {
            "rich_text": [
              {
                "text": {
                  "content": text,
                },
              },
            ],
            "is_toggleable": false,
          },
        },
      ],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as H3Block;
  };

  appendBLItem = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [
        {
          "bulleted_list_item": {
            "rich_text": [
              {
                "text": {
                  "content": text,
                },
              },
            ],
          },
        },
      ],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as BLItemBlock;
  };

  appendNLItem = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [
        {
          "numbered_list_item": {
            "rich_text": [
              {
                "text": {
                  "content": text,
                },
              },
            ],
          },
        },
      ],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as NLIBlock;
  };

  appendToggleText = async (
    blockId: string,
    text: string,
    after?: string,
  ) => {
    const data = {
      children: [
        {
          "toggle": {
            "rich_text": [
              {
                "text": {
                  "content": text,
                },
              },
            ],
          },
        },
      ],
      after,
    };
    return (await this.appendBlock(blockId, data))[0] as ToggleTextBlock;
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
  };
}

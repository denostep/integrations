import {
  BLItemBlock,
  Block,
  CalloutBlock,
  CodeBlock,
  DividerBlock,
  EquationBlock,
  H1Block,
  H2Block,
  H3Block,
  NLIBlock,
  NotionError,
  Page,
  ParagraphBlock,
  QuoteBlock,
  ToDoBlock,
  ToggleTextBlock,
} from './blockInterfaces.ts';
import { parseRichText } from './helpers.ts';
import { Fetchify, json } from '../../global.ts';

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
  | Partial<EquationBlock>
  | Partial<DividerBlock>;
export class Appendor {
  key: string;
  net: Fetchify;
  baseURL: string;
  constructor(key: string, net: Fetchify, baseURL: string) {
    this.key = key;
    this.net = net;
    this.baseURL = baseURL;
  }
  appendBlock = async (
    blockId: string,
    data: any,
  ): Promise<[Block[] | null, NotionError | null]> => {
    try {
      const res = await json<any>(this.net.patch(
        `https://api.notion.com/v1/blocks/${blockId}/children`,
        { body: JSON.stringify(data) },
      ));
      if (res.response.status === 200) {
        return [res.data.results as Block[], null];
      }
      throw res.data;
    } catch (e) {
      console.log(e);
      return [null, e as NotionError];
    }
  };
  makeParagraphBlock(text: string) {
    const maybeText = parseRichText(text);
    return {
      'paragraph': {
        'rich_text': maybeText,
      },
    } as Partial<ParagraphBlock>;
  }

  appendParagraph = async (
    blockId: string,
    text: string,
    after?: string,
  ): Promise<[ParagraphBlock | null, NotionError | null]> => {
    try {
      const data = {
        children: [this.makeParagraphBlock(text)],
        after,
      };
      const [block, error] = await this.appendBlock(blockId, data);
      if (error) throw error;
      return [block![0] as ParagraphBlock, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  makeToDoBlock(text: string, checked: boolean) {
    const maybeText = parseRichText(text);
    return {
      'to_do': {
        'rich_text': maybeText,
        'checked': checked,
      },
    } as Partial<ToDoBlock>;
  }

  appendToDo = async (
    blockId: string,
    text: string,
    checked: boolean,
    after?: string,
  ): Promise<[ToDoBlock | null, NotionError | null]> => {
    try {
      const data = {
        children: [this.makeToDoBlock(text, checked)],
        after,
      };
      const [block, error] = await this.appendBlock(blockId, data);
      if (error) throw error;
      return [block![0] as ToDoBlock, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  makeCodeBlock(text: string, language: string) {
    const maybeText = parseRichText(text);
    return {
      'code': {
        'rich_text': maybeText,
        'language': language,
      },
    } as Partial<CodeBlock>;
  }

  appendCode = async (
    blockId: string,
    text: string,
    language: string,
    after?: string,
  ): Promise<[CodeBlock | null, NotionError | null]> => {
    try {
      const data = {
        children: [this.makeCodeBlock(text, language)],
        after,
      };
      const [block, error] = await this.appendBlock(blockId, data);
      if (error) throw error;
      return [block![0] as CodeBlock, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  makeQuoteBlock(text: string) {
    const maybeText = parseRichText(text);
    return {
      'quote': {
        'rich_text': maybeText,
      },
    } as Partial<QuoteBlock>;
  }

  appendQuote = async (
    blockId: string,
    text: string,
    after?: string,
  ): Promise<[QuoteBlock | null, NotionError | null]> => {
    try {
      const data = {
        children: [this.makeQuoteBlock(text)],
        after,
      };
      const [block, error] = await this.appendBlock(blockId, data);
      if (error) throw error;
      return [block![0] as QuoteBlock, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  makeCalloutBlock(text: string, icon: string) {
    const maybeText = parseRichText(text);
    return {
      'callout': {
        'rich_text': maybeText,
        'icon': {
          type: 'emoji',
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
  ): Promise<[CalloutBlock | null, NotionError | null]> => {
    try {
      const data = {
        children: [this.makeCalloutBlock(text, icon)],
        after,
      };
      const [block, error] = await this.appendBlock(blockId, data);
      if (error) throw error;
      return [block![0] as CalloutBlock, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  makeH1Block(text: string) {
    const maybeText = parseRichText(text);
    return {
      'heading_1': {
        'rich_text': maybeText,
        'is_toggleable': false,
      },
    } as Partial<H1Block>;
  }

  appendH1 = async (
    blockId: string,
    text: string,
    after?: string,
  ): Promise<[H1Block | null, NotionError | null]> => {
    try {
      const data = {
        children: [this.makeH1Block(text)],
        after,
      };
      const [block, error] = await this.appendBlock(blockId, data);
      if (error) throw error;
      return [block![0] as H1Block, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  makeH2Block(text: string) {
    const maybeText = parseRichText(text);
    return {
      'heading_2': {
        'rich_text': maybeText,
        'is_toggleable': false,
      },
    } as Partial<H2Block>;
  }

  appendH2 = async (
    blockId: string,
    text: string,
    after?: string,
  ): Promise<[H2Block | null, NotionError | null]> => {
    try {
      const data = {
        children: [this.makeH2Block(text)],
        after,
      };
      const [block, error] = await this.appendBlock(blockId, data);
      if (error) throw error;
      return [block![0] as H2Block, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  makeH3Block(text: string) {
    const maybeText = parseRichText(text);
    return {
      'heading_3': {
        'rich_text': maybeText,
        'is_toggleable': false,
      },
    } as Partial<H3Block>;
  }

  appendH3 = async (
    blockId: string,
    text: string,
    after?: string,
  ): Promise<[H3Block | null, NotionError | null]> => {
    try {
      const data = {
        children: [this.makeH3Block(text)],
        after,
      };
      const [block, error] = await this.appendBlock(blockId, data);
      if (error) throw error;
      return [block![0] as H3Block, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  makeBLItemBlock(text: string) {
    const maybeText = parseRichText(text);
    return {
      'bulleted_list_item': {
        'rich_text': maybeText,
      },
    } as Partial<BLItemBlock>;
  }

  appendBLItem = async (
    blockId: string,
    text: string,
    after?: string,
  ): Promise<[BLItemBlock | null, NotionError | null]> => {
    try {
      const data = {
        children: [this.makeBLItemBlock(text)],
        after,
      };
      const [block, error] = await this.appendBlock(blockId, data);
      if (error) throw error;
      return [block![0] as BLItemBlock, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  makeNLItemBlock(text: string) {
    const maybeText = parseRichText(text);
    return {
      'numbered_list_item': {
        'rich_text': maybeText,
      },
    } as Partial<NLIBlock>;
  }
  appendNLItem = async (
    blockId: string,
    text: string,
    after?: string,
  ): Promise<[NLIBlock | null, NotionError | null]> => {
    try {
      const data = {
        children: [this.makeNLItemBlock(text)],
        after,
      };
      const [block, error] = await this.appendBlock(blockId, data);
      if (error) throw error;
      return [block![0] as NLIBlock, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  makeToggleTextBlock(text: string) {
    const maybeText = parseRichText(text);
    return {
      'toggle': {
        'rich_text': maybeText,
      },
    } as Partial<ToggleTextBlock>;
  }

  appendToggleText = async (
    blockId: string,
    text: string,
    after?: string,
  ): Promise<[ToggleTextBlock | null, NotionError | null]> => {
    try {
      const data = {
        children: [this.makeToggleTextBlock(text)],
        after,
      };
      const [block, error] = await this.appendBlock(blockId, data);
      if (error) throw error;
      return [block![0] as ToggleTextBlock, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  makeEquationBlock = (equation: string) => {
    return {
      'equation': {
        'expression': equation,
      },
    } as Partial<EquationBlock>;
  };

  appendEquationBlock = async (
    blockId: string,
    equation: string,
    after?: string,
  ): Promise<[EquationBlock | null, NotionError | null]> => {
    try {
      const data = {
        children: [this.makeEquationBlock(equation)],
        after,
      };
      const [block, error] = await this.appendBlock(blockId, data);
      if (error) throw error;
      return [block![0] as EquationBlock, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  makeDividerBlock = () => {
    return {
      'divider': {},
    } as Partial<DividerBlock>;
  };

  appendDividerBlock = async (
    blockId: string,
    after?: string,
  ): Promise<[DividerBlock | null, NotionError | null]> => {
    try {
      const data = {
        children: [this.makeDividerBlock()],
        after,
      };
      const [block, error] = await this.appendBlock(blockId, data);
      if (error) throw error;
      return [block![0] as DividerBlock, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  appendMultipleBlocks = async (
    blockId: string,
    blocksData: TypedDataBlock[],
    after?: string,
  ): Promise<[Block[] | null, NotionError | null]> => {
    try {
      const [data, error] = await this.appendBlock(blockId, {
        children: blocksData,
        after,
      });
      if (error) throw error;
      return [data, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  appendColumn = async (
    blockId: string,
    blocksData: TypedDataBlock[],
    after?: string,
  ) => {
    try {
      const columns = [];
      for (const block of blocksData) {
        columns.push({
          'column': { children: [block] },
        });
      }
      const data = {
        children: [{ 'column_list': { children: columns } }],
        after,
      };
      const [result, error] = await this.appendBlock(blockId, data);
      if (error) throw error;
      return [result, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  appendPage = async (
    parentId: string,
    title: string,
    icon?: string,
    cover?: string,
  ): Promise<[Page | null, NotionError | null]> => {
    try {
      const data = {
        parent: {
          'page_id': parentId,
        },
        icon: icon ? { emoji: icon } : undefined,
        cover: cover ? { external: { url: cover } } : undefined,
        properties: {
          'title': [{
            'type': 'text',
            'text': {
              'content': title,
            },
          }],
        },
      };
      console.log(JSON.stringify(data));
      const res = await json<any>(this.net.post(
        `https://api.notion.com/v1/pages`,
        {
          body: JSON.stringify(data),
        },
      ));
      if (res.response.status !== 200) throw res.data;
      return [res.data as Page, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  append = {
    page: this.appendPage,
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
    divider: this.appendDividerBlock,
  };
}

// (new Appendor("kjk")).appendMultipleBlocks(
//   "knkn",
//   await (new Appendor("kmkm").appendParagraph("оиои", "knkn", "", true)),
// );

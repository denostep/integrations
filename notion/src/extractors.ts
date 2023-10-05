import {
  BLItemBlock,
  Block,
  BlockType,
  CalloutBlock,
  CodeBlock,
  DividerBlock,
  EquationBlock,
  H1Block,
  H2Block,
  H3Block,
  NLIBlock,
  ParagraphBlock,
  QuoteBlock,
  RichText,
  TableBlock,
  TableRow,
  ToDoBlock,
  ToggleTextBlock,
} from './blockInterfaces.ts';
import { urlToId } from './helpers.ts';
import { Getter } from './getters.ts';
import { missingURLorIDorBlock } from './errors/commonErrors.ts';
import { Fetchify } from 'https://deno.land/x/fetchify@0.2.10/src/fetchify.ts';

function complieRichText(rc: RichText[]) {
  return rc.map((item) => item.text.content).join(' ');
}

type ExtractFuncsList = {
  [key in BlockType]: (block: any) => any;
};

export class Extractor {
  net: Fetchify;
  key: string;
  baseURL: string;
  constructor(key: string, net: Fetchify, baseURL: string) {
    this.key = key;
    this.net = net;
    this.baseURL = baseURL;
  }

  public extractFrom: ExtractFuncsList = {
    'paragraph': (block: ParagraphBlock) =>
      complieRichText(block.paragraph.rich_text),
    'to_do': (block: ToDoBlock) => {
      return {
        checked: block.to_do.checked,
        text: complieRichText(block.to_do.rich_text),
      };
    },

    'heading_1': (block: H1Block) =>
      complieRichText(block.heading_1.rich_text),
    'heading_2': (block: H2Block) =>
      complieRichText(block.heading_2.rich_text),
    'heading_3': (block: H3Block) =>
      complieRichText(block.heading_3.rich_text),
    'bulleted_list_item': (block: BLItemBlock) =>
      complieRichText(block.bulleted_list_item.rich_text),
    'numbered_list_item': (block: NLIBlock) =>
      complieRichText(block.numbered_list_item.rich_text),
    'toggle': (block: ToggleTextBlock) =>
      complieRichText(block.toggle.rich_text),
    'code': (block: CodeBlock) => {
      return {
        caption: block.code.caption
          ? complieRichText(block.code.caption)
          : '',
        code: complieRichText(block.code.rich_text),
        language: block.code.language,
      };
    },

    'quote': (block: QuoteBlock) =>
      complieRichText(block.quote.rich_text),
    'callout': (block: CalloutBlock) => {
      return {
        text: complieRichText(block.callout.rich_text),
        icon: block.callout.icon.type === 'emoji'
          ? block.callout.icon.emoji
          : block.callout.icon.external!.url,
      };
    },
    'table': async (block: TableBlock) => {
      const get = new Getter(this.key);
      const res: string[][] = [];
      const rows = (await get.getChildren(block.id)) as TableRow[];
      for (const row of rows) {
        const rowData: string[] = [];
        for (const cell of row.table_row.cells) {
          rowData.push(complieRichText(cell));
        }
        res.push(rowData);
      }
      return res;
    },
    'divider': (block: DividerBlock) => block.id,
    table_row: (block: TableRow) => block.id,
    'equation': (block: EquationBlock) => block.equation.expression,
  };

  public extractFromBlock = async (
    options: { url?: string; id?: string; block?: Block },
  ) => {
    const getter = new Getter(this.key);
    const blockId = options.id
      ? options.id
      : options.url
      ? urlToId.block(options.url)
      : undefined;
    if (blockId === undefined && !options.block) {
      throw new missingURLorIDorBlock();
    }
    const blockInstance = options.block
      ? options.block
      : await getter.getBlockById(blockId!);
    try {
      return this.extractFrom[blockInstance.type](blockInstance);
    } catch (e) {
      return null;
    }
  };

  public extractTextFromBlock = async (block: Block) => {
    const rawExtractResult = await this.extractFromBlock({ block });
    switch (block.type) {
      case 'paragraph':
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
      case 'bulleted_list_item':
      case 'numbered_list_item':
      case 'toggle':
      case 'quote':
      case 'equation':
        return rawExtractResult as string;
      case 'to_do':
        return rawExtractResult.text as string;
      case 'code':
        return rawExtractResult.code as string;
      case 'callout':
        return rawExtractResult.text as string;
      case 'table':
        return (rawExtractResult as string[][]).flatMap((
          innerArray,
        ) => innerArray.join('|'))
          .join('|');
      default:
        return '';
    }
  };
}

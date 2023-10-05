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
  NotionError,
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
  [key in BlockType]: (
    block: any,
  ) =>
    | [any, NotionError | null]
    | Promise<[null, NotionError] | [any, null]>;
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
    'paragraph': (
      block: ParagraphBlock,
    ) => [complieRichText(block.paragraph.rich_text), null],
    'to_do': (block: ToDoBlock) => {
      return [{
        checked: block.to_do.checked,
        text: complieRichText(block.to_do.rich_text),
      }, null];
    },

    'heading_1': (
      block: H1Block,
    ) => [complieRichText(block.heading_1.rich_text), null],
    'heading_2': (
      block: H2Block,
    ) => [complieRichText(block.heading_2.rich_text), null],
    'heading_3': (
      block: H3Block,
    ) => [complieRichText(block.heading_3.rich_text), null],
    'bulleted_list_item': (
      block: BLItemBlock,
    ) => [complieRichText(block.bulleted_list_item.rich_text), null],
    'numbered_list_item': (
      block: NLIBlock,
    ) => [complieRichText(block.numbered_list_item.rich_text), null],
    'toggle': (
      block: ToggleTextBlock,
    ) => [complieRichText(block.toggle.rich_text), null],
    'code': (block: CodeBlock) => {
      return [{
        caption: block.code.caption
          ? complieRichText(block.code.caption)
          : '',
        code: complieRichText(block.code.rich_text),
        language: block.code.language,
      }, null];
    },

    'quote': (
      block: QuoteBlock,
    ) => [complieRichText(block.quote.rich_text), null],
    'callout': (block: CalloutBlock) => {
      return [{
        text: complieRichText(block.callout.rich_text),
        icon: block.callout.icon.type === 'emoji'
          ? block.callout.icon.emoji
          : block.callout.icon.external!.url,
      }, null];
    },
    'table': async (block: TableBlock) => {
      try {
        const get = new Getter(this.key, this.net, this.baseURL);
        const res: string[][] = [];
        const [children, error] = await get.getChildren(block.id);
        if (error) throw error;
        const rows = children as TableRow[];
        for (const row of rows) {
          const rowData: string[] = [];
          for (const cell of row.table_row.cells) {
            rowData.push(complieRichText(cell));
          }
          res.push(rowData);
        }
        return [res, null];
      } catch (e) {
        return [null, e as NotionError];
      }
    },
    'divider': (block: DividerBlock) => [block.id, null],
    table_row: (block: TableRow) => [block.id, null],
    'equation': (
      block: EquationBlock,
    ) => [block.equation.expression, null],
  };

  public extractFromBlock = async (
    options: { url?: string; id?: string; block?: Block },
  ): Promise<[any, NotionError | null]> => {
    try {
      const getter = new Getter(this.key, this.net, this.baseURL);
      const blockId = options.id
        ? options.id
        : options.url
        ? urlToId.block(options.url)
        : undefined;
      if (blockId === undefined && !options.block) {
        throw new missingURLorIDorBlock();
      }
      let blockInstance: Block;
      if (!options.block) {
        const [blockInstance, error] = await getter.getBlockById(
          blockId!,
        );
        if (error) throw error;
      } else {
        blockInstance = options.block;
      }
      const [dataExtract, errorExtract] = await this.extractFrom
        [blockInstance!.type](blockInstance!);
      if (errorExtract) throw errorExtract;
      return [dataExtract, null];
    } catch (e) {
      return [null, e as NotionError];
    }
  };

  public extractTextFromBlock = async (
    block: Block,
  ): Promise<[string | null, NotionError | null]> => {
    try {
      const [rawExtractResult, error] = await this.extractFromBlock({
        block,
      });
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
          return [rawExtractResult as string, null];
        case 'to_do':
          return [rawExtractResult.text as string, null];
        case 'code':
          return [rawExtractResult.code as string, null];
        case 'callout':
          return [rawExtractResult.text as string, null];
        case 'table':
          return [
            (rawExtractResult as string[][]).flatMap((
              innerArray,
            ) => innerArray.join('|'))
              .join('|'),
            null,
          ];
        default:
          return ['', null];
      }
    } catch (e) {
      return [null, e as NotionError];
    }
  };
}

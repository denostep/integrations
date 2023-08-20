import {
  boolean,
  string,
} from 'https://deno.land/x/zod@v3.21.4/types.ts';
import {
  BLItemBlock,
  Block,
  BlockType,
  CalloutBlock,
  CodeBlock,
  DividerBlock,
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
import { missingURLorID } from './errors/mod.ts';
import { getBlockById, getChildren } from './getters.ts';

function complieRichText(rc: RichText[]) {
  return rc.map((item) => item.text.content).join(' ');
}

type KindOfBlock =
  | ParagraphBlock
  | ToDoBlock
  | H1Block
  | H2Block
  | H3Block
  | BLItemBlock
  | NLIBlock
  | ToggleTextBlock
  | CodeBlock
  | QuoteBlock
  | CalloutBlock;

type ExtractFuncsList = {
  [key in BlockType]: (block: any) => any;
};

export const extractFrom: ExtractFuncsList = {
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
      caption: complieRichText(block.code.caption),
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
    const res: string[][] = [];
    const rows = (await getChildren(block.id)) as TableRow[];
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
};

export async function extractFromBlock(
  options: { url?: string; id?: string },
) {
  const blockId = options.id
    ? options.id
    : options.url
    ? urlToId.block(options.url)
    : undefined;
  if (blockId === undefined) throw new missingURLorID();
  const block = await getBlockById(blockId);
  try {
    return extractFrom[block.type](block);
  } catch (e) {
    return null;
  }
}

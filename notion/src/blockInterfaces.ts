export type BlockType =
  // | 'bookmark'
  // | 'breadcrumb'
  | 'bulleted_list_item'
  | 'callout'
  // | 'child_database'
  // | 'child_page'
  // | 'column'
  // | 'column_list'
  | 'divider'
  // | 'embed'
  // | 'equation'
  // | 'file'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  // | 'image'
  // | 'link_preview'
  // | 'link_to_page'
  | 'numbered_list_item'
  | 'paragraph'
  // | 'pdf'
  | 'quote'
  // | 'synced_block'
  | 'table'
  // | 'table_of_contents'
  | 'table_row'
  // | 'template'
  | 'to_do'
  | 'toggle'
  // | 'unsupported'
  // | 'video'
  | 'code';

export type RichText = {
  type: string;
  text: { content: string; link: null | string };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
};

export interface User {
  object: 'user';
  id: string;
  type: 'person' | 'bot';
  name: string;
  avatar_url: string;
}
export interface Block {
  object: 'block';
  id: string;
  parent: {
    type: string;
    database_id?: string;
    page_id?: string;
    workspace?: boolean;
    block_id?: string;
  };
  type: BlockType;
  created_time: string;
  created_by: User;
  last_edited_time: string;
  last_edited_by: User;
  archived: boolean;
  has_children: boolean;
}

export interface ParagraphBlock extends Block {
  type: 'paragraph';
  paragraph: {
    rich_text: RichText[];
  };
}

export interface ToDoBlock extends Block {
  type: 'to_do';
  to_do: {
    rich_text: RichText[];
    checked: boolean;
  };
}

export interface H1Block extends Block {
  type: 'heading_1';

  heading_1: {
    rich_text: RichText[];
    is_toggleable: boolean;
  };
}

export interface H2Block extends Block {
  type: 'heading_1';

  heading_2: {
    rich_text: RichText[];
    is_toggleable: boolean;
  };
}

export interface H3Block extends Block {
  type: 'heading_1';

  heading_3: {
    rich_text: RichText[];
    is_toggleable: boolean;
  };
}

export interface TableBlock extends Block {
  type: 'table';
  table: {
    table_width: number;
    has_column_header: boolean;
    has_row_header: boolean;
  };
}

export interface BLItemBlock extends Block {
  type: 'bulleted_list_item';
  bulleted_list_item: {
    rich_text: RichText[];
  };
}
export interface NLIBlock extends Block {
  type: 'numbered_list_item';
  numbered_list_item: {
    rich_text: RichText[];
  };
}

export interface ToggleTextBlock extends Block {
  type: 'toggle';
  toggle: {
    rich_text: RichText[];
  };
}

export interface CodeBlock extends Block {
  type: 'code';
  code: {
    caption: RichText[];
    rich_text: RichText[];
    language: string;
  };
}

export interface QuoteBlock extends Block {
  type: 'quote';
  quote: {
    rich_text: RichText[];
  };
}

export interface DividerBlock extends Block {
  type: 'divider';
  divider: {};
}

export interface CalloutBlock extends Block {
  type: 'callout';
  callout: {
    rich_text: RichText[];
    icon: {
      type: 'emoji' | 'external';
      emoji?: string;
      external?: { url: string };
    };
  };
}

export interface TableRow extends Block {
  type: 'table_row';
  table_row: {
    cells: RichText[][];
  };
}

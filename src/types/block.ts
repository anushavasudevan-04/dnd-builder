export type BlockType = "text" | "image" | "button" | "container";

export type TextAlign = "left" | "center" | "right";

export interface BlockStyle {
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  textAlign?: TextAlign;
  width?: number;
}

export interface Block {
  id: string;
  type: BlockType;
  content: string;
  style: BlockStyle;
}

export interface BuilderLayout {
  version: 1;
  blocks: Block[];
}
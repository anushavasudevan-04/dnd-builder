import type { Block, BlockType } from "../types/block";

export const BLOCK_TYPES: BlockType[] = [
  "text",
  "image",
  "button",
  "container",
];

export function createBlock(type: BlockType): Block {
  const id = crypto.randomUUID();

  const defaults: Record<BlockType, Block> = {
    text: {
      id,
      type: "text",
      content: "Sample text",
      style: {
        color: "#111827",
        fontSize: 18,
        textAlign: "left",
      },
    },

    image: {
      id,
      type: "image",
      content: "https://placehold.co/600x300",
      style: {
        width: 100,
      },
    },

    button: {
      id,
      type: "button",
      content: "Click Me",
      style: {
        color: "#ffffff",
        backgroundColor: "#2563eb",
        fontSize: 16,
        textAlign: "center",
      },
    },

    container: {
      id,
      type: "container",
      content: "Container",
      style: {
        backgroundColor: "#f3f4f6",
        textAlign: "center",
      },
    },
  };

  return defaults[type];
}

export function isSafeUrl(value: string): boolean {
  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}
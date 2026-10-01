import type { Block, BuilderLayout } from "../types/block";
import { BLOCK_TYPES, isSafeUrl } from "./helpers";

const CURRENT_VERSION = 1;

export function serializeLayout(blocks: Block[]): string {
  const layout: BuilderLayout = {
    version: CURRENT_VERSION,
    blocks,
  };

  return JSON.stringify(layout, null, 2);
}

export function parseLayout(json: string): Block[] {
  const parsed: unknown = JSON.parse(json);

  if (!isBuilderLayout(parsed)) {
    throw new Error("Invalid builder layout.");
  }

  return parsed.blocks;
}

function isBuilderLayout(value: unknown): value is BuilderLayout {
  if (!value || typeof value !== "object") {
    return false;
  }

  const layout = value as Record<string, unknown>;

  if (layout.version !== CURRENT_VERSION) {
    return false;
  }

  if (!Array.isArray(layout.blocks)) {
    return false;
  }

  return layout.blocks.every(isValidBlock);
}

function isValidBlock(value: unknown): value is Block {
  if (!value || typeof value !== "object") {
    return false;
  }

  const block = value as Record<string, unknown>;

  if (typeof block.id !== "string") {
    return false;
  }

  if (
    typeof block.type !== "string" ||
    !BLOCK_TYPES.includes(block.type as Block["type"])
  ) {
    return false;
  }

  if (typeof block.content !== "string") {
    return false;
  }

  if (!block.style || typeof block.style !== "object") {
    const style = block.style as Record<string, unknown>;

    if (
      style.fontSize !== undefined &&
      (typeof style.fontSize !== "number" ||
        style.fontSize < 10 ||
        style.fontSize > 72)
    ) {
      return false;
    }

    if (
      style.width !== undefined &&
      (typeof style.width !== "number" || style.width < 10 || style.width > 100)
    ) {
      return false;
    }

    if (
      style.textAlign !== undefined &&
      !["left", "center", "right"].includes(String(style.textAlign))
    ) {
      return false;
    }
  }

  if (block.type === "image" && !isSafeUrl(block.content)) {
    return false;
  }

  return true;
}

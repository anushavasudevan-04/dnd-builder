import { useCallback, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import type { Block, BlockStyle, BlockType } from "../types/block";
import { createBlock } from "../utils/helpers";

export function useBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const addBlock = useCallback((type: BlockType) => {
    const newBlock = createBlock(type);

    setBlocks((currentBlocks) => [...currentBlocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  }, []);

  const updateBlock = useCallback(
    (id: string, updates: Partial<Pick<Block, "content">>) => {
      setBlocks((currentBlocks) =>
        currentBlocks.map((block) =>
          block.id === id ? { ...block, ...updates } : block,
        ),
      );
    },
    [],
  );

  const updateBlockStyle = useCallback(
    (id: string, style: Partial<BlockStyle>) => {
      setBlocks((currentBlocks) =>
        currentBlocks.map((block) =>
          block.id === id
            ? {
                ...block,
                style: {
                  ...block.style,
                  ...style,
                },
              }
            : block,
        ),
      );
    },
    [],
  );

  const deleteBlock = useCallback((id: string) => {
    setBlocks((currentBlocks) =>
      currentBlocks.filter((block) => block.id !== id),
    );

    setSelectedBlockId((currentSelectedId) =>
      currentSelectedId === id ? null : currentSelectedId,
    );
  }, []);

  const moveBlock = useCallback((activeId: string, overId: string) => {
    setBlocks((currentBlocks) => {
      const oldIndex = currentBlocks.findIndex(
        (block) => block.id === activeId,
      );

      const newIndex = currentBlocks.findIndex((block) => block.id === overId);

      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
        return currentBlocks;
      }

      return arrayMove(currentBlocks, oldIndex, newIndex);
    });
  }, []);

  const selectBlock = useCallback((id: string | null) => {
    setSelectedBlockId(id);
  }, []);

  const loadBlocks = useCallback((newBlocks: Block[]) => {
    setBlocks(newBlocks);
    setSelectedBlockId(null);
  }, []);

  const clearBlocks = useCallback(() => {
    setBlocks([]);
    setSelectedBlockId(null);
  }, []);

  return {
    blocks,
    selectedBlockId,
    addBlock,
    updateBlock,
    updateBlockStyle,
    deleteBlock,
    moveBlock,
    selectBlock,
    clearBlocks,
    loadBlocks,
  };
}

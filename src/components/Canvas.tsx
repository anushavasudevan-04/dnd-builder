import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Block from "./Block";
import type { Block as BlockType } from "../types/block";

interface CanvasProps {
  blocks: BlockType[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string) => void;
  onMoveBlock: (activeId: string, overId: string) => void;
}

export default function Canvas({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onMoveBlock,
}: CanvasProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    onMoveBlock(String(active.id), String(over.id));
  };

  return (
    <main className="canvas">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map((block) => block.id)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.length === 0 ? (
            <div className="canvas-empty">
              <p>Drag blocks here to start building</p>
            </div>
          ) : (
            blocks.map((block) => (
              <Block
                key={block.id}
                block={block}
                isSelected={block.id === selectedBlockId}
                onSelect={onSelectBlock}
              />
            ))
          )}
        </SortableContext>
      </DndContext>
    </main>
  );
}
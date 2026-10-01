import { memo, useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Block as BlockType } from "../types/block";
import { isSafeUrl } from "../utils/helpers";

interface BlockProps {
  block: BlockType;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function Block({ block, isSelected, onSelect }: BlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: block.id,
  });

  const dragStyle = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
    }),
    [transform, transition]
  );

  const contentStyle = useMemo(
    () => ({
      color: block.style.color,
      backgroundColor: block.style.backgroundColor,
      fontSize: block.style.fontSize,
      textAlign: block.style.textAlign,
      width: block.style.width
        ? `${block.style.width}%`
        : undefined,
    }),
    [block.style]
  );

  const renderContent = () => {
    switch (block.type) {
      case "text":
        return <p style={contentStyle}>{block.content}</p>;

      case "image":
        return isSafeUrl(block.content) ? (
          <img
            src={block.content}
            alt="Builder content"
            style={{
              ...contentStyle,
              maxWidth: "100%",
              height: "auto",
            }}
          />
        ) : (
          <div style={contentStyle}>
            Invalid image URL
          </div>
        );

      case "button":
        return (
          <button
            type="button"
            style={{
              ...contentStyle,
              maxWidth: "100%",
              height: "auto",
            }}
          >
            {block.content}
          </button>
        );

      case "button":
        return (
          <button
            type="button"
            style={contentStyle}
          >
            {block.content}
          </button>
        );

      case "container":
        return (
          <div style={contentStyle}>
            {block.content}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={dragStyle}
      {...attributes}
      {...listeners}
      onClick={() => onSelect(block.id)}
      className={`builder-block ${
        isSelected ? "builder-block-selected" : ""
      }`}
    >
      {renderContent()}
    </div>
  );
}

export default memo(Block);
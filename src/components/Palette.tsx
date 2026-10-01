import type { BlockType } from "../types/block";

interface PaletteProps {
  onAddBlock: (type: BlockType) => void;
}

const paletteItems: { type: BlockType; label: string }[] = [
  { type: "text", label: "Text" },
  { type: "image", label: "Image" },
  { type: "button", label: "Button" },
  { type: "container", label: "Container" },
];

export default function Palette({ onAddBlock }: PaletteProps) {
  return (
    <aside className="palette">
      <h2>Blocks</h2>

      <p className="palette-description">
        Click a block to add it to the canvas.
      </p>

      <div className="palette-list">
        {paletteItems.map((item) => (
          <button
            key={item.type}
            type="button"
            className="palette-item"
            onClick={() => onAddBlock(item.type)}
          >
            <span>{item.label}</span>
            <span>+</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
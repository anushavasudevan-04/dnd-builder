import type { Block, TextAlign } from "../types/block";

interface PropertiesPanelProps {
  selectedBlock: Block | null;
  onUpdateContent: (
    id: string,
    updates: Partial<Pick<Block, "content">>,
  ) => void;
  onUpdateStyle: (id: string, style: Partial<Block["style"]>) => void;
  onDelete: (id: string) => void;
}

export default function PropertiesPanel({
  selectedBlock,
  onUpdateContent,
  onUpdateStyle,
  onDelete,
}: PropertiesPanelProps) {
  if (!selectedBlock) {
    return (
      <aside className="properties-panel">
        <h2>Properties</h2>

        <div className="properties-empty">
          Select a block to edit its properties.
        </div>
      </aside>
    );
  }

  const { id, type, content, style } = selectedBlock;

  return (
    <aside className="properties-panel">
      <div className="properties-header">
        <h2>Properties</h2>
        <span>{type}</span>
      </div>

      <div className="property-group">
        <label htmlFor="block-content">
          {type === "image" ? "Image URL" : "Content"}
        </label>

        <input
          id="block-content"
          type="text"
          value={content}
          onChange={(event) =>
            onUpdateContent(id, {
              content: event.target.value,
            })
          }
        />
      </div>

      {type !== "image" && (
        <>
          <div className="property-group">
            <label htmlFor="font-size">Font size</label>

            <input
              id="font-size"
              type="number"
              min="10"
              max="72"
              value={style.fontSize ?? 16}
              onChange={(event) =>
                onUpdateStyle(id, {
                  fontSize: Number(event.target.value),
                })
              }
            />
          </div>

          <div className="property-group">
            <label htmlFor="text-color">Text color</label>

            <input
              id="text-color"
              type="color"
              value={style.color ?? "#111827"}
              onChange={(event) =>
                onUpdateStyle(id, {
                  color: event.target.value,
                })
              }
            />
          </div>

          <div className="property-group">
            <label htmlFor="background-color">Background</label>

            <input
              id="background-color"
              type="color"
              value={style.backgroundColor ?? "#ffffff"}
              onChange={(event) =>
                onUpdateStyle(id, {
                  backgroundColor: event.target.value,
                })
              }
            />
          </div>

          <div className="property-group">
            <label htmlFor="text-align">Alignment</label>

            <select
              id="text-align"
              value={style.textAlign ?? "left"}
              onChange={(event) =>
                onUpdateStyle(id, {
                  textAlign: event.target.value as TextAlign,
                })
              }
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </>
      )}

      {type === "image" && (
        <div className="property-group">
          <label htmlFor="image-width">Width (%)</label>

          <input
            id="image-width"
            type="number"
            min="10"
            max="100"
            value={style.width ?? 100}
            onChange={(event) =>
              onUpdateStyle(id, {
                width: Number(event.target.value),
              })
            }
          />
        </div>
      )}

      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(id)}
      >
        Delete block
      </button>
    </aside>
  );
}

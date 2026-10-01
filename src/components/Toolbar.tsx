import { useRef } from "react";
import type { Block } from "../types/block";
import { parseLayout } from "../utils/serialize";

interface ToolbarProps {
  blocks: Block[];
  onLoad: (blocks: Block[]) => void;
  onClear: () => void;
}

export default function Toolbar({ blocks, onLoad, onClear }: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    localStorage.setItem(
      "dnd-builder-layout",
      JSON.stringify({
        version: 1,
        blocks,
      }),
    );

    alert("Layout saved.");
  };

  const handleLoad = () => {
    const saved = localStorage.getItem("dnd-builder-layout");

    if (!saved) {
      alert("No saved layout found.");
      return;
    }

    try {
      const blocks = parseLayout(saved);
      onLoad(blocks);
    } catch {
      alert("Could not load the saved layout.");
    }
  };

  const handleExport = () => {
    const layout = {
      version: 1,
      blocks,
    };

    const blob = new Blob([JSON.stringify(layout, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "builder-layout.json";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const blocks = parseLayout(text);

      onLoad(blocks);
    } catch {
      alert("Invalid layout file.");
    }

    event.target.value = "";
  };

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <strong>Layout</strong>
      </div>

      <div className="toolbar-actions">
        <button type="button" onClick={handleSave}>
          Save
        </button>

        <button type="button" onClick={handleLoad}>
          Load
        </button>

        <button type="button" onClick={handleExport}>
          Export JSON
        </button>

        <button type="button" onClick={handleImportClick}>
          Import JSON
        </button>

        <button type="button" className="toolbar-danger" onClick={onClear}>
          Clear
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={handleImport}
        />
      </div>
    </div>
  );
}

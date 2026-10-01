import Canvas from "./components/Canvas";
import Palette from "./components/Palette";
import PropertiesPanel from "./components/PropertiesPanel";
import { useBuilder } from "./hooks/useBuilder";
import Toolbar from "./components/Toolbar";

function App() {
  const {
    blocks,
    selectedBlockId,
    addBlock,
    moveBlock,
    selectBlock,
    updateBlock,
    updateBlockStyle,
    deleteBlock,
    loadBlocks,
    clearBlocks,
  } = useBuilder();

  const selectedBlock =
    blocks.find((block) => block.id === selectedBlockId) ?? null;

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Drag & Drop Builder</h1>
          <p>
            Build your layout by adding and arranging blocks.
          </p>
        </div>
      </header>

      <Toolbar
        blocks={blocks}
        onLoad={loadBlocks}
        onClear={clearBlocks}
      />

      <div className="builder-layout">
        <Palette onAddBlock={addBlock} />

        <Canvas
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={selectBlock}
          onMoveBlock={moveBlock}
        />

        <PropertiesPanel
          selectedBlock={selectedBlock}
          onUpdateContent={updateBlock}
          onUpdateStyle={updateBlockStyle}
          onDelete={deleteBlock}
        />
      </div>
    </div>
  );
}

export default App;

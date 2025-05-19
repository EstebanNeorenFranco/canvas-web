import React, { useState, useEffect } from "react";
import Title from "./elements/Title";
import Text from "./elements/Text";
import Chart from "./elements/Chart";

function Canvas() {
  const [blocks, setBlocks] = useState(() => {
    // Load saved blocks from localStorage on initial render
    const savedBlocks = localStorage.getItem('canvas-blocks');
    return savedBlocks ? JSON.parse(savedBlocks) : [];
  });
  const GRID_SIZE = 20; // cada celda mide 20px

  // Save blocks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('canvas-blocks', JSON.stringify(blocks));
  }, [blocks]);

  function handleDrop(e) {
    e.preventDefault();
    const type = e.dataTransfer.getData("block-type");

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // que caiga justo en una celda
    const gridX = Math.floor(x / GRID_SIZE) * GRID_SIZE;
    const gridY = Math.floor(y / GRID_SIZE) * GRID_SIZE;

    // Create new block with initial content and size based on type
    const newBlock = {
      id: Date.now(),
      type,
      x: gridX,
      y: gridY,
      content: type === 'title' ? 'New Title' : 
              type === 'text' ? 'New Text' : 
              'Chart Title',
      size: type === 'chart' ? { width: 300, height: 200 } : 
            { width: 'auto', height: 'auto' }
    };

    setBlocks([...blocks, newBlock]);
  }

  function allowDrop(e) {
    e.preventDefault();
  }

  const handleDelete = (id) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const handleMove = (id, { x, y }) => {
    const gridX = Math.floor(x / GRID_SIZE) * GRID_SIZE;
    const gridY = Math.floor(y / GRID_SIZE) * GRID_SIZE;
    
    setBlocks(blocks.map(block => 
      block.id === id 
        ? { ...block, x: gridX, y: gridY }
        : block
    ));
  };

  const handleResize = (id, { width, height }) => {
    setBlocks(blocks.map(block =>
      block.id === id
        ? { ...block, size: { width, height } }
        : block
    ));
  };

  const handleContentChange = (id, newContent) => {
    setBlocks(blocks.map(block =>
      block.id === id
        ? { ...block, content: newContent }
        : block
    ));
  };

  const renderBlock = (block) => {
    const commonProps = {
      key: block.id,
      x: block.x,
      y: block.y,
      onDelete: () => handleDelete(block.id),
      onMove: ({ x, y }) => handleMove(block.id, { x, y }),
      onResize: ({ width, height }) => handleResize(block.id, { width, height }),
      initialContent: block.content,
      initialSize: block.size,
      onContentChange: (newContent) => handleContentChange(block.id, newContent)
    };

    switch (block.type) {
      case 'title':
        return <Title {...commonProps} />;
      case 'text':
        return <Text {...commonProps} />;
      case 'chart':
        return <Chart {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="relative w-[2000px] h-[1000px] border-2 border-gray-300"
      onDrop={handleDrop}
      onDragOver={allowDrop}
      style={{
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        backgroundImage: `
          linear-gradient(to right, #ddd 1px, transparent 1px),
          linear-gradient(to bottom, #ddd 1px, transparent 1px)
        `,
      }}
    >
      {blocks.map((block) => renderBlock(block))}
    </div>
  );
}

export default Canvas;

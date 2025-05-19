import React, { useState, useEffect } from 'react';
import BaseElement from './BaseElement';

function Text({ x, y, onDelete, onMove, initialContent, initialSize, onContentChange }) {
  const [text, setText] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [size, setSize] = useState(initialSize);

  useEffect(() => {
    setText(initialContent);
  }, [initialContent]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onContentChange(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onContentChange(text);
    }
  };

  const handleResize = ({ width, height }) => {
    setSize({ width, height });
  };

  return (
    <BaseElement 
      x={x} 
      y={y} 
      onDelete={onDelete} 
      onResize={handleResize}
      onMove={onMove}
    >
      <div style={{ width: size.width, height: size.height }}>
        {isEditing ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full h-full text-base bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 resize-none"
            autoFocus
          />
        ) : (
          <p
            className="w-full h-full text-base cursor-pointer hover:text-gray-700 whitespace-pre-wrap"
            onDoubleClick={handleDoubleClick}
          >
            {text}
          </p>
        )}
      </div>
    </BaseElement>
  );
}

export default Text; 
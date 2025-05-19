import React, { useState, useEffect } from 'react';
import BaseElement from './BaseElement';

function Title({ x, y, onDelete, onMove, initialContent, initialSize, onContentChange }) {
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
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full h-full text-2xl font-bold bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
            autoFocus
          />
        ) : (
          <h2
            className="w-full h-full text-2xl font-bold cursor-pointer hover:text-gray-700"
            onDoubleClick={handleDoubleClick}
          >
            {text}
          </h2>
        )}
      </div>
    </BaseElement>
  );
}

export default Title; 
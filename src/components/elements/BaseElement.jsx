import React, { useState, useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

function BaseElement({ children, x, y, onDelete, onResize, onMove }) {
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const elementRef = useRef(null);
  const dragState = useRef({ startX: 0, startY: 0, offsetX: 0, offsetY: 0 });

  const handleMouseDown = (e, action) => {
    if (action === 'resize') {
      setIsResizing(true);
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        width: elementRef.current.offsetWidth,
        height: elementRef.current.offsetHeight
      };
    } else if (!e.target.closest('.resize-handle')) {
      setIsDragging(true);
      const rect = elementRef.current.getBoundingClientRect();
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        offsetX: e.clientX - rect.left,
        offsetY: e.clientY - rect.top
      };
    }
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const deltaX = e.clientX - dragState.current.startX;
      const deltaY = e.clientY - dragState.current.startY;
      const newWidth = Math.max(50, dragState.current.width + deltaX);
      const newHeight = Math.max(50, dragState.current.height + deltaY);
      onResize?.({ width: newWidth, height: newHeight });
    } else if (isDragging) {
      const newX = e.clientX - dragState.current.offsetX;
      const newY = e.clientY - dragState.current.offsetY;
      onMove?.({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setIsDragging(false);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setIsSelected(true);
  };

  useEffect(() => {
    if (isResizing || isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, isDragging]);

  useEffect(() => {
    if (isSelected) {
      const handleKeyDown = (e) => {
        if (e.key === 'Delete') {
          e.preventDefault();
          onDelete();
        }
      };
      const handleClickOutside = (e) => {
        if (!elementRef.current?.contains(e.target)) {
          setIsSelected(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('click', handleClickOutside);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isSelected]);

  return (
    <div
      ref={elementRef}
      className={`absolute group cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{ left: x, top: y }}
      onMouseDown={(e) => handleMouseDown(e, 'drag')}
      onClick={handleClick}
    >
      <div className="relative flex items-center gap-2">
        <div className="flex-1">{children}</div>
        <button
          onClick={onDelete}
          className="p-1 rounded-full hover:bg-red-100 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={16} className="text-gray-400 group-hover:text-red-500 transition-colors" />
        </button>

        {['se', 'sw', 'ne', 'nw'].map((corner) => (
          <div
            key={corner}
            className={`resize-handle absolute w-3 h-3 bg-white border border-gray-300 rounded-sm cursor-${corner}-resize opacity-0 group-hover:opacity-100
              ${corner.includes('e') ? '-right-1' : '-left-1'}
              ${corner.includes('s') ? '-bottom-1' : '-top-1'}`}
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
          />
        ))}
      </div>
    </div>
  );
}

export default BaseElement; 
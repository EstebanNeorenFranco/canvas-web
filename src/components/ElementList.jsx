import React from 'react';
import { Type, AlignLeft, BarChart } from 'lucide-react';

function ElementList() {
  const elements = [
    { id: 'title', icon: <Type size={20} />, name: 'Title' },
    { id: 'text', icon: <AlignLeft size={20} />, name: 'Text' },
    { id: 'chart', icon: <BarChart size={20} />, name: 'Chart' },
  ];

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-500 mb-2 px-2">Elements</h3>
      <div className="space-y-1">
        {elements.map((element) => (
          <button
            key={element.id}
            className="w-full px-2 py-1.5 flex items-center gap-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('block-type', element.id);
            }}
            data-tooltip={`Add ${element.name}`}
          >
            {element.icon}
            <span>{element.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ElementList; 
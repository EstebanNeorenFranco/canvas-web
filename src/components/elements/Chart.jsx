import React, { useState, useEffect, useRef } from 'react';
import BaseElement from './BaseElement';
import { MoreHorizontal, Database, BarChart2, LineChart, PieChart, ScatterChart, AreaChart } from 'lucide-react';
import ChartConfigModal from './ChartConfigModal';

const MENU_ITEMS = [
  { icon: <Database size={16} />, label: 'Connect Database', type: 'database' },
  { icon: <BarChart2 size={16} />, label: 'Bar Chart', type: 'chart', chartType: 'bar' },
  { icon: <LineChart size={16} />, label: 'Line Chart', type: 'chart', chartType: 'line' },
  { icon: <PieChart size={16} />, label: 'Pie Chart', type: 'chart', chartType: 'pie' },
  { icon: <ScatterChart size={16} />, label: 'Scatter Plot', type: 'chart', chartType: 'scatter' },
  { icon: <AreaChart size={16} />, label: 'Area Chart', type: 'chart', chartType: 'area' }
];

function Chart({ x, y, onDelete, onMove, initialContent, initialSize, onContentChange }) {
  const [title, setTitle] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [size, setSize] = useState(initialSize);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chartConfig, setChartConfig] = useState({ type: 'bar', dataSource: 'static', data: '' });
  const menuRef = useRef(null);

  useEffect(() => {
    setTitle(initialContent);
  }, [initialContent]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.key === 'Enter' || e.type === 'blur') {
      setIsEditing(false);
      onContentChange(e.target.value);
    }
  };

  const handleMenuAction = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <BaseElement 
      x={x} 
      y={y} 
      onDelete={onDelete} 
      onResize={setSize}
      onMove={onMove}
    >
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm" style={{ width: size.width, height: size.height }}>
        {/* Header */}
        <div className="p-2 border-b border-gray-200 flex items-center justify-between">
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                onBlur={handleTitleChange}
                onKeyDown={handleTitleChange}
                className="w-full text-sm font-medium bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                autoFocus
              />
            ) : (
              <h3
                className="text-sm font-medium cursor-pointer hover:text-gray-700"
                onDoubleClick={() => setIsEditing(true)}
              >
                {title}
              </h3>
            )}
          </div>

          {/* Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              title="Chart options"
            >
              <MoreHorizontal size={16} className="text-gray-500" />
            </button>
            
            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                {MENU_ITEMS.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleMenuAction(item.type)}
                    className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chart Content */}
        <div className="p-4 flex items-center justify-center h-[calc(100%-40px)]">
          {chartConfig.data ? (
            <div className="text-sm text-gray-600">
              {chartConfig.type} chart with {chartConfig.dataSource} data
            </div>
          ) : (
            <p className="text-sm text-gray-400">Configure your chart using the menu above</p>
          )}
        </div>
      </div>

      {/* Configuration Modal */}
      <ChartConfigModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
        onSave={(config) => {
          setChartConfig(config);
          setIsModalOpen(false);
        }}
      />
    </BaseElement>
  );
}

export default Chart; 
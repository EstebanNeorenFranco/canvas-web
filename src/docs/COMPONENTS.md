# Canvas Application Components Documentation

## Overview
This application is a canvas-based editor that allows users to create and manipulate different types of elements (Title, Text, and Chart) on a grid-based canvas. Each element can be moved, resized, and configured.

## Main Components

### Canvas (`src/components/Canvas.jsx`)
The main container component that manages the entire canvas area.

**Key Features:**
- Grid-based layout (20px grid size)
- Drag and drop functionality for new elements
- State management for all elements
- Auto-saving to localStorage

**Important Functions:**
- `handleDrop`: Manages new element creation when dropped
- `handleMove`: Updates element positions
- `handleDelete`: Removes elements
- `handleResize`: Updates element dimensions

**State:**
- `blocks`: Array of all elements on canvas
- Each block contains: id, type, x, y, content, size

### BaseElement (`src/components/elements/BaseElement.jsx`)
The foundation component that all other elements extend from.

**Key Features:**
- Dragging functionality
- Resizing from corners
- Delete capability
- Selection state

**Props:**
- `x, y`: Position coordinates
- `onDelete`: Delete callback
- `onMove`: Move callback
- `onResize`: Resize callback
- `children`: Element content

### Title (`src/components/elements/Title.jsx`)
A text element for headings.

**Key Features:**
- Double-click to edit
- Bold text styling
- Auto-resizing

**Props:**
- `initialContent`: Starting text
- `initialSize`: Starting dimensions
- `onContentChange`: Text update callback

### Text (`src/components/elements/Text.jsx`)
A text element for paragraphs.

**Key Features:**
- Double-click to edit
- Multi-line support
- Auto-resizing

**Props:**
- `initialContent`: Starting text
- `initialSize`: Starting dimensions
- `onContentChange`: Text update callback

### Chart (`src/components/elements/Chart.jsx`)
A configurable chart element.

**Key Features:**
- Multiple chart types (Bar, Line, Pie, etc.)
- Database connection option
- Configuration modal
- Title editing

**Props:**
- `initialContent`: Chart title
- `initialSize`: Chart dimensions
- `onContentChange`: Title update callback

**State:**
- `chartConfig`: Current chart configuration
- `isModalOpen`: Modal visibility
- `modalType`: Current modal type
- `isMenuOpen`: Menu visibility

### ChartConfigModal (`src/components/elements/ChartConfigModal.jsx`)
Modal for configuring chart settings.

**Key Features:**
- Chart type selection
- Data input
- Database connection settings

**Props:**
- `isOpen`: Modal visibility
- `type`: Modal type ('chart' or 'database')
- `onClose`: Close callback
- `onSave`: Save callback

## Common Patterns

### Element Creation
```javascript
// Example of creating a new element
const newBlock = {
  id: Date.now(),
  type: 'title', // or 'text' or 'chart'
  x: gridX,
  y: gridY,
  content: 'Default Content',
  size: { width: 'auto', height: 'auto' }
};
```

### Element Movement
```javascript
// Example of moving an element
const handleMove = (id, { x, y }) => {
  const gridX = Math.floor(x / GRID_SIZE) * GRID_SIZE;
  const gridY = Math.floor(y / GRID_SIZE) * GRID_SIZE;
  // Update element position
};
```

### Element Resizing
```javascript
// Example of resizing an element
const handleResize = ({ width, height }) => {
  setSize({ width, height });
};
```

## Styling
The application uses Tailwind CSS for styling. Key classes:
- `absolute`: For positioning elements
- `group`: For hover effects
- `cursor-move`: For draggable elements
- `resize-handle`: For resize corners

## State Management
- Local state for element properties
- Canvas state for element positions and types
- localStorage for persistence

## Event Handling
- Mouse events for drag and drop
- Keyboard events for deletion
- Double-click for editing
- Click outside for closing modals

## Best Practices for Modifications

1. **Adding New Elements:**
   - Create new component in `src/components/elements/`
   - Extend BaseElement
   - Add to Canvas renderBlock function
   - Update localStorage handling

2. **Modifying Existing Elements:**
   - Update component props
   - Maintain BaseElement functionality
   - Update state management
   - Test persistence

3. **Adding New Features:**
   - Consider impact on existing elements
   - Update Canvas state management
   - Maintain grid alignment
   - Test undo/redo if implemented

4. **Styling Changes:**
   - Use Tailwind classes
   - Maintain responsive design
   - Consider dark mode compatibility
   - Test different screen sizes

## Common Issues and Solutions

1. **Element Not Moving:**
   - Check BaseElement implementation
   - Verify event handlers
   - Check z-index values

2. **Resize Not Working:**
   - Verify resize handles
   - Check size constraints
   - Update state properly

3. **Content Not Saving:**
   - Check localStorage implementation
   - Verify state updates
   - Check callback functions

4. **Modal Issues:**
   - Check z-index
   - Verify event propagation
   - Check state management

## Performance Considerations

1. **State Updates:**
   - Batch related updates
   - Use proper dependency arrays
   - Avoid unnecessary re-renders

2. **Event Listeners:**
   - Clean up properly
   - Use event delegation
   - Debounce when needed

3. **Rendering:**
   - Use proper keys
   - Implement shouldComponentUpdate
   - Optimize large lists

## Testing

1. **Component Testing:**
   - Test individual elements
   - Verify interactions
   - Check state changes

2. **Integration Testing:**
   - Test element interactions
   - Verify canvas behavior
   - Check persistence

3. **User Testing:**
   - Test drag and drop
   - Verify editing
   - Check responsiveness 
# Canvas Application

A powerful and intuitive canvas-based editor that allows users to create and manipulate different types of elements on a grid-based canvas. This application is perfect for creating dynamic layouts, dashboards, and visual presentations.

## Features

- **Interactive Canvas**: Create and arrange elements on a grid-based canvas (20px grid size)
- **Multiple Element Types**:
  - Title: Create bold headings with double-click editing
  - Text: Add and edit multi-line text content
  - Chart: Create configurable charts with various types (Bar, Line, Pie)
- **Element Manipulation**:
  - Drag and drop positioning
  - Resize from corners
  - Delete elements
  - Double-click to edit content
- **Chart Features**:
  - Multiple chart types
  - Database connection options
  - Customizable configurations
  - Interactive configuration modal
- **Auto-save**: All changes are automatically saved to localStorage
- **Responsive Design**: Works across different screen sizes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Running the Application

```bash
npm start
```
The application will open in your browser at [http://localhost:3000](http://localhost:3000)

## Usage

1. **Adding Elements**:
   - Drag elements from the sidebar onto the canvas
   - Elements will snap to the grid automatically

2. **Editing Elements**:
   - Double-click any element to edit its content
   - Drag elements to reposition them
   - Use corner handles to resize elements

3. **Configuring Charts**:
   - Click the chart configuration button
   - Choose chart type
   - Input data or connect to database
   - Customize appearance

4. **Saving**:
   - All changes are automatically saved
   - No manual save required

## Technical Details

The application is built with:
- React.js
- Tailwind CSS for styling
- Local storage for persistence
- Modern JavaScript (ES6+)

## Project Structure

- `src/components/Canvas.jsx`: Main canvas container
- `src/components/elements/`: Individual element components
  - `BaseElement.jsx`: Base component for all elements
  - `Title.jsx`: Title element component
  - `Text.jsx`: Text element component
  - `Chart.jsx`: Chart element component
  - `ChartConfigModal.jsx`: Chart configuration modal

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

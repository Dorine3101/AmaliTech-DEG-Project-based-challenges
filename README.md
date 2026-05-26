# SupportFlow Visual Builder

A modern visual decision tree editor for building and testing automated customer support conversation flows.

## Overview

SupportFlow Visual Builder is a web-based tool that enables non-technical managers to design, edit, and preview chatbot conversation flows through an intuitive visual interface. It replaces error-prone Excel spreadsheets with an interactive flowchart editor that provides real-time editing and instant preview capabilities.

## Features

### Core Functionality

- **Visual Graph Editor**: Render conversation flows as connected flowcharts with absolute positioning
- **Real-time Editing**: Click any node to edit question text and options with immediate canvas updates
- **Preview Mode**: Test conversation flows as if you were a real customer with a chat interface
- **SVG Connectors**: Smooth bezier curves connecting parent and child nodes
- **Type-based Styling**: Visual distinction between start, question, and end nodes

### Wildcard Feature: Node Validation

The application includes a built-in validation system that:
- Detects nodes without valid options
- Identifies nodes with broken parent references
- Highlights invalid nodes with visual indicators
- Displays validation status in the edit panel

**Business Value**: Prevents broken conversation flows from reaching production, reducing customer frustration and support tickets.

## Technology Stack

- **React 18**: Component-based UI framework
- **Vite**: Fast build tool and development server
- **Custom CSS**: Design system with CSS variables (no component libraries)
- **SVG**: Custom connector rendering without graph libraries

## Design System

The application uses a comprehensive design system defined in `DESIGN_SYSTEM.md`, including:

- **Color Palette**: Semantic colors for different node types and states
- **Typography**: System font stack with clear hierarchy
- **Spacing**: Consistent spacing system for layout consistency
- **Components**: Detailed specifications for all UI elements

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:3000`

## Project Structure

```
supportflow-visual-builder/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Design system and global styles
│   └── main.jsx         # React entry point
├── flow_data.json       # Sample conversation flow data
├── DESIGN_SYSTEM.md     # Design system documentation
├── package.json         # Project dependencies
├── vite.config.js       # Vite configuration
└── index.html           # HTML entry point
```

## Data Structure

Conversation flows are defined in `flow_data.json` using the following structure:

```json
{
  "nodes": [
    {
      "id": "start",
      "text": "Welcome message",
      "x": 400,
      "y": 50,
      "type": "start",
      "options": ["Option 1", "Option 2"]
    },
    {
      "id": "question",
      "text": "Question text",
      "x": 200,
      "y": 200,
      "type": "question",
      "parentId": "start",
      "options": ["Yes", "No"]
    }
  ]
}
```

### Node Types

- **start**: Entry point of the conversation flow
- **question**: Decision points with multiple options
- **end**: Terminal points in the conversation

## Usage

### Editor Mode

1. **View Flow**: The canvas displays all nodes positioned according to their coordinates
2. **Edit Nodes**: Click any node to open the edit panel
3. **Modify Content**: Update question text and options in the edit panel
4. **Save Changes**: Click "Save Changes" to update the canvas immediately

### Preview Mode

1. **Toggle Mode**: Click the "▶ Preview" button in the header
2. **Interact**: Select options to navigate through the conversation flow
3. **Restart**: Click "Restart Conversation" at any point to start over

## Technical Implementation

### Custom SVG Connectors

The application implements custom SVG path rendering without using graph libraries:

- Calculates DOM coordinates for node edges
- Generates cubic bezier curves for smooth connections
- Updates paths dynamically when nodes are modified
- Uses SVG layer beneath nodes for proper z-indexing

### State Management

- React hooks for local state management
- In-memory state for node data (no database required)
- Real-time updates between editor and canvas

### Component Architecture

- **App**: Main container with mode switching
- **Header**: Navigation and mode toggle
- **Canvas**: Scrollable area with SVG connectors and node cards
- **NodeCard**: Individual node with type-specific styling
- **EditPanel**: Side panel for node editing with validation
- **PreviewChat**: Chat interface for flow testing

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari

## License

This project is part of a technical assessment for SupportFlow AI.

## Design Documentation

For detailed design specifications, color palette, typography, and component guidelines, refer to [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

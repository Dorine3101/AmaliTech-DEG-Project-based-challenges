# SupportFlow Visual Builder - Design System

## Overview
This document defines the visual language and design system for the SupportFlow Visual Builder application.

## Color Palette

### Canvas Colors
- **Background**: `#f8f9fa` - Light gray for the canvas area
- **Grid Lines**: `#e9ecef` - Subtle grid pattern for visual guidance

### Node Colors
- **Node Background**: `#ffffff` - Clean white cards
- **Node Border**: `#dee2e6` - Subtle border definition
- **Node Shadow**: `rgba(0, 0, 0, 0.1)` - Soft elevation
- **Node Hover Shadow**: `rgba(0, 0, 0, 0.15)` - Enhanced elevation on interaction

### Type-Specific Accents

#### Start Node
- **Accent Color**: `#10b981` (Green)
- **Background Tint**: `#ecfdf5`
- **Usage**: Entry point of conversation flow

#### Question Node
- **Accent Color**: `#3b82f6` (Blue)
- **Background Tint**: `#eff6ff`
- **Usage**: Decision points with multiple options

#### End Node
- **Accent Color**: `#ef4444` (Red)
- **Background Tint**: `#fef2f2`
- **Usage**: Terminal points in conversation flow

#### Error State
- **Accent Color**: `#f59e0b` (Amber)
- **Background Tint**: `#fffbeb`
- **Usage**: Validation errors and warnings

### Connector Colors
- **Default**: `#94a3b8` - Subtle gray for flow lines
- **Hover**: `#64748b` - Darker gray for emphasis

### UI Colors
- **Primary**: `#3b82f6` - Main action buttons
- **Primary Hover**: `#2563eb` - Primary button hover state
- **Success**: `#10b981` - Positive actions
- **Danger**: `#ef4444` - Destructive actions

### Text Colors
- **Primary**: `#1e293b` - Main text content
- **Secondary**: `#64748b` - Labels and metadata

## Typography

### Font Family
System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`

### Font Sizes
- **Header**: 20px, weight 600
- **Panel Title**: 18px, weight 600
- **Section Label**: 14px, weight 600 (uppercase)
- **Body Text**: 14px, regular
- **Node Text**: 14px, regular
- **Small Text**: 12px, regular
- **Badge**: 11px, weight 600 (uppercase)

## Spacing System

### Component Spacing
- **Node Width**: 280px
- **Node Padding**: 16px
- **Border Radius**: 8px
- **Grid Size**: 20px

### Layout Spacing
- **Header Padding**: 16px 24px
- **Panel Padding**: 24px
- **Chat Padding**: 20px
- **Button Padding**: 8px 16px

## Component Specifications

### Canvas
- **Background**: Light gray with 20px grid pattern
- **Overflow**: Scrollable for large flows
- **Layers**: SVG connectors (z-index 1), Nodes (z-index 10)

### Node Card
- **Dimensions**: 280px width, auto height
- **Border**: 2px solid, with 4px colored left border based on type
- **Shadow**: 0 2px 8px rgba(0, 0, 0, 0.1)
- **Hover**: Lift effect with enhanced shadow
- **Selected State**: Blue border with subtle glow
- **Error State**: Amber border and background tint

#### Node Header
- **Layout**: Flex row, space-between
- **Badge**: Type indicator with colored background
- **ID**: Small gray text for node identifier

#### Node Content
- **Text**: 14px, line-height 1.5
- **Options**: Flex wrap, 6px gap, pill-shaped badges

### Edit Panel
- **Width**: 320px
- **Background**: White with left border
- **Shadow**: Left-side elevation
- **Scroll**: Vertical overflow for long forms

#### Form Elements
- **Input/Textarea**: Full width, 10px padding, rounded corners
- **Focus State**: Blue border highlight
- **Labels**: 13px, weight 500, above inputs

### Preview Chat Interface
- **Max Width**: 500px
- **Height**: 600px
- **Border Radius**: 12px
- **Shadow**: 0 4px 20px rgba(0, 0, 0, 0.1)

#### Chat Messages
- **Bot Messages**: Left-aligned, gray background
- **User Messages**: Right-aligned, blue background, white text
- **Border Radius**: 12px with asymmetric corners

#### Chat Options
- **Layout**: Vertical stack
- **Style**: Gray background with border
- **Hover**: Blue tint with border highlight
- **Active**: Scale down effect

## Connector Lines

### SVG Path Specification
- **Type**: Cubic Bezier curves
- **Stroke**: 2px width, rounded caps
- **Color**: Gray (#94a3b8)
- **Algorithm**: Calculate control points for smooth S-curves between nodes

### Path Calculation
```
M (parentX) (parentY) 
C (control1X) (control1Y), (control2X) (control2Y), (childX) (childY)
```

Where:
- parentX/Y: Bottom center of parent node
- childX/Y: Top center of child node
- Control points create smooth vertical transitions

## Interaction States

### Hover Effects
- **Nodes**: Lift 2px, enhanced shadow
- **Buttons**: Color darkening
- **Chat Options**: Background color change, border highlight

### Active States
- **Selected Node**: Blue border with glow
- **Pressed Buttons**: Scale down to 0.98

### Transitions
- **Duration**: 0.2s for all interactive elements
- **Easing**: Smooth cubic-bezier

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Error states use color + icon indicators
- Focus states clearly visible

### Keyboard Navigation
- Tab order follows logical flow
- Enter/Space for button activation
- Escape to close panels

## Responsive Considerations

### Breakpoints
- **Desktop**: 1024px and above (primary target)
- **Tablet**: 768px - 1023px (adapted layout)
- **Mobile**: Below 768px (stacked layout)

### Adaptations
- Edit panel becomes modal on smaller screens
- Canvas zoom/pan for mobile navigation
- Chat interface takes full width on mobile

## Animation Guidelines

### Micro-interactions
- Button hover: 0.2s color transition
- Node selection: 0.2s border transition
- Chat message appearance: 300ms delay for bot messages

### Performance
- Use CSS transforms for animations
- Avoid layout thrashing
- SVG connectors update on node position change

## Design Principles

1. **Clarity**: Visual hierarchy guides user attention
2. **Efficiency**: Minimal clicks to accomplish tasks
3. **Feedback**: Immediate response to all interactions
4. **Consistency**: Uniform patterns across components
5. **Accessibility**: Inclusive design for all users

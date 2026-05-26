import React, { useState, useEffect, useRef } from "react";
import flowData from "../flow_data.json";
import "./App.css";

function App() {
  const [nodes, setNodes] = useState(flowData.nodes);
  const [selectedNode, setSelectedNode] = useState(null);
  const [mode, setMode] = useState("editor"); // 'editor' or 'preview'
  const [chatMessages, setChatMessages] = useState([]);
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const canvasRef = useRef(null);

  // Initialize preview mode
  useEffect(() => {
    if (mode === "preview") {
      const startNode = nodes.find((n) => n.type === "start");
      if (startNode) {
        setCurrentNodeId(startNode.id);
        setChatMessages([{ type: "bot", text: startNode.text }]);
      }
    }
  }, [mode, nodes]);

  // Handle node selection
  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  // Handle node text update
  const handleNodeUpdate = (updatedNode) => {
    setNodes(nodes.map((n) => (n.id === updatedNode.id ? updatedNode : n)));
    setSelectedNode(updatedNode);
  };

  // Handle option selection in preview
  const handleOptionSelect = (option, node) => {
    setChatMessages([...chatMessages, { type: "user", text: option }]);

    // Find child nodes that have this node as parent
    const childNodes = nodes.filter((n) => n.parentId === node.id);

    let childNode;
    if (node.requiresInput) {
      // For nodes that require input, navigate to the first child node
      childNode = childNodes[0];
    } else {
      // For regular options, find the specific child node based on option index
      const optionIndex = node.options.indexOf(option);
      childNode = childNodes[optionIndex];
    }

    if (childNode) {
      setCurrentNodeId(childNode.id);
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { type: "bot", text: childNode.text },
        ]);
      }, 300);
    }
  };

  // Handle restart in preview
  const handleRestart = () => {
    const startNode = nodes.find((n) => n.type === "start");
    if (startNode) {
      setCurrentNodeId(startNode.id);
      setChatMessages([{ type: "bot", text: startNode.text }]);
    }
  };

  
  const validateNodes = () => {
    const errors = [];
    nodes.forEach((node) => {
      if (
        node.type === "question" &&
        (!node.options || node.options.length === 0)
      ) {
        errors.push(node.id);
      }
      if (node.parentId && !nodes.find((n) => n.id === node.parentId)) {
        errors.push(node.id);
      }
    });
    return errors;
  };

  const invalidNodes = validateNodes();

  return (
    <div className="app">
      <Header
        mode={mode}
        onModeToggle={() => setMode(mode === "editor" ? "preview" : "editor")}
      />
      <div className="main-content">
        {mode === "editor" ? (
          <>
            <Canvas
              nodes={nodes}
              onNodeClick={handleNodeClick}
              selectedNode={selectedNode}
              invalidNodes={invalidNodes}
              canvasRef={canvasRef}
            />
            {selectedNode && (
              <EditPanel
                node={selectedNode}
                onUpdate={handleNodeUpdate}
                onClose={() => setSelectedNode(null)}
                invalidNodes={invalidNodes}
              />
            )}
          </>
        ) : (
          <PreviewChat
            messages={chatMessages}
            currentNode={nodes.find((n) => n.id === currentNodeId)}
            onOptionSelect={handleOptionSelect}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}


function Header({ mode, onModeToggle }) {
  return (
    <header className="header">
      <h1>SupportFlow Visual Builder</h1>
      <div className="header-controls">
        <button
          className={`button ${mode === "editor" ? "button-primary" : "button-secondary"}`}
          onClick={onModeToggle}
        >
          {mode === "editor" ? "▶ Preview" : "✏ Edit"}
        </button>
      </div>
    </header>
  );
}


function Canvas({ nodes, onNodeClick, selectedNode, invalidNodes, canvasRef }) {
  const [nodeElements, setNodeElements] = useState({});

  
  const getConnectorPath = (parent, child) => {
    const parentX = parent.x + 150; 
    const parentY = parent.y + 80; 
    const childX = child.x + 150;
    const childY = child.y;

    const deltaX = childX - parentX;
    const deltaY = childY - parentY;

    // Create smooth bezier curve
    const controlPoint1X = parentX;
    const controlPoint1Y = parentY + deltaY / 2;
    const controlPoint2X = childX;
    const controlPoint2Y = parentY + deltaY / 2;

    return `M ${parentX} ${parentY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${childX} ${childY}`;
  };

  // Get all connectors
  const getConnectors = () => {
    const connectors = [];
    nodes.forEach((node) => {
      if (node.parentId) {
        const parent = nodes.find((n) => n.id === node.parentId);
        if (parent) {
          connectors.push({
            from: parent,
            to: node,
            path: getConnectorPath(parent, node),
          });
        }
      }
    });
    return connectors;
  };

  const connectors = getConnectors();

  return (
    <div className="canvas" ref={canvasRef}>
      <svg className="connectors-layer">
        {connectors.map((connector, index) => (
          <path key={index} className="connector-path" d={connector.path} />
        ))}
      </svg>
      {nodes.map((node) => (
        <NodeCard
          key={node.id}
          node={node}
          onClick={() => onNodeClick(node)}
          isSelected={selectedNode?.id === node.id}
          hasError={invalidNodes.includes(node.id)}
        />
      ))}
    </div>
  );
}

// Node Card Component
function NodeCard({ node, onClick, isSelected, hasError }) {
  return (
    <div
      className={`node ${isSelected ? "selected" : ""} ${hasError ? "error" : ""}`}
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`,
      }}
      data-type={node.type}
      onClick={onClick}
    >
      <div className="node-header">
        <span className="node-type-badge">{node.type}</span>
        <span className="node-id">{node.id}</span>
      </div>
      <div className="node-text">{node.text}</div>
      {node.options && node.options.length > 0 && (
        <div className="node-options">
          {node.options.map((option, index) => (
            <span key={index} className="node-option">
              {option}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Edit Panel Component
function EditPanel({ node, onUpdate, onClose, invalidNodes }) {
  const [formData, setFormData] = useState({
    text: node.text,
    options: node.options ? node.options.join(", ") : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedNode = {
      ...node,
      text: formData.text,
      options: formData.options
        .split(",")
        .map((o) => o.trim())
        .filter((o) => o),
    };
    onUpdate(updatedNode);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const hasError = invalidNodes.includes(node.id);

  return (
    <div className="edit-panel">
      <h2>Edit Node</h2>

      {hasError && (
        <div className="validation-status invalid">
          ⚠️ This node has validation errors
        </div>
      )}

      {!hasError && (
        <div className="validation-status valid">
          ✓ Node configuration is valid
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Node ID</label>
          <input type="text" value={node.id} disabled />
        </div>

        <div className="form-group">
          <label>Node Type</label>
          <input type="text" value={node.type} disabled />
        </div>

        <div className="form-group">
          <label>Question Text</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            required
          />
        </div>

        {node.type === "question" && (
          <div className="form-group">
            <label>Options (comma-separated)</label>
            <textarea
              name="options"
              value={formData.options}
              onChange={handleChange}
              placeholder="Yes, No, Maybe"
            />
          </div>
        )}

        <div className="edit-panel-actions">
          <button type="submit" className="button button-primary">
            Save Changes
          </button>
          <button
            type="button"
            className="button button-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

// Preview Chat Component
function PreviewChat({ messages, currentNode, onOptionSelect, onRestart }) {
  const isEndNode = currentNode?.type === "end";
  const [userInput, setUserInput] = useState("");
  const requiresInput = currentNode?.requiresInput;

  const handleSend = () => {
    if (userInput.trim()) {
      onOptionSelect(userInput, currentNode);
      setUserInput("");
    }
  };

  return (
    <div className="preview-container">
      <div className="chat-interface">
        <div className="chat-header">SupportFlow Bot Preview</div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.type}`}>
              {message.text}
            </div>
          ))}
        </div>
        {isEndNode ? (
          <div className="chat-restart">
            <button className="button button-success" onClick={onRestart}>
              ↻ Restart Conversation
            </button>
          </div>
        ) : requiresInput ? (
          <div className="chat-options">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your question here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="chat-option"
              onClick={handleSend}
              disabled={!userInput.trim()}
            >
              Send
            </button>
          </div>
        ) : (
          currentNode?.options &&
          currentNode.options.length > 0 && (
            <div className="chat-options">
              {currentNode.options.map((option, index) => (
                <button
                  key={index}
                  className="chat-option"
                  onClick={() => onOptionSelect(option, currentNode)}
                >
                  {option}
                </button>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;

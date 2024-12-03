// src/components/DirectoryNode.js
import React, { useState } from 'react';

const DirectoryNode = ({ node, onCreate, onDelete, onMove }) => {
  const [newChild, setNewChild] = useState('');
  const [moveTarget, setMoveTarget] = useState('');

  if (!node) return null;

  return (
    <div style={{ marginLeft: 20 }}>
      <strong>{node.name}</strong>
      <div>
        <input
          type="text"
          placeholder="New child name"
          value={newChild}
          onChange={(e) => setNewChild(e.target.value)}
        />
        <button onClick={() => onCreate(`${node.path}/${newChild}`)}>Create</button>

        <input
          type="text"
          placeholder="Move target"
          value={moveTarget}
          onChange={(e) => setMoveTarget(e.target.value)}
        />
        <button onClick={() => onMove(node.path, moveTarget)}>Move</button>

        <button onClick={() => onDelete(node.path)}>Delete</button>
      </div>
      {node.children &&
        Object.values(node.children).map((child) => (
          <DirectoryNode
            key={child.path}
            node={child}
            onCreate={onCreate}
            onDelete={onDelete}
            onMove={onMove}
          />
        ))}
    </div>
  );
};

export default DirectoryNode;

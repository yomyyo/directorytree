// src/components/DirectoryTree.js
import React, { useState, useEffect } from 'react';
import DirectoryNode from './DirectoryNode';
import { fetchTree, createNode, deleteNode, moveNode } from '../services/api';

const DirectoryTree = () => {
  const [tree, setTree] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch initial tree structure
    fetchTree()
      .then(setTree)
      .catch(setError);
  }, []);

  const handleCreate = (path) => {
    createNode(path)
      .then(setTree)
      .catch(setError);
  };

  const handleDelete = (path) => {
    deleteNode(path)
      .then(setTree)
      .catch(setError);
  };

  const handleMove = (source, destination) => {
    moveNode(source, destination)
      .then(setTree)
      .catch(setError);
  };

  return (
    <div>
      <h1>Directory Tree</h1>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      <DirectoryNode
        node={tree}
        onCreate={handleCreate}
        onDelete={handleDelete}
        onMove={handleMove}
      />
    </div>
  );
};

export default DirectoryTree;

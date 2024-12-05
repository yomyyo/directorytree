#!/usr/bin/env node

const readline = require('readline');

class DirectoryTree {
  constructor() {
    this.fs = {}; // Represents the root of the directory tree
  }

  // Helper function to create directories
  create(path) {
    const parts = path.split('/');
    let currPath = this.fs;

    for (const part of parts) {
      if (!currPath[part]) {
        currPath[part] = {}; // Create the directory if it doesn't exist
      }
      currPath = currPath[part];
    }
  }

  // Helper function to list directories
  list() {
    this._printDirectory(this.fs, '');
  }

  // Recursive function to print directories
  _printDirectory(directory, indent) {
    for (const dir in directory) {
      console.log(`${indent}${dir}`);
      this._printDirectory(directory[dir], `${indent}  `);
    }
  }

  // Move a directory from one location to another. Make sure to delete original once moved
  move(source, destination) {
    const srcParts = source.split('/');
    const destParts = destination.split('/');
    let srcParent = this._getParent(srcParts);
    let destParent = this._getParent(destParts);

    if (!srcParent || !destParent) {
      console.log(`Cannot move ${source} - source or destination does not exist`);
      return;
    }

    const dirName = srcParts[srcParts.length - 1];
    if (srcParent[dirName]) {
      if (!destParent[destParts[destParts.length - 1]]) {
        destParent[destParts[destParts.length - 1]] = {};
      }
      destParent[destParts[destParts.length - 1]][dirName] = srcParent[dirName];
      delete srcParent[dirName];
    } else {
      console.log(`Cannot move ${source} - source does not exist`);
    }
  }

  // Delete a directory
  delete(path) {
    const parts = path.split('/');
    let parent = this._getParent(parts);
    const directoryName = parts[parts.length - 1];

    if (parent && parent[directoryName]) {
      delete parent[directoryName];
    } else {
      console.log(`Cannot delete ${path} - ${path.split('/')[0]} does not exist`);
    }
  }

  // Get the parent of a directory
  _getParent(parts) {
    let currPath = this.fs;
    for (let i = 0; i < parts.length - 1; i++) {

      // Path does not exist
      if (!currPath[parts[i]]) {
        return null;
      }
      currPath = currPath[parts[i]];
    }
    return currPath;
  }
}

// Runs commands when input is given. Case sensitive
function handleCommand(command, directoryTree) {
  const parts = command.split(' ');
  const action = parts[0];
  const path = parts.slice(1).join(' ');

  switch (action) {
    case 'CREATE':
      directoryTree.create(path);
      break;
    case 'LIST':
      directoryTree.list();
      break;
    case 'MOVE':
      const [source, destination] = path.split(' ');
      directoryTree.move(source, destination);
      break;
    case 'DELETE':
      directoryTree.delete(path);
      break;
    case 'HELP':
      console.log("Commands: CREATE <path>, LIST, MOVE <source> <destination>, DELETE <path>, HELP, EXIT");
      break;
    case 'EXIT':
      console.log("Exiting...");
      process.exit(0);
    default:
      console.log('Unknown command');
  }
}

// Main interactive script. Use readline library to get user inputs
const directoryTree = new DirectoryTree();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Enter command: '
});

console.log("Welcome to DirectoryTree!");
console.log("Commands: CREATE <path>, LIST, MOVE <source> <destination>, DELETE <path>, HELP, EXIT");

rl.prompt();

rl.on('line', (line) => {
  const command = line.trim();
  if (command) {
    handleCommand(command, directoryTree);
  }
  rl.prompt();
}).on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});

# DirectoryTree CLI Tool

## Description

The `DirectoryTree` CLI is a simple interactive Node.js application for managing a virtual directory structure. It allows you to create, list, move, and delete directories, along with a help guide for commands.

## Features

- **CREATE**: Create directories with a specified path.
- **LIST**: List all directories in a hierarchical format.
- **MOVE**: Move directories from one location to another.
- **DELETE**: Delete directories by path.
- **HELP**: Display a list of supported commands.
- **EXIT**: Exit the application.

## Prerequisites

- Node.js installed on your system.

## Usage

1. Clone or save the script to a file (e.g., `directoryTree.js`).
2. Run the script:  
   ```bash
   node directoryTree.js
   ```

## Commands

| Command Syntax                     | Description                                              |
|------------------------------------|----------------------------------------------------------|
| `CREATE <path>`                    | Creates a directory at the specified path.               |
| `LIST`                             | Lists all directories in the current structure.          |
| `MOVE <source> <destination>`      | Moves a directory from `<source>` to `<destination>`.    |
| `DELETE <path>`                    | Deletes the directory at the specified path.             |
| `HELP`                             | Displays the list of available commands.                 |
| `EXIT`                             | Exits the application.                                   |


## Notes

- Commands are **case-sensitive**.
- Invalid paths or actions will display an error message.
- MOVE command will automatically create directories if not present.
- DELETE command will delete directories along with all subdirectories.
- The directory tree is stored in memory and will reset upon exiting the program.

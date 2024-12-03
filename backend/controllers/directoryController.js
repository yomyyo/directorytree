const { putItem, getItem, deleteItem, scanTable } = require('../models/dynamoClient');

const TABLE_NAME = 'Directories';

const createDirectory = async (req, res) => {
  const { path } = req.body;
  try {
    await putItem(TABLE_NAME, { path, type: 'directory' });
    res.status(200).json({ message: `Directory ${path} created successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Error creating directory', details: error });
  }
};

const moveDirectory = async (req, res) => {
  const { src, dest } = req.body;
  try {
    const srcData = await getItem(TABLE_NAME, src);
    if (!srcData) {
      return res.status(404).json({ error: 'Source directory does not exist' });
    }
    await deleteItem(TABLE_NAME, src);
    await putItem(TABLE_NAME, { path: `${dest}/${src.split('/').pop()}`, type: 'directory' });
    res.status(200).json({ message: `Directory moved from ${src} to ${dest}` });
  } catch (error) {
    res.status(500).json({ error: 'Error moving directory', details: error });
  }
};

const deleteDirectory = async (req, res) => {
  const { path } = req.body;
  try {
    await deleteItem(TABLE_NAME, path);
    res.status(200).json({ message: `Directory ${path} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting directory', details: error });
  }
};

const listDirectories = async (_req, res) => {
  try {
    const items = await scanTable(TABLE_NAME);
    const directories = items.map((item) => item.path);
    res.status(200).json(directories);
  } catch (error) {
    res.status(500).json({ error: 'Error listing directories', details: error });
  }
};

module.exports = {
  createDirectory,
  moveDirectory,
  deleteDirectory,
  listDirectories,
};

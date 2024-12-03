// src/services/api.js
const API_URL = 'http://54.191.76.202:5000/api';

export const fetchTree = async () => {
  const response = await fetch(`${API_URL}/tree`);
  if (!response.ok) throw new Error('Failed to fetch directory tree');
  return response.json();
};

export const createNode = async (path) => {
  const response = await fetch(`${API_URL}/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path }),
  });
  if (!response.ok) throw new Error('Failed to create directory');
  return response.json();
};

export const deleteNode = async (path) => {
  const response = await fetch(`${API_URL}/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path }),
  });
  if (!response.ok) throw new Error('Failed to delete directory');
  return response.json();
};

export const moveNode = async (source, destination) => {
  const response = await fetch(`${API_URL}/move`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source, destination }),
  });
  if (!response.ok) throw new Error('Failed to move directory');
  return response.json();
};

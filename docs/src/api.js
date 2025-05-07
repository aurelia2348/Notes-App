// src/api.js

const API_URL = 'https://notes-api.dicoding.dev/v2/notes';

// Mendapatkan semua catatan
export async function getNotes() {
  const response = await fetch(API_URL);
  const result = await response.json();
  return result.data;
}

// Menambahkan catatan baru
export async function addNote(note) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  const result = await response.json();
  return result.data;
}

// Menghapus catatan
export async function deleteNote(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  return result.message;
}

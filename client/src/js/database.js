// Import the openDB function from 'idb'
import { openDB } from 'idb';

// Initialize the IndexedDB database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Function to add content to the database
export const putDb = async (content) => {
  // Open the database
  const db = await initdb();

  // Use a transaction to access the object store
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Add the content to the object store
  await store.add({ content });

  // Complete the transaction
  await tx.done;

  console.log('Content added to the database');
};

// Function to get all content from the database
export const getDb = async () => {
  // Open the database
  const db = await initdb();

  // Use a transaction to access the object store
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Retrieve all content from the object store
  const contentArray = await store.getAll();

  // Complete the transaction
  await tx.done;

  console.log('Content retrieved from the database');
  
  return contentArray;
};

initdb();

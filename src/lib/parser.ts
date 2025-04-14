import { openDB } from 'idb';

export async function savePrompt(prompt: string) {
  try {
    const db = await openDB('CodeZIP', 1, {
      upgrade(db) {
        db.createObjectStore('prompts');
      },
    });
    await db.put('prompts', prompt, 'quark-prompt.txt');
  } catch (error) {
    console.error('Failed to save prompt:', error);
  }
}

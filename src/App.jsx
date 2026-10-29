
import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}

function NoteItem({ note, onDelete }) {
  const { theme } = useContext(ThemeContext);

  return (
    <li className={`note ${theme}`}>
      <span>{note.text}</span>
      <button className="delete" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </li>
  );
}

function App() {
  const { theme } = useContext(ThemeContext);

  const [input, setInput] = useState('');

  const [notes, setNotes] = useState(() =>
    JSON.parse(localStorage.getItem('notes') || '[]')
  );

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    document.title = `Notes (${notes.length})`;
  }, [notes.length]);

  function addNote() {
    if (input.trim() === '') return;

    setNotes([
      ...notes,
      { id: Date.now(), text: input.trim() }
    ]);

    setInput('');
  }

  function deleteNote(id) {
    setNotes(notes.filter(note => note.id !== id));
  }

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <h1>My Notes</h1>

        <ThemeToggle />

        <div className="input-box">
          <input
            type="text"
            placeholder="Write a note..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') addNote();
            }}
          />

          <button onClick={addNote}>Add Note</button>
        </div>

        <h2>Notes ({notes.length})</h2>

        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          <ul>
            {notes.map(note => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={deleteNote}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

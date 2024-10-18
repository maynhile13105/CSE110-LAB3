import React, { useEffect, useState } from 'react';
import './App.css';
import { Label, Note } from "./types";
import ToggleTheme from "./hooks";
import { dummyNotesList } from './constants';

export const StickyNotes = () => {
    const [lastID, setLastID] = useState<number>(dummyNotesList.length);
  //Manage the list of notes in state
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);

  // Manage the list of favorite notes in state
  const [favNotesList, setFavNotesList] = useState<Note[]>([]);

  // Favorite/Unfavorite Note Button
  function ClickHeart({ note }: { note: Note }) {
    // Check if the note is already a favorite initially
    const [isFav, setIsFav] = useState(favNotesList.includes(note));

    const heartClick = () => {
      setIsFav(!isFav); // Toggle the favorite state
    };

    useEffect(() => {
      if(isFav && !favNotesList.includes(note))
      {
        setFavNotesList((prev)=>[...prev, note]);
      }
      else if(!isFav && favNotesList.includes(note))
      {
        setFavNotesList((prev)=>prev.filter((noteChecking) => noteChecking !== note));
      }
      
    }, [isFav]);

    return (
      <button
        id="heart"
        onClick={heartClick}
        style={{ color: isFav ? 'red' : 'black' }}
      >
        {isFav ? '❤' : '♡'}
      </button>
    );
  }

  // Create and Save new notes

  const initialNote = {
    id: -1,
    title: '',
    content: '',
    label: Label.other,
  };

  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const newNote = { ...createNote, id: lastID + 1 };
    setLastID(lastID+1);
    setNotes([newNote, ...notes]);
    setCreateNote(initialNote);
  };

  //Delete note
  const deleteNoteHandler = (delNote: Note) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== delNote.id));
    //Delete if it is also in favorite list
    if(favNotesList.includes(delNote)){
      setFavNotesList((prevNotes) => prevNotes.filter((note) => note !== delNote))
    }
  };

  //Update note
  const editNoteHandler = (editedNote: Note) => {
    setFavNotesList((prev)=>prev.map((note) => note.id === editedNote.id? editedNote : note ));
    setNotes((prev)=>prev.map((note)=>editedNote.id === note.id? editedNote : note));
  };



  return (
    <div className="App-container">
      <div className="left-side">
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note Title"
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })
              }
              value={createNote.title}
              required
            ></input>
          </div>
          <div>
            <textarea
              placeholder="Note Content"
              onChange={(event) => 
                setCreateNote({ ...createNote, content: event.target.value })
              }
              value={createNote.content}
              required
            ></textarea>
          </div>
          <select
            value={createNote.label}
            onChange={(event) =>
              setCreateNote({
                ...createNote,
                label: event.target.value as Label,
              })
            }
            required
          >
            <option value={Label.other}>Other</option>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
          </select>
          <div>
            <button type="submit">Create Note</button>
          </div>
        </form>

        <div className = "theme-button">
            <ToggleTheme/>
        </div>
      </div>
      
      
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="note-header">
              <ClickHeart note={note} />
              <button id="close-button" onClick={()=>deleteNoteHandler(note)}>x</button>
            </div>
            <h2 contentEditable="true"
                onBlur={(event)=>editNoteHandler({
                  ...note,
                  title: event.currentTarget.textContent || ""})}>
              {note.title}
            </h2>
            <p contentEditable="true"
              onBlur={(event)=>editNoteHandler({
              ...note,
              content: event.currentTarget.textContent || ""})}>
                {note.content}
            </p>
            <select
            value={note.label}
            onChange={(event) =>
              editNoteHandler({
                ...note,
                label: event.target.value as Label,
              })
            }>
              <option value={Label.other}>Other</option>
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
            </select>    
            
          </div>
        ))}
      </div>
      
      <div className="favList">
        <label>List of favorites:</label>
        <ul>
          {favNotesList.map(note => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  async function addNote(newNote) {
    const url = "http://localhost:35033/api/note";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newNote),
      credentials: "include"
    }

    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);
  }

  async function deleteNote(id) {
    const url = "http://localhost:35033/api/note";
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id: id}),
      credentials: "include"
    }

    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data);

  }

  async function getNotes() {
    const url = "http://localhost:35033/api/note";
    const options = {
      method: "GET",
      credentials: "include"
    };

    const response = await fetch(url, options);
    const data = await response.json();

    setNotes(data.notes);

  }

  useEffect(() => {
    getNotes();
  }, [notes])

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;

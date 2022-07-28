import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import CreateNoteComponent from "./pages/CreateNoteComponent";
import SaveNoteComponent from "./pages/SaveNoteComponent";
import LoginComponent from "./pages/LoginComponent";
import RegisterComponent from "./pages/RegisterComponent";
import NoteListComponent from "./pages/NoteListComponent";
import NoteDetailsComponent from "./pages/NoteDetailsComponent";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<NoteListComponent />} />
          <Route path='/register' element={<RegisterComponent />} />
          <Route path='/login' element={<LoginComponent />} />
          <Route path='/createNote' element={<CreateNoteComponent />} />
          <Route path='/note/:id' element={<NoteDetailsComponent />} />
          <Route path='/saveNote' element={<SaveNoteComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

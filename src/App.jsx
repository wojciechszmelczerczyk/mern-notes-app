import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateNoteComponent from "./components/CreateNoteComponent";
import SaveNoteComponent from "./components/SaveNoteComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import NoteListComponent from "./components/NoteListComponent";
import NoteDetailsComponent from "./components/NoteDetailsComponent";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
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

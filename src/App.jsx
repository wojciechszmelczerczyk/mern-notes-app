import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateNoteComponent from "./components/CreateNoteComponent";
import LoginComponent from "./components/LoginComponent";
import NotesListComponent from "./components/NotesListComponent";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NotesListComponent />} />
          <Route path='/create' element={<CreateNoteComponent />} />
          <Route path='/login' element={<LoginComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

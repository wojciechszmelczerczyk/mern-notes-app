import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateNoteComponent from "./pages/CreateNoteComponent";
import LoginComponent from "./pages/LoginComponent";
import RegisterComponent from "./pages/RegisterComponent";
import NoteListComponent from "./pages/NoteListComponent";
import NoteDetailsComponent from "./pages/NoteDetailsComponent";
import NotFoundComponent from "./pages/NotFoundComponent";

import { AuthContext } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkDefault, setIsDarkDefault] = useState(false);

  const authValue = [isLoggedIn, setIsLoggedIn];
  const themeValue = [isDarkDefault, setIsDarkDefault];

  return (
    <div className='App'>
      <AuthContext.Provider value={authValue}>
        <ThemeContext.Provider value={themeValue}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<NoteListComponent />} />
              <Route path='/register' element={<RegisterComponent />} />
              <Route path='/login' element={<LoginComponent />} />
              <Route path='/createNote' element={<CreateNoteComponent />} />
              <Route path='/note/:id' element={<NoteDetailsComponent />} />
              <Route path='*' element={<NotFoundComponent />} />
            </Routes>
          </BrowserRouter>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

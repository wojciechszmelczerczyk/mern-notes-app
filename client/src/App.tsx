import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateNoteComponent from "./pages/CreateNoteComponent";
import LoginComponent from "./pages/LoginComponent";
import RegisterComponent from "./pages/RegisterComponent";
import NoteListComponent from "./pages/NoteListComponent";
import NoteDetailsComponent from "./pages/NoteDetailsComponent";
import NotFoundComponent from "./pages/NotFoundComponent";

import { AuthContext } from "./context/AuthContext";
import { SidebarContext } from "./context/SidebarContext";
import { SearchContext } from "./context/SearchContext";

import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const authValue = [isLoggedIn, setIsLoggedIn];
  const sidebarValue = [isSidebarActive, setIsSidebarActive];
  const searchValue = [isSearchActive, setIsSearchActive];

  return (
    <div className='App'>
      <AuthContext.Provider value={authValue}>
        <SidebarContext.Provider value={sidebarValue}>
          <SearchContext.Provider value={searchValue}>
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
          </SearchContext.Provider>
        </SidebarContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

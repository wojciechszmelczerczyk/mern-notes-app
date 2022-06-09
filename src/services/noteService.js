import axios from "axios";

class NoteService {
  createNote(title) {
    return axios.post(
      "http://localhost:3000/note",
      {
        title,
      },
      { withCredentials: true }
    );
  }
  saveNote(content, id) {
    return axios.post(
      "http://localhost:3000/note/save",
      { content, id },
      { withCredentials: true }
    );
  }
  getNotes() {
    return axios.get("http://localhost:3000/note", {
      withCredentials: true,
    });
  }
}

export default new NoteService();

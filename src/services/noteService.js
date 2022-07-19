import axios from "axios";
// import axiosInstance from "../../server/token/rtInterceptor";

class NoteService {
  createNote(at, title) {
    return axios.post(
      "http://localhost:3000/note",
      {
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${at}`,
        },
        withCredentials: true,
      }
    );
  }
  saveNote(at, content, id) {
    return axios.post(
      "http://localhost:3000/note/save",
      { content, id },
      {
        headers: {
          Authorization: `Bearer ${at}`,
        },
        withCredentials: true,
      }
    );
  }
  getNotes(at) {
    return axios.get("http://localhost:3000/note", {
      headers: {
        Authorization: `Bearer ${at}`,
      },
      withCredentials: true,
    });
  }
}

export default new NoteService();

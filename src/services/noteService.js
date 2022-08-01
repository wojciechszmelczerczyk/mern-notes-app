import axiosInstance from "../api/axiosInstance";

class NoteService {
  createNote(at, title) {
    return axiosInstance.post(
      "/note",
      {
        title,
      },
      {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      }
    );
  }

  saveNote(at, content, id) {
    return axiosInstance.post(
      "/note/save",
      { content, id },
      {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      }
    );
  }

  getNotes(at) {
    return axiosInstance.get("/note", {
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });
  }

  getSingleNote(at, id) {
    return axiosInstance.get(`/note/${id}`, {
      headers: {
        Authorization: `Bearer ${at}`,
      },
    });
  }

  updateNote(at, id, noteContent) {
    return axiosInstance.put(
      `/note/${id}`,
      { content: noteContent },
      {
        headers: {
          Authorization: `Bearer ${at}`,
        },
      }
    );
  }

  downloadNote(at, id, format) {
    let responseType;

    if (format === "pdf") {
      responseType = "blob";
    } else if (format === "txt") {
      responseType = "text";
    }

    return axiosInstance.post(
      `/note/${id}/file`,
      { format },
      {
        headers: {
          Authorization: `Bearer ${at}`,
        },
        responseType,
      }
    );
  }
}

export default new NoteService();

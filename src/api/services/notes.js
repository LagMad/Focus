import { axiosInstance } from "../coreApi";

const addNote = async (body) => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axiosInstance.post(
      "notes",
      {
        title: body.title,
        content: body.content,
        pinned: body.pinned,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

const getNote = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axiosInstance.get(`notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const editNote = async ( id, noteData) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axiosInstance.put(`notes/${id}`, noteData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  
  const deleteNote = async ( id ) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axiosInstance.delete(`notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export { addNote, getNote, editNote, deleteNote };

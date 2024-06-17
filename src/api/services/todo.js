import { axiosInstance } from "../coreApi";

const addToDo = async (body) => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axiosInstance.post(
      "todos",
      {
        title: body.title,
        deadline: body.deadline,
        completed: body.completed,
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

const getToDo = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axiosInstance.get(`todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const editToDo = async ( id, ToDoData) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axiosInstance.put(`todos/${id}`, ToDoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  
  const deleteToDo = async ( id ) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axiosInstance.delete(`todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export { addToDo, getToDo, editToDo, deleteToDo };

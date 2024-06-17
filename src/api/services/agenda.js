import { axiosInstance } from "../coreApi";

const addAgenda = async (body) => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axiosInstance.post(
      "events",
      {
        title: body.title,
        description: body.description,
        start_time: body.start_time,
        end_time: body.end_time,
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

const getAgenda = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axiosInstance.get(`events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const editAgenda = async ( id, agendaData) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axiosInstance.put(`events/${id}`, agendaData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  
  const deleteAgenda = async ( id ) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axiosInstance.delete(`events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export { addAgenda, getAgenda, editAgenda, deleteAgenda };

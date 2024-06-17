import { axiosInstance } from "../coreApi";

const addHabit = async (body) => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axiosInstance.post(
      "habits",
      {
        name: body.name,
        time_of_day: body.time_of_day,
        monday: body.monday,
        tuesday: body.tuesday,
        wednesday: body.wednesday,
        thursday: body.thursday,
        friday: body.friday,
        saturday: body.saturday,
        sunday: body.sunday,
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

const getHabit = async () => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axiosInstance.get(`habits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const editHabit = async ( id, agendaData) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axiosInstance.put(`habits/${id}`, agendaData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  
  const deleteHabit = async ( id ) => {
    const token = window.localStorage.getItem("token");
    try {
      const response = await axiosInstance.delete(`habits/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export { addHabit, getHabit, editHabit, deleteHabit };

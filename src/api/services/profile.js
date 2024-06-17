import { axiosInstance } from "../coreApi";

const getUser = async () => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axiosInstance.get(`profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const editUser = async (body) => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axiosInstance.put(
      `profile`,
      {
        name : body.name,
        email : body.email
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

export { getUser, editUser };

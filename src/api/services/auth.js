import { axiosInstance } from "../coreApi";

const handleLogin = async (body) => {
  try {
    const response = await axiosInstance.post("login", {
      email: body.email,
      password: body.password,
    });
    console.log(response.data.token)
    const { token } = response.data;
    window.localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const handleRegister = async (body) => {
  try {
    const response = await axiosInstance.post("register", {
      name: body.name,
      email: body.email,
      password: body.password,
      password_confirmation: body.password_confirmation // Correct key name
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { handleLogin, handleRegister };

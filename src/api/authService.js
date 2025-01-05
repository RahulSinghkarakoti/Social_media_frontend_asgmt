import axiosInstance from "./axiosInstence";

const login = async (data) => {
    console.log("login");
    try {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data;
    } catch (error) { 
        throw error;
    }
  };

  const signup = async (formData) => {
    console.log("signup");
    try {
      const response = await axiosInstance.post("/auth/signup", formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  const getCurrentUser = async () => {
    console.log("getCurentUser");
    try {
      const response = await axiosInstance.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error;
    }
  };
export { getCurrentUser, login, signup };

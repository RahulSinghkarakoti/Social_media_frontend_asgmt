import axiosInstance from "./axiosInstence";

const searchUsers = async (params) => { //done
  try {
    const response = await axiosInstance.get(`users/search/${params}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


const getFriends = async () => { //done
    try {
      const response = await axiosInstance.get(`users/friends`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  const getUser = async (userId) => { //done
    try {
      console.log("in service ", userId)
      const response = await axiosInstance.get(`users/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  const unfriend = async (friendId) => {
    try {
      const response = await axiosInstance.delete(`users/friends/${friendId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  


export { searchUsers, getFriends, getUser, unfriend };

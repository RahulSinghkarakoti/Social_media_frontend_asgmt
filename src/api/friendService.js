import axiosInstance from "./axiosInstence";

const sendFriendRequest = async (userId) => {
  try {
    const response = await axiosInstance.post(`friends/requests/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getFriendRequests = async () => {
  try {
    const response = await axiosInstance.get(`friends/requests`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const acceptFriendRequest = async (requestId) => {
  try {
    const response = await axiosInstance.put(`friends/requests/accept/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const rejectFriendRequest = async (requestId) => {
  try {
    const response = await axiosInstance.delete(`friends/requests/delete/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  rejectFriendRequest
};
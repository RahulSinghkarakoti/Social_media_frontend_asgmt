import axiosInstance from "./axiosInstence";

const recommendFriends = async (userId) => {
  try {
    const response = await axiosInstance.get(`reccomendation/recommendfriends/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { recommendFriends };

import axiosInstance from "../axios";

const getReviewsByUser = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`users/${userId}/reviews`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error();
  }
};

const getRestaurantsByUser = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`users/${userId}/restaurants`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error();
  }
};

export { getRestaurantsByUser, getReviewsByUser };

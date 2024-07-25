import axiosInstance from "../axios";

const fetchRestaurants = async () => {
    try {
        const response = await axiosInstance.get("restaurants");
        return response.data
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const createRestaurant = async (formData: any) => {
    try {
        const response = await axiosInstance.post("restaurants", formData);
        return response.data
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export {fetchRestaurants, createRestaurant}
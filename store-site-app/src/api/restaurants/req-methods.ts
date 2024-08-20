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

const getRestaurant = async (restaurantId: string) => {
    try {
        const response = await axiosInstance.get(`restaurants/${restaurantId}`);
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

const fetchRestaurantWithReview = async (restaurantId: string) => {
    try {
        const response = await axiosInstance.get(`restaurants/${restaurantId}/reviews`);
        return response.data
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const createReview = async (restaurantId: string, formData: any) => {
    try {
        const response = await axiosInstance.post(`reviews/${restaurantId}`, formData)
        return response.data
    } catch (err) {
        console.error(err);
        throw err;
    }
}

const deleteRestaurant = async (restaurantId: string) => {
    try {
        const response = await axiosInstance.delete(`restaurants/${restaurantId}`)
        return response.data
    } catch (err) {
        console.error(err)
        throw err
    }
}

const updateRestaurant = async (restaurantId: string, formData: any) => {
    try {
        const response = await axiosInstance.patch(`restaurants/${restaurantId}`, formData)
        return response.data
    } catch (err) {
        console.error(err)
        throw err
    }
}


const deleteReviewFromRestaurant = async (reviewId: string, restaurantId: string) => {
    try {
        const response = await axiosInstance.delete(`reviews/${reviewId}/${restaurantId}`)
        return response.data
    } catch (err) {
        console.error(err)
        throw err
    }
}

const updateReviewOnRestaurant = async (reviewId: string, formData: any) => {
    try {
        const response = await axiosInstance.patch(`reviews/${reviewId}`, formData)
        return response.data
    } catch (err) {
        console.error(err)
        throw err
    }
}

const getReview = async (reviewId: string) => {
    try {
        const response = await axiosInstance.get(`reviews/${reviewId}`)
        return response.data
    } catch (err) {
        console.error(err)
        throw err
    }
}


export {fetchRestaurants, createRestaurant, fetchRestaurantWithReview, createReview, deleteRestaurant, updateRestaurant, getRestaurant, deleteReviewFromRestaurant, updateReviewOnRestaurant, getReview}
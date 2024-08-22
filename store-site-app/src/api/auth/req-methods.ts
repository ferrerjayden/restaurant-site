import { LoginUser, RegisterUser } from "../../common-types";
import axiosInstance from "../axios";

const registerUser = async (formData: RegisterUser) => {
  try {
    const response = await axiosInstance.post("users/register", formData);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const loginUser = async (formData: LoginUser) => {
  try {
    const response = await axiosInstance.post("/auth/login", formData);
    const { access_token } = response.data;
    localStorage.setItem("accessToken", access_token);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { registerUser, loginUser };

import axios from "axios";
const API_URL_LOGIN = "/api/auth/login";
const API_URL_GOOGLE = "/api/auth/profile";
const API_URL_FACEBOOK = "/api/auth/facebook";
const API_URL_REGISTER = "/api/auth/register";
const API_URL_FORGET_PASSWORD = "/api/auth/send-email";
const API_URL_RESET_PASSWORD = "/api/auth/reset-password";
import { User } from "../../type";
// type obj = User & objectId;

const registerUser = async (row: User): Promise<object> => {
  const response = await axios.post(API_URL_REGISTER, row);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return await response.data;
};
const loginUser = async (row: User): Promise<object> => {
  const response = await axios.post(API_URL_LOGIN, row);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return await response.data;
};
const googleUser = async (row: User): Promise<object> => {
  const response = await axios.post(API_URL_GOOGLE, row);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return await response.data;
};
const facebookUser = async (row: User): Promise<object> => {
  const response = await axios.post(API_URL_FACEBOOK, row);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return await response.data;
};
const forgetPassword = async (row: { email: string }): Promise<object> => {
  const response = await axios.post(API_URL_FORGET_PASSWORD, row);

  return await response.data;
};
const resetPassword = async (row: {
  id: string;
  password: string;
  cpassword: string;
}): Promise<object> => {
  const response = await axios.post(`${API_URL_RESET_PASSWORD}/${row.id}`, row);

  return await response.data;
};
const logout = async () => {
  localStorage.removeItem("user");
};
const reportService = {
  registerUser,
  loginUser,
  googleUser,
  facebookUser,
  logout,
  forgetPassword,
  resetPassword,
};
export default reportService;

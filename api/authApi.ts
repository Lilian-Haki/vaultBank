import apiClient from "./apiClient";

export const registerUser = async (data: any) => {
  return apiClient.post("/register", data);
};

export const verifyOtp = async (data: any) => {
  return apiClient.post("/verify-otp", data);
};

export const loginUser = async (data: any) => {
  return apiClient.post("/login", data);
};
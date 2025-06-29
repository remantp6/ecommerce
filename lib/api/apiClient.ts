import axiosInstance from "./axiosInstace";

// This file defines a generic API client using Axios for making HTTP requests.
export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await axiosInstance.get<T>(endpoint);
    return response.data;
  },

  post: async <R, T>(endpoint: string, payload: R): Promise<T> => {
    const response = await axiosInstance.post<T>(endpoint, payload);
    return response.data;
  },

  patch: async <R, T>(endpoint: string, payload: R): Promise<T> => {
    const response = await axiosInstance.patch<T>(endpoint, payload);
    return response.data;
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await axiosInstance.delete<T>(endpoint);
    return response.data;
  },
};

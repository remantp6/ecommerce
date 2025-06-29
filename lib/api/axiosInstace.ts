import axios, { AxiosError } from "axios";
import ERROR_MESSAGES from "@/config/customError";
import {
  clearSessionTokens,
  getSessionTokens,
  setSessionTokens,
} from "./tokenService";

// Define the type for failed requests
type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (error: AxiosError | null) => void;
};

// Create an Axios instance with a base URL and default headers
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Flag to track if a token refresh is in progress
// This prevents multiple requests from trying to refresh the token at the same time
let isRefreshing = false;

// Queue to hold failed requests while the token is being refreshed
// This allows us to retry them once we have a new token
let failedQueue: FailedRequest[] = [];

// Function to process the queue of failed requests
// It resolves or rejects each request based on whether we have a new token or an error
const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Add access token to all requests
axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = getSessionTokens();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Handle errors globally + refresh token logic
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    let message = ERROR_MESSAGES.GENERIC_ERROR;

    if (error.response) {
      const { status, data } = error.response;

      // Handle 401 Unauthorized with refresh token logic
      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const { refreshToken } = getSessionTokens();
        if (!refreshToken) {
          clearSessionTokens();
          window.location.href = "/auth/login";
          // return Promise.reject(new Error("No refresh token available"));
        }

        // If we are already refreshing the token, wait for it to finish
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/refresh-token`,
            { refreshToken }
          );
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.data;

          setSessionTokens(newAccessToken, newRefreshToken);
          axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);
          return axiosInstance(originalRequest);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            processQueue(err, null);
          } else {
            processQueue(null, null);
          }
          clearSessionTokens();
          window.location.href = "/auth/login";
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      // For other error statuses
      if (data && data.message) {
        message = data.message;
      } else {
        message = ERROR_MESSAGES[status] || message;
      }
    } else {
      // Handle network errors
      message = ERROR_MESSAGES.NETWORK_ERROR;
    }

    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // send cookies with requests
});

// Set up axios instance
axiosInstance.interceptors.request.use((config) => {
  // Modify or log request config if necessary

  return config;
});

// Response Interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    // If response is successful, just return the data
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if it's a 401 error and not retrying already
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retrying to avoid loops

      try {
        // Attempt to refresh the access token
        await axiosInstance.post("/auth/refresh-token");

        // Retry the original request after refresh
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle failed token refresh (e.g., redirect to login)
        console.error("Refresh token failed:", refreshError);
        // Optionally log out the user here
      }
    }

    // Reject the original error if it's not a 401 or refresh fails
    return Promise.reject(error);
  }
);
export default axiosInstance;

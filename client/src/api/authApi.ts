import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

// Register function
export const register = async (fullName: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, {
      full_name: fullName,
      email: email,
      password: password,
    });
    return response.data; // Return the response data (e.g., user data, success message)
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Registration failed');
  }
};

// Login function
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, {
      email: email,
      password: password,
    });
    return response.data; // Return the response data (e.g., user data, token)
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Login failed');
  }
};

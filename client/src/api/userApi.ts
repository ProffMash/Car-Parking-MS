import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/users"; // Base API URL
const REGISTER_URL = "http://127.0.0.1:8000/api/register/"; // User registration endpoint

// Fetch all users
export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// Fetch a single user by ID
export const fetchUserById = async (userId: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/${userId}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        throw error;
    }
};

// Create a new user
export const createUser = async (userData: { full_name: string; email: string }) => {
    try {
        const response = await axios.post(`${BASE_URL}/`, userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

// Register a new user
export const registerUser = async (userData: { full_name: string; email: string; password: string }) => {
    try {
        const response = await axios.post(REGISTER_URL, userData, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

// Update an existing user
export const updateUser = async (id: string, userData: { full_name: string; email: string }) => {
    try {
        const response = await axios.put(`${BASE_URL}/${id}/`, userData, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        throw error;
    }
};

// Delete a user
export const deleteUser = async (userId: string) => {
    try {
        await axios.delete(`${BASE_URL}/${userId}/`);
        return { message: "User deleted successfully" };
    } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
        throw error;
    }
};

// Fetch total user count
export const fetchUserCount = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/count/`);
        return response.data.total_users;
    } catch (error) {
        console.error("Error fetching user count:", error);
        throw error;
    }
};

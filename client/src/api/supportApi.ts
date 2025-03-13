import axios from "axios";

const BASE_URL = "https://carparking-backend.onrender.com/api/support/";

export interface SupportMessage {
  id?: number;
  name: string;
  email: string;
  message: string;
}

// Fetch all support messages
export const getSupportMessages = async () => {
  try {
    const response = await axios.get<SupportMessage[]>(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching support messages:", error);
    throw error;
  }
};

// Fetch a single support message by ID
export const getSupportMessageById = async (id: number) => {
  try {
    const response = await axios.get<SupportMessage>(`${BASE_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching support message:", error);
    throw error;
  }
};

// Create a new support message (Submit a support request)
export const createSupportMessage = async (message: SupportMessage) => {
  try {
    const response = await axios.post<SupportMessage>(BASE_URL, message);
    return response.data;
  } catch (error) {
    console.error("Error submitting support message:", error);
    throw error;
  }
};

// Delete a support message by ID
export const deleteSupportMessage = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}${id}/`);
  } catch (error) {
    console.error("Error deleting support message:", error);
    throw error;
  }
};

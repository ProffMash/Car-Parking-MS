import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/contacts";

export interface Contact {
  id?: number;
  name: string;
  email: string;
  message: string;
}

export const getContacts = async () => {
  try {
    const response = await axios.get<Contact[]>(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

export const getContactById = async (id: number) => {
  try {
    const response = await axios.get<Contact>(`${BASE_URL}/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contact by ID:", error);
    throw error;
  }
};

export const createContact = async (contact: Contact) => {
  try {
    const response = await axios.post<Contact>(`${BASE_URL}/`, contact);
    return response.data;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};

export const updateContact = async (id: number, contact: Contact) => {
  try {
    const response = await axios.put<Contact>(`${BASE_URL}/${id}/`, contact);
    return response.data;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};

export const deleteContact = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}/${id}/`);
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
};

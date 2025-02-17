import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/bookings/";

export interface Booking {
  id?: number;
  total_amount: string;
  start_time: string;
  duration: number;
  mobile_number: string;
  license_plate: string;
  parking_slot: number;
}

// Fetch all bookings
export const getBookings = async () => {
  try {
    const response = await axios.get<Booking[]>(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

// Fetch a single booking by ID
export const getBookingById = async (id: number) => {
  try {
    const response = await axios.get<Booking>(`${BASE_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }
};

// Create a new booking
export const createBooking = async (booking: Booking) => {
  try {
    const response = await axios.post<Booking>(`${BASE_URL}`, booking);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

// Update an existing booking
export const updateBooking = async (id: number, booking: Booking) => {
  try {
    const response = await axios.put<Booking>(`${BASE_URL}${id}/`, booking);
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

// Delete a booking by ID
export const deleteBooking = async (id: number) => {
  try {
    await axios.delete(`${BASE_URL}${id}/`);
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

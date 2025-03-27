import axios from 'axios';

const API_URL = 'https://carparking-backend.onrender.com/api/parking-slots/';

export interface ParkingSlot {
  id: number;
  spot_name: string;
  level: string;
  slot_type: 'standard' | 'premium' | 'vip';
  rate_per_hour: string;
  is_available: boolean;
}

// Fetch all parking slots
export const getParkingSlots = async (): Promise<ParkingSlot[]> => {
  try {
    const response = await axios.get<ParkingSlot[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching parking slots:', error);
    throw error;
  }
};

// Book a parking slot
export const bookParkingSlot = async (slotId: number): Promise<void> => {
  try {
    await axios.post(`${API_URL}${slotId}/book/`);
  } catch (error) {
    console.error('Error booking parking slot:', error);
    throw error;
  }
};

// Create a new parking slot
export const createParkingSlot = async (slot: Partial<ParkingSlot>): Promise<ParkingSlot> => {
  try {
    const response = await axios.post<ParkingSlot>(API_URL, slot);
    return response.data;
  } catch (error) {
    console.error('Error creating parking slot:', error);
    throw error;
  }
};

// Update an existing parking slot
export const updateParkingSlot = async (slotId: number, updates: Partial<ParkingSlot>): Promise<ParkingSlot> => {
  try {
    const response = await axios.put<ParkingSlot>(`${API_URL}${slotId}/`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating parking slot:', error);
    throw error;
  }
};

// Delete a parking slot
export const deleteParkingSlot = async (slotId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}${slotId}/`);
  } catch (error) {
    console.error('Error deleting parking slot:', error);
    throw error;
  }
};

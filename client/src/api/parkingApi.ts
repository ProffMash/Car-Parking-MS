import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/parking-slots/';

export interface ParkingSlot {
  id: number;
  spot_name: string;
  level: string;
  slot_type: 'standard' | 'premium' | 'vip';
  rate_per_hour: string;
  is_available: boolean;
}

export const getParkingSlots = async (): Promise<ParkingSlot[]> => {
  try {
    const response = await axios.get<ParkingSlot[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching parking slots:', error);
    throw error;
  }
};

export const bookParkingSlot = async (slotId: number): Promise<void> => {
  try {
    await axios.post(`${API_URL}${slotId}/book/`);
  } catch (error) {
    console.error('Error booking parking slot:', error);
    throw error;
  }
};

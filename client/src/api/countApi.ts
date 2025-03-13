import axios from "axios";

const API_BASE_URL = "https://carparking-backend.onrender.com/api";

export const fetchCounts = async () => {
  try {
    const [supportRes, usersRes, parkingRes, bookingsRes, totalAmountRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/support/count/`),
      axios.get(`${API_BASE_URL}/users/count/`),
      axios.get(`${API_BASE_URL}/parking-slots/count/`),
      axios.get(`${API_BASE_URL}/bookings/count/`),
      axios.get(`${API_BASE_URL}/bookings/total_amount/`),
    ]);

    return {
      totalContacts: supportRes.data.total_contacts || 0,
      totalUsers: usersRes.data.total_users || 0,
      totalParkingSlots: parkingRes.data.total_parkingslots || 0,
      totalBookings: bookingsRes.data.total_bookings || 0,
      totalAmount: totalAmountRes.data.total_amount || 0, 
    };
  } catch (error) {
    console.error("Error fetching counts:", error);
    return {
      totalContacts: 0,
      totalUsers: 0,
      totalParkingSlots: 0,
      totalBookings: 0,
      totalAmount: 0,
    };
  }
};

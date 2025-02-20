import React, { useEffect, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import { getBookings, deleteBooking } from "../api/bookingApi";

const AdminBookings: React.FC = () => {
  interface Booking {
    id?: number;
    license_plate: string;
    parking_slot: number;
    total_amount: number;
    start_time: string;
  }
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 8;

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      const formattedData = data.map((booking: any) => ({
        ...booking,
        total_amount: Number(booking.total_amount),
      }));
      setBookings(formattedData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBooking(id);
      setBookings(bookings.filter((booking) => booking.id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // Pagination Logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const filteredBookings = bookings.filter((booking) =>
    booking.license_plate.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by License Plate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-600 border-b border-gray-100">
              <th className="px-4 py-2">License Plate</th>
              <th className="px-4 py-2">Parking Slot</th>
              <th className="px-4 py-2">Total Amount</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking) => (
              <tr key={booking.id} className="border-b border-gray-100">
                <td className="px-4 py-2">{booking.license_plate}</td>
                <td className="px-4 py-2">{booking.parking_slot}</td>
                <td className="px-4 py-2">{booking.total_amount}</td>
                <td className="px-4 py-2">{booking.start_time}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => booking.id !== undefined && handleDelete(booking.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminBookings;

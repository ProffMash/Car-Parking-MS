import React, { useEffect, useState } from "react";
import { getParkingSlots, createParkingSlot, updateParkingSlot, deleteParkingSlot, ParkingSlot } from "../api/parkingApi";
import { Loader, CheckCircle, XCircle, Plus, Trash, Edit, Download } from "lucide-react"; 

const AdminParking: React.FC = () => {
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newSlot, setNewSlot] = useState<Partial<ParkingSlot>>({
    spot_name: "",
    level: "",
    slot_type: "standard",
    rate_per_hour: "",
    is_available: true,
  });

  // Modal & editing state
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editSlotId, setEditSlotId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false); 

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const slotsPerPage = 4;

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const data = await getParkingSlots();
      setParkingSlots(data);
    } catch (err) {
      setError("Failed to fetch parking slots.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSlot = async () => {
    try {
      if (isEditing && editSlotId) {
        const updatedSlot = await updateParkingSlot(editSlotId, newSlot);
        setParkingSlots(parkingSlots.map(slot => (slot.id === editSlotId ? updatedSlot : slot)));
      } else {
        const createdSlot = await createParkingSlot(newSlot);
        setParkingSlots([...parkingSlots, createdSlot]);
      }
      setNewSlot({ spot_name: "", level: "", slot_type: "standard", rate_per_hour: "", is_available: true });
      setIsEditing(false);
      setEditSlotId(null);
      setIsCreating(false); // Close the create modal after saving
    } catch (error) {
      console.error("Error saving slot:", error);
    }
  };

  const handleEditSlot = (slot: ParkingSlot) => {
    setNewSlot(slot);
    setEditSlotId(slot.id);
    setIsEditing(true);
  };

  const handleDeleteSlot = async (slotId: number) => {
    try {
      await deleteParkingSlot(slotId);
      setParkingSlots(parkingSlots.filter(slot => slot.id !== slotId));
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  // Function to convert parking slots to CSV
  const convertToCSV = (data: ParkingSlot[]) => {
    const headers = ["Spot Name", "Level", "Type", "Rate/hr", "Status"];
    const rows = data.map((slot) => [
      slot.spot_name,
      slot.level,
      slot.slot_type.toUpperCase(),
      `$${slot.rate_per_hour}`,
      slot.is_available ? "Available" : "Occupied",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((row) => row.join(",")).join("\n");

    return encodeURI(csvContent);
  };

  // Function to trigger CSV download
  const handleDownload = () => {
    const csvData = convertToCSV(parkingSlots);
    const link = document.createElement("a");
    link.setAttribute("href", csvData);
    link.setAttribute("download", "parking_slots_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination Logic
  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;
  const currentSlots = parkingSlots.slice(indexOfFirstSlot, indexOfLastSlot);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Parking Slot Management</h2>

      {/* Buttons for Create and Download */}
      <div className="mb-4 flex gap-4">
        <button onClick={() => setIsCreating(true)} className="bg-green-600 text-white py-2 px-4 rounded flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Create Parking Slot</span>
        </button>
        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Download className="h-5 w-5" />
          <span>Download Report</span>
        </button>
      </div>

      {/* Parking Slots Table */}
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white p-5 shadow-md rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-2 text-left">Spot Name</th>
                  <th className="p-2 text-left">Level</th>
                  <th className="p-2 text-left">Type</th>
                  <th className="p-2 text-left">Rate/hr</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSlots.map((slot) => (
                  <tr key={slot.id} className="border-b">
                    <td className="p-2">{slot.spot_name}</td>
                    <td className="p-2">{slot.level}</td>
                    <td className="p-2">{slot.slot_type.toUpperCase()}</td>
                    <td className="p-2">${slot.rate_per_hour}</td>
                    <td className="p-2 flex items-center">
                      {slot.is_available ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
                      <span className="ml-2">{slot.is_available ? "Available" : "Occupied"}</span>
                    </td>
                    <td className="p-2 flex justify-center space-x-3">
                      <button onClick={() => handleEditSlot(slot)} className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDeleteSlot(slot.id)} className="text-red-600 hover:text-red-800">
                        <Trash className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center space-x-2 items-center">
        {/* Page Numbers */}
        {Array.from({ length: Math.ceil(parkingSlots.length / slotsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modals for Editing and Creating Slots */}
      {(isEditing || isCreating) && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">{isEditing ? "Edit Parking Slot" : "Create Parking Slot"}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Spot Name"
                  className="border p-2 rounded"
                  value={newSlot.spot_name}
                  onChange={(e) => setNewSlot({ ...newSlot, spot_name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Level"
                  className="border p-2 rounded"
                  value={newSlot.level}
                  onChange={(e) => setNewSlot({ ...newSlot, level: e.target.value })}
                />
                <select
                  className="border p-2 rounded"
                  value={newSlot.slot_type}
                  onChange={(e) => setNewSlot({ ...newSlot, slot_type: e.target.value as "standard" | "premium" | "vip" })}
                >
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                  <option value="vip">VIP</option>
                </select>
                <input
                  type="text"
                  placeholder="Rate per hour"
                  className="border p-2 rounded"
                  value={newSlot.rate_per_hour}
                  onChange={(e) => setNewSlot({ ...newSlot, rate_per_hour: e.target.value })}
                />
                <div className="flex items-center">
                  <label className="mr-2">Availability</label>
                  <input
                    type="checkbox"
                    checked={newSlot.is_available}
                    onChange={(e) => setNewSlot({ ...newSlot, is_available: e.target.checked })}
                    className="toggle toggle-primary"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <button onClick={handleSaveSlot} className="bg-blue-600 text-white py-2 px-4 rounded">
                    {isEditing ? "Save Changes" : "Create Slot"}
                  </button>
                  <button onClick={() => { setIsEditing(false); setIsCreating(false); }} className="bg-gray-400 text-white py-2 px-4 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminParking;
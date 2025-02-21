import React, { useEffect, useState } from "react";
import { Search, Edit, Trash2, Plus, X } from "lucide-react";
import { fetchUsers, deleteUser, updateUser } from "../api/userApi";
import { register } from "../api/authApi";

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<{ id: string; full_name: string; email: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ id: string; full_name: string; email: string } | null>(null);
  const [newUser, setNewUser] = useState({ full_name: "", email: "", password: "" });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Handle opening the edit modal
  const handleEditClick = (user: { id: string; full_name: string; email: string }) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedUser) {
      setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
    }
  };

  const handleEditSubmit = async () => {
    if (selectedUser) {
      try {
        await updateUser(selectedUser.id, selectedUser);
        setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)));
        setIsEditModalOpen(false);
        setSelectedUser(null);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  // Handle opening the create user modal
  const handleCreateUserClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCreateUserSubmit = async () => {
    try {
      await register(newUser.full_name, newUser.email, newUser.password);

      // Fetch the latest users to update the table
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);

      setIsCreateModalOpen(false);
      setNewUser({ full_name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Pagination calculations
  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleCreateUserClick}
        >
          <Plus className="h-5 w-5" />
          <span>Add User</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-600 border-b border-gray-100">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Full Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-100">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.full_name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-600 hover:text-blue-600" onClick={() => handleEditClick(user)}>
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-gray-600 hover:text-red-600" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 my-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Create User Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Create User</h2>
              <button onClick={() => setIsCreateModalOpen(false)}>
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <input type="text" name="full_name" placeholder="Full Name" onChange={handleCreateUserChange} className="w-full mt-3 p-2 border rounded" />
            <input type="email" name="email" placeholder="Email" onChange={handleCreateUserChange} className="w-full mt-3 p-2 border rounded" />
            <input type="password" name="password" placeholder="Password" onChange={handleCreateUserChange} className="w-full mt-3 p-2 border rounded" />
            <button className="w-full mt-4 bg-blue-600 text-white p-2 rounded-lg" onClick={handleCreateUserSubmit}>
              Create
            </button>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Edit User</h2>
              <button onClick={() => setIsEditModalOpen(false)}>
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <input type="text" name="full_name" value={selectedUser.full_name} onChange={handleEditChange} className="w-full mt-3 p-2 border rounded" />
            <input type="email" name="email" value={selectedUser.email} onChange={handleEditChange} className="w-full mt-3 p-2 border rounded" />
            <button className="w-full mt-4 bg-blue-600 text-white p-2 rounded-lg" onClick={handleEditSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
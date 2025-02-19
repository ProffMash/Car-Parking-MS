import React, { useEffect, useState } from 'react';
import { Search, CheckCircle2, XCircle } from 'lucide-react';
import { getSupportMessages, SupportMessage, deleteSupportMessage } from '../api/supportApi';  // Importing the API functions

const AdminSupport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<SupportMessage[]>([]); // State to hold support messages
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(6); // Number of items per page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  // Fetch support messages on component mount or page change
  useEffect(() => {
    const fetchSupportMessages = async () => {
      try {
        const data = await getSupportMessages(); // Fetch all messages
        const filteredData = data.filter(message =>
          message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.message.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setMessages(filteredData);
        setTotalPages(Math.ceil(filteredData.length / itemsPerPage)); // Calculate total pages
      } catch (error) {
        console.error('Error fetching support messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupportMessages();
  }, [searchQuery, currentPage]); // Re-fetch when search query or page changes

  // Handle delete action
  const handleDelete = async (id: number) => {
    try {
      await deleteSupportMessage(id);
      setMessages(messages.filter(message => message.id !== id)); // Remove the deleted message from the list
    } catch (error) {
      console.error('Error deleting support message:', error);
    }
  };

  // Get messages for the current page
  const paginatedMessages = messages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-600 border-b border-gray-100">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : paginatedMessages.length > 0 ? (
              paginatedMessages.map(message => (
                <tr key={message.id} className="border-b border-gray-100">
                  <td className="px-6 py-4">#{message.id}</td>
                  <td className="px-6 py-4">{message.name}</td>
                  <td className="px-6 py-4">{message.email}</td>
                  <td className="px-6 py-4">{message.message}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-600 hover:text-green-600" onClick={() => message.id !== undefined && handleDelete(message.id)}>
                        <CheckCircle2 className="h-5 w-5" />
                      </button>
                      <button className="text-gray-600 hover:text-red-600" onClick={() => message.id !== undefined && handleDelete(message.id)}>
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No support messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between p-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-gray-600 hover:text-blue-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-gray-600 hover:text-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminSupport;

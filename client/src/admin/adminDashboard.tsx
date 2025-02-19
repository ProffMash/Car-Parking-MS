import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ParkingCircle, CreditCard, TicketCheck, LogOut, Menu, X } from 'lucide-react';
import AdminOverview from './overview';
import AdminUsers from './users';
import AdminParking from './parkingSlots';
import AdminTransactions from './transactions';
import AdminSupport from './support';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('overview');

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem('isLoggedIn');
    navigate('/', { replace: true });
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: ParkingCircle },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'parking', label: 'Parking Slots', icon: ParkingCircle },
    { id: 'transactions', label: 'Payments', icon: CreditCard },
    { id: 'support', label: 'Support Tickets', icon: TicketCheck },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ParkingCircle className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold">Admin Panel</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:relative lg:flex lg:w-64 lg:flex-col lg:h-screen lg:shadow-none
        `}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center space-x-3 mb-8 lg:hidden">
            <ParkingCircle className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">Admin Panel</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 flex-1 overflow-y-auto">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false); // Close sidebar on mobile after selecting an item
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                    ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'opacity-30' : 'opacity-100'}`}>
        <div className="p-6">
          {/* Content Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {sidebarItems.find(item => item.id === activeTab)?.label}
            </h1>
          </div>

          {/* Dynamic Content */}
          {activeTab === 'overview' && <AdminOverview />}
          {activeTab === 'users' && <AdminUsers />}
          {activeTab === 'parking' && <AdminParking />}
          {activeTab === 'transactions' && <AdminTransactions />}
          {activeTab === 'support' && <AdminSupport />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

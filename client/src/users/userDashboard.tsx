import { useState } from 'react';
import { ParkingCircle, LogOut, HelpCircle, Menu, X } from 'lucide-react';
import ParkingSlot from '../components/services/parkingSlot';
import Booking from '../components/services/Booking';
import Support from '../components/services/support';

interface ParkingSpot {
  id: number;
  location: string;
  status: 'Available' | 'Occupied';
  price: string;
  type: 'Standard' | 'Premium' | 'VIP';
  level: string;
}

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBookSpot = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    setShowBookingModal(true);
  };

  const handleLogout = () => {
    onLogout(); // Call the logout function from props
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <ParkingCircle className="h-8 w-8 text-blue-600" />
              <span className="text-xl sm:text-2xl font-bold text-gray-800">ParkEase</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-4">
              <button
                onClick={() => setShowTicketModal(true)}
                className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2"
              >
                <HelpCircle className="h-5 w-5" />
                <span>Support</span>
              </button>
              <button
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Menu */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden bg-white shadow-md py-4">
            <div className="container mx-auto px-4">
              <button
                onClick={() => setShowTicketModal(true)}
                className="block w-full text-left text-gray-600 hover:text-gray-800 transition-colors py-2"
              >
                <HelpCircle className="inline h-5 w-5 mr-2" />
                Support
              </button>
              <button
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors w-full text-left py-2"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Parking Dashboard</h1>

        {/* Parking Slots */}
        <ParkingSlot onBookSpot={handleBookSpot} />
      </div>

      {/* Booking Modal */}
      <Booking
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        selectedSpot={selectedSpot}
      />

      {/* Support Ticket Modal */}
      <Support
        isOpen={showTicketModal}
        onClose={() => setShowTicketModal(false)}
      />
    </div>
  );
};

export default Dashboard;

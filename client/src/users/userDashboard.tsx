import { useState } from 'react';
import { ParkingCircle, LogOut, Car, Clock, HelpCircle, Menu } from 'lucide-react';
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

const Dashboard = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  const handleBookSpot = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    setShowBookingModal(true);
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
            <div className="hidden sm:flex items-center space-x-4">
              <button
                onClick={() => setShowTicketModal(true)}
                className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2"
              >
                <HelpCircle className="h-5 w-5" />
                <span>Support</span>
              </button>
              <a 
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Exit</span>
              </a>
            </div>
            <div className="sm:hidden">
              <button
                onClick={() => setShowTicketModal(true)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Parking Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <Car className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Available Spots</p>
                <p className="text-xl sm:text-2xl font-bold">4</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Operating Hours</p>
                <p className="text-xl sm:text-2xl font-bold">24/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Parking Spots */}
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
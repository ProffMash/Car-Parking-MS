import React, { useState } from 'react';
import { ParkingCircle, LogOut, Car, Clock, Search, HelpCircle, CreditCard, X, Menu } from 'lucide-react';

interface ParkingSpot {
  id: number;
  location: string;
  status: 'Available' | 'Occupied';
  price: string;
  type: 'Standard' | 'Premium' | 'VIP';
  level: string;
}

interface BookingForm {
  startTime: string;
  duration: number;
  mobileNumber: string;
  carPlate: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface Ticket {
  id: number;
  subject: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
}

const Dashboard = () => {
  const [] = useState<'spots' | 'support'>('spots');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Standard' | 'Premium' | 'VIP'>('All');
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    startTime: '',
    duration: 1,
    mobileNumber: '',
    carPlate: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [parkingSpots] = useState<ParkingSpot[]>([
    { id: 1, location: 'Level 1, Spot A1', status: 'Available', price: '$5/hr', type: 'Standard', level: 'Level 1' },
    { id: 2, location: 'Level 2, Spot B3', status: 'Occupied', price: '$5/hr', type: 'Standard', level: 'Level 2' },
    { id: 3, location: 'Level 1, Spot A4', status: 'Available', price: '$8/hr', type: 'Premium', level: 'Level 1' },
    { id: 4, location: 'Level 3, Spot C2', status: 'Available', price: '$12/hr', type: 'VIP', level: 'Level 3' },
    { id: 5, location: 'Level 2, Spot B5', status: 'Available', price: '$8/hr', type: 'Premium', level: 'Level 2' },
    { id: 6, location: 'Level 1, Spot A7', status: 'Occupied', price: '$12/hr', type: 'VIP', level: 'Level 1' },
  ]);

  const [] = useState<Ticket[]>([
    {
      id: 1,
      subject: 'Payment Issue',
      description: 'Unable to process payment for spot A1',
      status: 'In Progress',
      createdAt: '2025-03-20 10:30 AM',
    },
    {
      id: 2,
      subject: 'Spot Access',
      description: 'Gate barrier not opening for spot B3',
      status: 'Open',
      createdAt: '2025-03-20 09:15 AM',
    },
  ]);

  const handleBookSpot = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
    setShowBookingModal(true);
    setBookingStep(1);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    } else {
      // Simulate payment processing
      setTimeout(() => {
        alert('Booking confirmed! A confirmation has been sent to your mobile number.');
        setShowBookingModal(false);
        setBookingStep(1);
        setBookingForm({
          startTime: '',
          duration: 1,
          mobileNumber: '',
          carPlate: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
        });
      }, 1500);
    }
  };

  const filteredSpots = parkingSpots
    .filter(spot =>
      spot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(spot => filterType === 'All' ? true : spot.type === filterType);

  const renderSpotCard = (spot: ParkingSpot) => (
    <div key={spot.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{spot.location}</h3>
          <p className="text-sm text-gray-500">{spot.level}</p>
        </div>
        <span className="text-lg font-semibold text-gray-900">{spot.price}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${spot.type === 'VIP'
            ? 'bg-purple-100 text-purple-800'
            : spot.type === 'Premium'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
          {spot.type}
        </span>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${spot.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          {spot.status}
        </span>
      </div>
      {spot.status === 'Available' && (
        <button
          onClick={() => handleBookSpot(spot)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Book Now
        </button>
      )}
    </div>
  );

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
              <a
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Exit</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
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
              <a
                href="/"
                className="block w-full text-left text-gray-600 hover:text-gray-800 transition-colors py-2"
              >
                <LogOut className="inline h-5 w-5 mr-2" />
                Exit
              </a>
            </div>
          </div>
        )}
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
                <p className="text-xl sm:text-2xl font-bold">
                  {parkingSpots.filter(spot => spot.status === 'Available').length}
                </p>
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
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold">Available Parking Spots</h2>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search spots..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="All">All Types</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="block sm:hidden p-4">
            <div className="grid grid-cols-1 gap-4">
              {filteredSpots.map(renderSpotCard)}
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-600">
                    <th className="pb-4">Location</th>
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Price</th>
                    <th className="pb-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSpots.map((spot) => (
                    <tr key={spot.id} className="border-t border-gray-100">
                      <td className="py-4">{spot.location}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${spot.type === 'VIP'
                            ? 'bg-purple-100 text-purple-800'
                            : spot.type === 'Premium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                          {spot.type}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${spot.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {spot.status}
                        </span>
                      </td>
                      <td className="py-4">{spot.price}</td>
                      <td className="py-4">
                        {spot.status === 'Available' && (
                          <button
                            onClick={() => handleBookSpot(spot)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Book Now
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedSpot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Book Parking Spot</h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center mb-8">
              <div className={`h-2 flex-1 rounded-full ${bookingStep >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className={`h-2 flex-1 rounded-full mx-2 ${bookingStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
              <div className={`h-2 flex-1 rounded-full ${bookingStep === 3 ? 'bg-blue-600' : 'bg-gray-200'}`} />
            </div>

            <p className="text-gray-600 mb-6">
              {selectedSpot.location} - {selectedSpot.type} - {selectedSpot.price}
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {bookingStep === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      value={bookingForm.startTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, startTime: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (hours)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="24"
                      value={bookingForm.duration}
                      onChange={(e) => setBookingForm({ ...bookingForm, duration: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      required
                    />
                  </div>
                </>
              )}

              {bookingStep === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={bookingForm.mobileNumber}
                      onChange={(e) => setBookingForm({ ...bookingForm, mobileNumber: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Car License Plate
                    </label>
                    <input
                      type="text"
                      value={bookingForm.carPlate}
                      onChange={(e) => setBookingForm({ ...bookingForm, carPlate: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="ABC123"
                      required
                    />
                  </div>
                </>
              )}

              {bookingStep === 3 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        value={bookingForm.cardNumber}
                        onChange={(e) => setBookingForm({ ...bookingForm, cardNumber: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="4242 4242 4242 4242"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={bookingForm.expiryDate}
                        onChange={(e) => setBookingForm({ ...bookingForm, expiryDate: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={bookingForm.cvv}
                        onChange={(e) => setBookingForm({ ...bookingForm, cvv: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Payment Summary</h4>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Duration</span>
                      <span>{bookingForm.duration} hours</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Rate</span>
                      <span>{selectedSpot.price}</span>
                    </div>
                    <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                      <span>Total</span>
                      <span>${parseInt(selectedSpot.price.replace('$', '').replace('/hr', '')) * bookingForm.duration}</span>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center justify-end space-x-4 mt-6">
                {bookingStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setBookingStep(bookingStep - 1)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {bookingStep === 3 ? 'Confirm Payment' : 'Continue'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Support Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Submit Support Ticket</h3>
              <button
                onClick={() => setShowTicketModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Brief description of the issue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Please provide detailed information about your issue"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="+1 (555) 000-0000"
                  required
                />
              </div>
              <div className="flex items-center justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowTicketModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import { ParkingCircle, LogOut, Car, Clock, Calendar, CreditCard } from 'lucide-react';

const userDashboard = () => {
  const parkingSpots = [
    { id: 1, location: 'Level 1, Spot A1', status: 'Available', price: '$5/hr' },
    { id: 2, location: 'Level 2, Spot B3', status: 'Occupied', price: '$5/hr' },
    { id: 3, location: 'Level 1, Spot A4', status: 'Available', price: '$5/hr' },
    { id: 4, location: 'Level 3, Spot C2', status: 'Available', price: '$5/hr' },
  ];

  const recentBookings = [
    { id: 1, date: '2025-03-15', spot: 'Level 1, A2', duration: '2 hours', amount: '$10' },
    { id: 2, date: '2025-03-14', spot: 'Level 2, B1', duration: '3 hours', amount: '$15' },
    { id: 3, date: '2025-03-13', spot: 'Level 1, A5', duration: '1 hour', amount: '$5' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ParkingCircle className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-800">ParkEase</span>
            </div>
            <a 
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <Car className="h-10 w-10 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Available Spots</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <Clock className="h-10 w-10 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active Hours</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <Calendar className="h-10 w-10 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold">128</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-10 w-10 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">$1,280</p>
              </div>
            </div>
          </div>
        </div>

        {/* Available Spots */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold">Available Parking Spots</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-600">
                    <th className="pb-4">Location</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Price</th>
                    <th className="pb-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {parkingSpots.map((spot) => (
                    <tr key={spot.id} className="border-t border-gray-100">
                      <td className="py-4">{spot.location}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          spot.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {spot.status}
                        </span>
                      </td>
                      <td className="py-4">{spot.price}</td>
                      <td className="py-4">
                        {spot.status === 'Available' && (
                          <button className="text-blue-600 hover:text-blue-800 font-medium">
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

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold">Recent Bookings</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-600">
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Spot</th>
                    <th className="pb-4">Duration</th>
                    <th className="pb-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-t border-gray-100">
                      <td className="py-4">{booking.date}</td>
                      <td className="py-4">{booking.spot}</td>
                      <td className="py-4">{booking.duration}</td>
                      <td className="py-4">{booking.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default userDashboard;
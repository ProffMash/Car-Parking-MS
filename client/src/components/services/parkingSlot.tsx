import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { getParkingSlots, ParkingSlot as API_ParkingSlot } from '../../api/parkingApi';

interface ParkingSpot {
  id: number;
  location: string;
  status: 'Available' | 'Occupied';
  price: string;
  type: 'Standard' | 'Premium' | 'VIP';
  level: string;
}

interface ParkingSlotProps {
  onBookSpot: (spot: ParkingSpot) => void;
}

const ParkingSlot: React.FC<ParkingSlotProps> = ({ onBookSpot }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Standard' | 'Premium' | 'Vip'>('All');
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading] = useState<number | null>(null);

  useEffect(() => {
    fetchParkingSlots();
  }, []);

  const fetchParkingSlots = async () => {
    setLoading(true);
    try {
      const slots = await getParkingSlots();
      const mappedSlots: ParkingSpot[] = slots.map((slot: API_ParkingSlot) => ({
        id: slot.id,
        location: `Level ${slot.level}, Spot ${slot.spot_name}`,
        status: slot.is_available ? 'Available' : 'Occupied',
        price: `$${slot.rate_per_hour}/hr`,
        type: slot.slot_type.toUpperCase() as 'Standard' | 'Premium' | 'VIP',
        level: `Level ${slot.level}`,
      }));
      setParkingSpots(mappedSlots);
    } catch (error) {
      console.error('Failed to fetch parking slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSpots = parkingSpots
    .filter(spot =>
      spot.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(spot => filterType === 'All' || spot.type.toLowerCase() === filterType.toLowerCase());

  if (loading) {
    return <p className="text-center text-gray-500">Loading parking slots...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <h2 className="text-lg sm:text-xl font-semibold">Available Parking Spots</h2>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
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

      <div className="p-6">
        {filteredSpots.length === 0 ? (
          <p className="text-center text-gray-500">No available parking spots.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSpots.map((spot) => (
              <div key={spot.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900">{spot.location}</h3>
                    <p className="text-sm text-gray-500">{spot.level}</p>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{spot.price}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    spot.type === 'VIP' 
                      ? 'bg-purple-100 text-purple-800'
                      : spot.type === 'Premium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                  }`}>
                    {spot.type}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    spot.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {spot.status}
                  </span>
                </div>
                {spot.status === 'Available' && (
                  <button
                    onClick={() => onBookSpot(spot)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    {bookingLoading === spot.id ? 'Booking...' : 'Book Now'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParkingSlot;
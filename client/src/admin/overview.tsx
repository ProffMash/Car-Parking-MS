// overview.tsx
import React from 'react';
import { Users, ParkingCircle, CreditCard, TicketCheck } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.FC<{ className?: string }>;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="bg-blue-50 p-3 rounded-lg">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
    </div>
  </div>
);

const AdminOverview: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard title="Total Users" value="1,234" icon={Users} />
    <StatCard title="Active Bookings" value="56" icon={ParkingCircle} />
    <StatCard title="Today's Revenue" value="$1,890" icon={CreditCard} />
    <StatCard title="Open Tickets" value="23" icon={TicketCheck} />
  </div>
);

export default AdminOverview;

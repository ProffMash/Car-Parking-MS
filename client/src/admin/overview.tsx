import React, { useEffect, useState } from "react";
import { Users, ParkingCircle, CreditCard, TicketCheck, DollarSign } from "lucide-react";
import { fetchCounts } from "../api/countApi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

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

const AdminOverview: React.FC = () => {
  const [counts, setCounts] = useState({
    totalContacts: 0,
    totalUsers: 0,
    totalParkingSlots: 0,
    totalBookings: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    const getCounts = async () => {
      const data = await fetchCounts();
      setCounts(data);
    };

    getCounts();
  }, []);

  // data for visualization
  const chartData = [
    { name: "Users", value: counts.totalUsers },
    { name: "Bookings", value: counts.totalBookings },
    { name: "Parking Slots", value: counts.totalParkingSlots },
    { name: "Support Tickets", value: counts.totalContacts },
  ];

  return (
    <div className="p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard title="Total Users" value={counts.totalUsers.toString()} icon={Users} />
        <StatCard title="Active Bookings" value={counts.totalBookings.toString()} icon={ParkingCircle} />
        <StatCard title="Total Parking Slots" value={counts.totalParkingSlots.toString()} icon={CreditCard} />
        <StatCard title="Open Tickets" value={counts.totalContacts.toString()} icon={TicketCheck} />
        <StatCard title="Total Revenue" value={`$${counts.totalAmount.toFixed(2)}`} icon={DollarSign} /> 
      </div>

      {/* Data Visualization Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Data Trend (Line Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Data Comparison (Bar Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#10B981" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;

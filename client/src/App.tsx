import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Transactions from "./pages/admin/Transactions";
import ParkingSlots from "./pages/admin/ParkingSlots";
import Reports from "./pages/admin/Reports";
import Pricing from "./pages/admin/Pricing";
import Settings from "./pages/admin/Settings";
import Notifications from "./pages/admin/Notifications";
import Support from "./pages/admin/Support";

// User Pages
import UserDashboard from "./pages/user/Dashboard";
import BookSlot from "./pages/user/BookSlot";
import UserTransactions from "./pages/user/Transactions";
import Profile from "./pages/user/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Sidebar />
          <div className="flex-1 p-6">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/transactions" element={<Transactions />} />
                <Route path="/admin/parking" element={<ParkingSlots />} />
                <Route path="/admin/reports" element={<Reports />} />
                <Route path="/admin/pricing" element={<Pricing />} />
                <Route path="/admin/settings" element={<Settings />} />
                <Route path="/admin/notifications" element={<Notifications />} />
                <Route path="/admin/support" element={<Support />} />
              </Route>

              {/* User Routes */}
              <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
                <Route path="/user" element={<UserDashboard />} />
                <Route path="/user/book-slot" element={<BookSlot />} />
                <Route path="/user/transactions" element={<UserTransactions />} />
                <Route path="/user/profile" element={<Profile />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

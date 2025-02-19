import React, { useState } from "react";
import { X } from "lucide-react";
import { login, register } from "../api/authApi";
import { motion, AnimatePresence } from "framer-motion";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (isAdmin: boolean) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const formVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || (!isLogin && !isAdminLogin && !name)) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      if (isLogin || isAdminLogin) {
        await login(email, password);
        const isAdmin = email.toLowerCase().includes("admin");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
        onLogin(isAdmin);
      } else {
        await register(name, email, password);
        setIsLogin(true);
      }

      onClose();
      setEmail("");
      setPassword("");
      setName("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          {isAdminLogin ? "Admin Login" : isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <div className="flex gap-2 mb-6">
          <button
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              isLogin && !isAdminLogin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => {
              setIsLogin(true);
              setIsAdminLogin(false);
            }}
          >
            User Login
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              !isLogin && !isAdminLogin ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => {
              setIsLogin(false);
              setIsAdminLogin(false);
            }}
          >
            Register
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              isAdminLogin ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => {
              setIsAdminLogin(true);
              setIsLogin(true);
            }}
          >
            Admin Login
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.form key={`${isLogin}-${isAdminLogin}`} onSubmit={handleSubmit} className="space-y-4" variants={formVariants} initial="hidden" animate="visible" exit="exit">
            {!isLogin && !isAdminLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  required={!isLogin}
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {isAdminLogin ? "Admin Sign In" : isLogin ? "Sign In" : "Create Account"}
            </motion.button>
          </motion.form>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthModal;

import { useState } from "react";
import { FaUsers, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }: { onLogin: Function }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [familySize, setFamilySize] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint = isSignup ? "http://localhost:5000/register" : "http://localhost:5000/login";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        if (isSignup) {
          alert("Registration successful! Please log in.");
          setIsSignup(false);
        } else {
          localStorage.setItem("user_id", data.user_id);
          localStorage.setItem("username", username);
          localStorage.setItem("familySize", familySize);
          const savedList = localStorage.getItem(`groceryList_${username}`);
          const parsedList = savedList ? JSON.parse(savedList) : [];
          onLogin({ username, password, familySize, savedList: parsedList });
          navigate("/grocery-list");
        }
      } else {
        alert(data.error || (isSignup ? "Signup failed" : "Login failed"));
      }
    } catch (error) {
      console.error(isSignup ? "Signup error:" : "Login error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-100 to-yellow-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <FaShoppingCart className="text-orange-500 text-3xl" />
          <h1 className="text-3xl font-bold text-orange-600">Meal Cart Planner Pro</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-1">
              <FaUsers /> Family Members
            </label>
            <input
              type="number"
              placeholder="Number of family members"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={familySize}
              onChange={(e) => setFamilySize(e.target.value)}
              required
              min="1"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            {isSignup ? "Sign Up" : "Sign In & Start Planning"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-orange-600 hover:underline focus:outline-none"
            onClick={() => setIsSignup((prev) => !prev)}
          >
            {isSignup ? "Already have an account? Log in" : "Don't have an account? Sign up"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

import { useState } from "react";
import { FaUsers, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/ui/animated-background";
import EnhancedIconButton from "@/components/ui/enhanced-icon-button";
import { LogIn, UserPlus, Sparkles } from "lucide-react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [familySize, setFamilySize] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <AnimatedBackground variant="signin">
      <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl p-10 w-full max-w-md border-0"
      >
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <div className="p-3 bg-orange-100 rounded-full">
            <FaShoppingCart className="text-orange-500 text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-orange-600 text-center">Meal Cart Planner Pro</h1>
          <p className="text-gray-600 flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Smart grocery planning made easy
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
              <FaUsers /> Family Members
            </label>
            <input
              type="number"
              placeholder="Number of family members"
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              value={familySize}
              onChange={(e) => setFamilySize(e.target.value)}
              required
              min="1"
            />
          </div>
          <EnhancedIconButton
            type="submit"
            variant="warning"
            size="lg"
            className="w-full mt-6"
            icon={isSignup ? UserPlus : LogIn}
            glowEffect
          >
            {isSignup ? "Sign Up" : "Sign In & Start Planning"}
          </EnhancedIconButton>
        </form>
        <div className="mt-6 text-center">
          <button
            className="text-orange-600 hover:underline focus:outline-none font-medium transition-colors hover:text-orange-700"
            onClick={() => setIsSignup((prev) => !prev)}
          >
            {isSignup ? "Already have an account? Log in" : "Don't have an account? Sign up"}
          </button>
        </div>
      </motion.div>
      </div>
    </AnimatedBackground>
  );
}
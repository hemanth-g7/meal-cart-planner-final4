// src/pages/Welcome.tsx
import { useNavigate } from "react-router-dom";
import { FaFolderOpen } from "react-icons/fa";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface WelcomeProps {
  user: string;
}

const Welcome = ({ user }: WelcomeProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changing, setChanging] = useState(false);

  const handleViewSavedLists = () => {
    // ✅ Just navigate to the route — everything else is handled by App.tsx
    navigate("/saved-lists");
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("familySize");
    navigate("/login");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setChanging(true);
    const user_id = localStorage.getItem("user_id");
    try {
      const res = await fetch("http://localhost:5000/change_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, old_password: oldPassword, new_password: newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: "Password changed", description: "Your password was updated successfully." });
        setOldPassword("");
        setNewPassword("");
      } else {
        toast({ title: "Change failed", description: data.error || "Failed to change password.", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Change error", description: "Error changing password.", variant: "destructive" });
    } finally {
      setChanging(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, {user}!
        </h1>
        <p className="text-gray-600 mb-6">
          What would you like to do?
        </p>

        <button
          onClick={handleViewSavedLists}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg transition"
        >
          <FaFolderOpen />
          View Saved Lists
        </button>
        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg shadow-lg transition"
        >
          Log Out
        </button>
        <form onSubmit={handleChangePassword} className="mt-8 bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold mb-4 text-gray-700">Change Password</h3>
          <div className="mb-3">
            <label className="block text-sm font-semibold mb-1">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-semibold mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            disabled={changing}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded mt-2"
          >
            {changing ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Welcome;

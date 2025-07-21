import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [familySize, setFamilySize] = useState(localStorage.getItem("familySize") || "");
  const [saving, setSaving] = useState(false);
  const [showPrevious, setShowPrevious] = useState(false);
  const [lists, setLists] = useState<{ id: number; list: { name: string; quantity: number }[] }[]>([]);
  const [loadingLists, setLoadingLists] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const user_id = localStorage.getItem("user_id");
    try {
      const res = await fetch("http://localhost:5000/update_profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, username, family_size: familySize })
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: "Profile updated", description: "Your profile was updated successfully." });
        localStorage.setItem("username", username);
        localStorage.setItem("familySize", familySize);
      } else {
        toast({ title: "Update failed", description: data.error || "Failed to update profile.", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Update error", description: "Error updating profile.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleShowPrevious = async () => {
    setShowPrevious(true);
    setLoadingLists(true);
    const user_id = localStorage.getItem("user_id");
    try {
      const res = await fetch(`http://localhost:5000/get_grocery_lists?user_id=${user_id}`);
      const data = await res.json();
      setLists(Array.isArray(data) ? data : []);
    } catch (err) {
      toast({ title: "Error", description: "Failed to fetch previous lists.", variant: "destructive" });
    } finally {
      setLoadingLists(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Family Size</label>
            <input
              type="number"
              value={familySize}
              onChange={e => setFamilySize(e.target.value)}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              min="1"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-lg transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
        <button
          onClick={() => navigate("/welcome")}
          className="w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg shadow-lg transition"
        >
          Back to Welcome
        </button>
        <button
          onClick={handleShowPrevious}
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-lg transition"
        >
          Previous Generated
        </button>
        {showPrevious && (
          <div className="mt-8 w-full">
            <h3 className="text-lg font-bold mb-4 text-gray-700">Previous Grocery Lists</h3>
            {loadingLists ? (
              <div className="flex justify-center items-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-green-500"></div>
              </div>
            ) : lists.length === 0 ? (
              <p className="text-center text-gray-500">No previous lists found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border">List ID</th>
                      <th className="px-4 py-2 border">Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lists.map((list) => (
                      <tr key={list.id}>
                        <td className="px-4 py-2 border text-center">{list.id}</td>
                        <td className="px-4 py-2 border">
                          <ul className="list-disc list-inside">
                            {list.list && list.list.length > 0 ? (
                              list.list.map((item, idx) => (
                                <li key={idx}>{item.name} <span className="text-gray-500">×{item.quantity}</span></li>
                              ))
                            ) : (
                              <li className="text-gray-400">No items</li>
                            )}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 
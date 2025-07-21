import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type GroceryItem = {
  name: string;
  quantity: string;
};

export default function GroceryList({ username }: { username: string }) {
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem(`grocery-${username}`);
    if (saved) {
      setGroceryList(JSON.parse(saved));
    }
  }, [username]);

  const saveToDatabase = async () => {
    setSaving(true);
    setStatus("");
    try {
      const user_id = localStorage.getItem("user_id");
      const response = await fetch("http://127.0.0.1:5000/save-grocery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          grocery_list: groceryList,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("✅ Grocery list saved successfully!");
        // Save ingredients for the user
        const ingredients = groceryList.map(item => item.name);
        await fetch("http://localhost:5000/save_ingredients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, ingredients })
        });
      } else {
        setStatus("❌ Failed to save: " + data.message);
      }
    } catch (err) {
      setStatus("❌ Error saving to backend.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-3xl font-bold text-center mb-4">
        🛒 {username}'s Grocery List
      </h1>

      {groceryList.length === 0 ? (
        <p className="text-center text-gray-500">No items saved yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {groceryList.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 border rounded shadow-sm flex justify-between"
            >
              <span>{item.name}</span>
              <span className="text-green-600 font-semibold">×{item.quantity}</span>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Save Button */}
      <div className="mt-6 text-center space-y-4">
        <button
          onClick={saveToDatabase}
          disabled={saving || groceryList.length === 0}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:bg-gray-400"
        >
          {saving ? "Saving..." : "Save Grocery List"}
        </button>
        {status && <p className="text-center text-sm text-gray-700">{status}</p>}
        <button
          onClick={() => navigate("/saved-lists")}
          className="bg-green-600 text-white px-6 py-2 rounded ml-4"
        >
          View Saved Lists
        </button>
        <button
          onClick={() => navigate("/welcome")}
          className="bg-orange-500 text-white px-6 py-2 rounded ml-4"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface GroceryItem {
  name: string;
  quantity: string;
}

interface GroceryList {
  id: number;
  created_at: string;
  items: GroceryItem[];
}

export default function ShoppingList() {
  const [lists, setLists] = useState<GroceryList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/get_grocery_lists?user_id=${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch grocery lists");
        }
        return res.json();
      })
      .then((data) => {
        setLists(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Saved Grocery Lists</h1>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && lists.length === 0 && (
          <p className="text-center text-gray-600">No saved lists found.</p>
        )}

        {lists.map((list) => (
          <div key={list.id} className="bg-white rounded-xl shadow-md p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">List ID: {list.id}</h2>
            <p className="text-sm text-gray-500 mb-3">Created at: {new Date(list.created_at).toLocaleString()}</p>
            <ul className="list-disc pl-5 space-y-1">
              {list.items.map((item, index) => (
                <li key={index}>
                  {item.name} — <span className="text-gray-600">{item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/welcome")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
          >
            Back to Welcome
          </button>
        </div>
      </div>
    </div>
  );
}

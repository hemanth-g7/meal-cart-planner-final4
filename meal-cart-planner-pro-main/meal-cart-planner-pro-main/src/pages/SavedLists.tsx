import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface GroceryList {
  id: number;
  list: { name: string; quantity: number }[];
}

export default function SavedLists() {
  const { toast } = useToast();
  const [lists, setLists] = useState<GroceryList[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [modalList, setModalList] = useState<GroceryList | null>(null);
  const [editList, setEditList] = useState<GroceryList | null>(null);
  const [editItems, setEditItems] = useState<{ name: string; quantity: number }[]>([]);
  const [savingEdit, setSavingEdit] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async (listId: number) => {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;
    if (!window.confirm("Are you sure you want to delete this list?")) return;
    setDeleting(listId);
    try {
      const response = await fetch("http://localhost:5000/delete_grocery_list", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, list_id: listId })
      });
      const data = await response.json();
      if (response.ok) {
        setLists((prev) => prev.filter((l) => l.id !== listId));
        toast({ title: "List deleted", description: `List #${listId} was deleted successfully.` });
      } else {
        toast({ title: "Delete failed", description: data.error || "Failed to delete list.", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Delete error", description: "Error deleting list.", variant: "destructive" });
    } finally {
      setDeleting(null);
    }
  };

  const handleEdit = (list: GroceryList) => {
    setEditList(list);
    setEditItems(list.list.map(item => ({ ...item })));
  };

  const handleEditItemChange = (idx: number, field: 'name' | 'quantity', value: string) => {
    setEditItems(items => items.map((item, i) => i === idx ? { ...item, [field]: field === 'quantity' ? Number(value) : value } : item));
  };

  const handleAddEditItem = () => {
    setEditItems(items => [...items, { name: '', quantity: 1 }]);
  };

  const handleRemoveEditItem = (idx: number) => {
    setEditItems(items => items.filter((_, i) => i !== idx));
  };

  const handleSaveEdit = async () => {
    if (!editList) return;
    const userId = localStorage.getItem("user_id");
    setSavingEdit(true);
    try {
      const response = await fetch("http://localhost:5000/update_grocery_list", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, list_id: editList.id, grocery_list: editItems })
      });
      const data = await response.json();
      if (response.ok) {
        setLists(prev => prev.map(l => l.id === editList.id ? { ...l, list: editItems } : l));
        setEditList(null);
        toast({ title: "List updated", description: `List #${editList.id} was updated successfully.` });
      } else {
        toast({ title: "Update failed", description: data.error || "Failed to update list.", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Update error", description: "Error updating list.", variant: "destructive" });
    } finally {
      setSavingEdit(false);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setLoading(false);
      return;
    }
    const fetchSavedLists = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get_grocery_lists?user_id=${userId}`);
        const data = await response.json();
        setLists(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch grocery lists:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedLists();
  }, []);

  useEffect(() => {
    console.log("✅ Reached Saved Lists Page");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10 px-2 sm:px-4">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Your Saved Grocery Lists</h2>
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : lists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <svg width="120" height="120" fill="none" viewBox="0 0 120 120">
            <rect width="120" height="120" rx="24" fill="#F3F4F6" />
            <path d="M40 80h40M50 60v20M70 60v20M60 40v40" stroke="#A5B4FC" strokeWidth="4" strokeLinecap="round"/>
            <circle cx="60" cy="40" r="8" fill="#A5B4FC" />
          </svg>
          <p className="text-center text-gray-600 mt-4">No saved lists found.</p>
        </div>
      ) : (
        <div className="max-w-3xl w-full mx-auto grid gap-4">
          {lists.map((list) => (
            <div
              key={list.id}
              className="bg-white rounded-xl shadow-md p-5 transition hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-purple-700 mb-2">List #{list.id}</h3>
              <ul className="list-disc list-inside text-gray-700">
                {list.list && list.list.length > 0 ? (
                  list.list.map((item, idx) => (
                    <li key={idx}>
                      {item.name} <span className="text-gray-500">×{item.quantity}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No items in this list.</li>
                )}
              </ul>
              <button
                onClick={() => handleDelete(list.id)}
                disabled={deleting === list.id}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow disabled:opacity-50 mr-2"
                aria-label={`Delete list #${list.id}`}
              >
                {deleting === list.id ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setModalList(list)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow ml-2"
                aria-label={`View details for list #${list.id}`}
              >
                View Details
              </button>
              <button
                onClick={() => handleEdit(list)}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow ml-2"
                aria-label={`Edit list #${list.id}`}
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for viewing details */}
      {modalList && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" role="dialog" aria-modal="true">
          <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-8 max-w-md w-full relative">
            <button
              onClick={() => setModalList(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">List #{modalList.id} Details</h2>
            <ul className="list-disc list-inside text-gray-700">
              {modalList.list && modalList.list.length > 0 ? (
                modalList.list.map((item, idx) => (
                  <li key={idx} className="mb-1">
                    <span className="font-semibold">{item.name}</span> <span className="text-gray-500">×{item.quantity}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">No items in this list.</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editList && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" role="dialog" aria-modal="true">
          <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-8 max-w-md w-full relative">
            <button
              onClick={() => setEditList(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-yellow-700 mb-4">Edit List #{editList.id}</h2>
            <form onSubmit={e => { e.preventDefault(); handleSaveEdit(); }}>
              {editItems.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    value={item.name}
                    onChange={e => handleEditItemChange(idx, 'name', e.target.value)}
                    className="border rounded px-2 py-1 flex-1"
                    required
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={e => handleEditItemChange(idx, 'quantity', e.target.value)}
                    className="border rounded px-2 py-1 w-20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveEditItem(idx)}
                    className="text-red-500 hover:text-red-700 text-lg font-bold px-2"
                    title="Remove item"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddEditItem}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mb-2"
              >
                + Add Item
              </button>
              <div className="flex justify-end mt-4 gap-2">
                <button
                  type="button"
                  onClick={() => setEditList(null)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  {savingEdit ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/profile")}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition"
        >
          Profile
        </button>
      </div>
    </div>
  );
}
// src/pages/Breakfast.tsx
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Breakfast = () => {
  const location = useLocation();
  const userId = location.state?.userId; // ⬅️ Get user ID from navigation state
  const [groceryList, setGroceryList] = useState([{ name: "", quantity: "" }]);

  const handleChange = (index: number, field: string, value: string) => {
    const updatedList = [...groceryList];
    updatedList[index][field] = value;
    setGroceryList(updatedList);
  };

  const addRow = () => {
    setGroceryList([...groceryList, { name: "", quantity: "" }]);
  };

  const saveList = async () => {
    try {
      await axios.post("http://localhost:5000/save-grocery", {
        user_id: userId,
        grocery_list: groceryList,
      });
      alert("List saved!");
    } catch (error) {
      console.error("Save failed:", error);
      alert("Save failed");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Breakfast Grocery List</h2>
      {groceryList.map((item, index) => (
        <div key={index} className="flex space-x-2 mb-2">
          <Input
            placeholder="Item name"
            value={item.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <Input
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => handleChange(index, "quantity", e.target.value)}
          />
        </div>
      ))}
      <Button onClick={addRow} className="mr-2">+ Add Item</Button>
      <Button onClick={saveList}>Save List</Button>
    </div>
  );
};

export default Breakfast;

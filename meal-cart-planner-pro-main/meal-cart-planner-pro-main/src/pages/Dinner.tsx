import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const dinnerItems = [
  { name: "Curry & Rice", img: "images/curry_rice.jpg" }, // Match your actual filename
  { name: "Roti & Sabzi", img: "images/roti_curry.jpg" }, // Match your actual filename
  { name: "Dal Chawal", img: "images/dalchaval.jpg" }, // Match your actual filename
  { name: "Fried Rice", img: "images/friedrice.jpg" }, // Match your actual filename
  { name: "Soup & Bread", img: "images/soup_bread.webp" }, // Match your actual filename
  { name: "Pasta", img: "images/pasta.jpg" }, // Match your actual filename
];

const Dinner = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-700 text-center mb-4">
          Select Dinner Items
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Choose your favorite dinner options
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {dinnerItems.map((item) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={item.name}
              className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg mb-3"
                onError={(e) => {
                  e.currentTarget.src = "/images/placeholder.svg";
                }}
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-10">
          <button
            onClick={() => navigate("/lunch")}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to Lunch
          </button>
          <button
            onClick={() => navigate("/frequencies")}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Continue to Frequencies
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dinner;
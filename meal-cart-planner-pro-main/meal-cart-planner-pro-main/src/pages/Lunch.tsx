import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const lunchItems = [
  { name: "Rice & Dal", img: "images/rice_dal.jpg" }, // Match your actual filename
  { name: "Chapati & Curry", img: "images/chapathi.jpg" }, // Match your actual filename
  { name: "Biryani", img: "images/biryani.jpg" }, // Match your actual filename
  { name: "Pulao", img: "images/pulav.jpg" }, // Match your actual filename
  { name: "Sambar Rice", img: "images/sambhar.jpg" }, // Match your actual filename
  { name: "Curd Rice", img: "images/curd_rice.jpg" }, // Match your actual filename
];

const Lunch = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 text-center mb-4">
          Select Lunch Items
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Choose your favorite lunch options
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {lunchItems.map((item) => (
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
            onClick={() => navigate("/breakfast")}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back to Breakfast
          </button>
          <button
            onClick={() => navigate("/dinner")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Continue to Dinner
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lunch;
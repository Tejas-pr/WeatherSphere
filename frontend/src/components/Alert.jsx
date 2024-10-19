import React, { useState } from "react";
import { motion } from "framer-motion";

const AlertModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [threshold, setThreshold] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({ email, city, threshold });
    onClose();
  };

  return (
    <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex justify-center items-center">
      <motion.div
        animate={{
          x: 0,
          y: 0,
          scale: 1.2,
          rotate: 0,
        }}
        className="bg-slate-400 p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">Set Weather Alert</h2>
        <input
          type="text"
          placeholder="City 🏙️"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 mb-4 w-full rounded-2xl"
        />
        <input
          type="number"
          placeholder="Threshold Temperature 🌡️"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          className="border p-2 mb-4 w-full rounded-2xl"
        />
        <input
          type="email"
          placeholder="Email 📩"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full rounded-2xl"
        />
        <div className="flex justify-end space-x-6">
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-2xl"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-2xl"
          >
            Set Alert
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AlertModal;

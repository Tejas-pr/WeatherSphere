// AlertModal.jsx
import React, { useState } from "react";

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
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Set Weather Alert</h2>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="number"
          placeholder="Threshold Temperature"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
            Set Alert
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;

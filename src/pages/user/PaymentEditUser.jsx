import React, { useState } from "react";
import { X } from "lucide-react";

export default function EditCardModal({
  isOpen,
  onClose,
  onSave,
  initialCard,
}) {
  const [cardData, setCardData] = useState(
    initialCard || {
      number: "",
      expiry: "",
      holder: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(cardData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {initialCard ? "Edit Card" : "Add New Card"}
          </h2>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Holder Name
              </label>
              <input
                type="text"
                value={cardData.holder}
                onChange={(e) =>
                  setCardData({ ...cardData, holder: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                value={cardData.number}
                onChange={(e) => {
                  const value = e.target.value.replace(/\s/g, "");
                  if (value.length <= 16 && /^\d*$/.test(value)) {
                    const formatted =
                      value.match(/.{1,4}/g)?.join(" ") || value;
                    setCardData({ ...cardData, number: formatted });
                  }
                }}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                value={cardData.expiry}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 4) {
                    const month = value.slice(0, 2);
                    const year = value.slice(2);
                    const formatted =
                      month + (value.length > 2 ? "/" + year : "");
                    setCardData({ ...cardData, expiry: formatted });
                  }
                }}
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

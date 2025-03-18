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
      cvv: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(cardData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden">
        {/* Card Preview */}
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="text-white/90 text-sm mb-4">Credit</div>
          <div className="flex justify-end">
            <span className="text-white font-semibold">VISA</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Card Holder Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={cardData.holder}
                onChange={(e) =>
                  setCardData({ ...cardData, holder: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="Full Name"
                required
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
                <img
                  src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
                  alt="Visa"
                  className="h-4"
                />
                <img
                  src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/mastercard.png"
                  alt="Mastercard"
                  className="h-4"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={cardData.number}
              onChange={(e) => {
                const value = e.target.value.replace(/\s/g, "");
                if (value.length <= 16 && /^\d*$/.test(value)) {
                  const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
                  setCardData({ ...cardData, number: formatted });
                }
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Expire Date
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
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="MM/YY"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">CVV</label>
              <input
                type="text"
                value={cardData.cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 3) {
                    setCardData({ ...cardData, cvv: value });
                  }
                }}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="123"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl hover:opacity-90 transition-opacity"
          >
            Add Card
          </button>
        </form>
      </div>
    </div>
  );
}

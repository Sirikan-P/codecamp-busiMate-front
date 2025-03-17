import React, { useState } from "react";
import { ArrowLeft, Edit2, PlusCircle, CreditCard } from "lucide-react";
import EditCardModal from "./PaymentEditUser";

function PaymentUser() {
  const [cards, setCards] = useState([
    { number: "1234 5678 9012 3456", expiry: "12/24", holder: "Card Holder" },
    { number: "9876 5432 1098 7654", expiry: "09/27", holder: "Card Holder" },
  ]);

  // Mock transaction data
  const mockTransitiion = [
    { id: "123456", amount: "$100" },
    { id: "654321", amount: "$200" },
    { id: "456123", amount: "$300" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const handleAddCard = () => {
    setEditingCard(null); // Reset editing card
    setIsModalOpen(true); // Open modal
  };

  const handleEditCard = (card, index) => {
    setEditingCard({ card, index });
    setIsModalOpen(true);
  };

  const handleSaveCard = (cardData) => {
    // Save card data
    if (editingCard !== null) {
      // Edit existing card
      const newCards = [...cards];
      newCards[editingCard.index] = cardData;
      setCards(newCards);
    } else {
      // Add new card
      setCards((prev) => [...prev, cardData]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <button className="p-2">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            Payment Detail
          </h1>
          <button className="p-2">
            <Edit2 className="w-6 h-6 text-gray-700" />
          </button>
        </header>

        {/* Card Section */}
        <div className="overflow-x-auto snap-x flex gap-4 mb-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[320px] h-[190px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-5 shadow-md snap-center relative group"
              onClick={() => handleEditCard(card, index)}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 rounded-xl transition-opacity cursor-pointer" />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-6 bg-yellow-400 rounded"></div>
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <p className="text-white text-lg tracking-wider font-medium mb-1">
                {card.number}
              </p>
              <div className="flex justify-between text-white/80 text-sm">
                <span>{card.holder}</span>
                <span>{card.expiry}</span>
              </div>
            </div>
          ))}

          {/* Add Card Button */}
          <div
            onClick={handleAddCard}
            className="flex-shrink-0 w-[320px] h-[190px] bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col items-center">
              <PlusCircle className="w-10 h-10 text-gray-400" />
              <p className="text-gray-500 text-sm mt-2">Add New Card</p>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div>
          <h2 className="text-sm font-semibold text-gray-800 mb-3">
            Recent Transactions
          </h2>

          <div className="space-y-3">
            {mockTransitiion.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <div>
                  <p className="text-gray-800 text-sm font-medium">Payment</p>
                  <p className="text-xs text-gray-500">
                    Booking ID: {transaction.id}
                  </p>
                </div>
                <p className="text-gray-800 font-medium text-sm">
                  {transaction.amount}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <EditCardModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCard(null);
        }}
        onSave={handleSaveCard}
        initialCard={editingCard?.card}
      />
    </div>
  );
}

export default PaymentUser;

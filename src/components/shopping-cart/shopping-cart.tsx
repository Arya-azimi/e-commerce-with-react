import { useCartStore } from "../../state";
import { useState } from "react";
import { Link } from "react-router-dom";

function ShoppingCart() {
  const { items, removeItem } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 absolute -top-4 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.942.503 2.576L11 20h2c1.1 0 2-.9 2-2v-1h4v1c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2v-1H7v1c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2z"
          />
        </svg>
        {items.length > 0 && (
          <span className="absolute -top-7 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 w-full bg-black bg-opacity-50 z-50 overflow-y-auto md:bg-transparent md:right-0 md:top-16 md:w-96 md:h-auto md:inset-auto">
          <div className="bg-white h-full md:rounded-lg shadow-xl md:border md:w-full md:ml-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">سبد خرید</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              {items.length === 0 ? (
                <p className="text-gray-500">سبد خرید شما خالی است.</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 ml-2 object-cover rounded-md"
                      />
                      <div className="flex-grow">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity}x {item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        حذف
                      </button>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <p className="text-lg font-bold">
                      مبلغ: {total.toFixed(2)} هزار تومن
                    </p>
                    <Link
                      to="/checkout"
                      className="block w-full text-center mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      تسویه
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { ShoppingCart };

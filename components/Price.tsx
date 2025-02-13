"use client";

import React, { useEffect, useState } from "react";

type Props = {
  price: number;
  id: number;
  options?: { title: string; additionalPrice: number }[];
};

const Price = ({ price, options }: Props) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState<number | null>(options ? 0 : null);

  useEffect(() => {
    if (selected !== null) {
      setTotal(
        quantity * (options ? price + options[selected].additionalPrice : price)
      );
    }
  }, [quantity, selected, options, price]);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    setQuantity((prev) => {
      if (type === "increase" && prev < 9) return prev + 1;
      if (type === "decrease" && prev > 1) return prev - 1;
      return prev;
    });
  };

  return (
    <div className="flex flex-col gap-6 p-4 ring-1 ring-gray-200 rounded-lg shadow-lg">
      {/* PRICE DISPLAY */}
      <h2 className="text-3xl font-bold text-red-500">₹{total.toFixed(2)}</h2>

      {/* OPTIONS CONTAINER */}
      {options && (
        <div className="flex flex-wrap gap-4">
          {options.map((option, index) => (
            <button
              key={option.title}
              className={`min-w-[6rem] p-2 rounded-md font-medium transition-all duration-200 
                ${selected === index ? "bg-red-500 text-white" : "bg-gray-100 text-red-500"}
                hover:bg-red-400 hover:text-white`}
              onClick={() => setSelected(index)}
            >
              {option.title}
            </button>
          ))}
        </div>
      )}

      {/* QUANTITY CONTROLS */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-6 p-3 ring-1 ring-red-500 rounded-md w-full">
          <span className="font-medium">Quantity:</span>
          <div className="flex items-center gap-4">
            <button
              className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              onClick={() => handleQuantityChange("decrease")}
              disabled={quantity === 1}
            >
              {"-"}
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button
              className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              onClick={() => handleQuantityChange("increase")}
              disabled={quantity === 9}
            >
              {"+"}
            </button>
          </div>
        </div>
      </div>

      {/* ADD TO CART BUTTON */}
      <button
        className="w-full p-4 bg-red-500 text-white font-bold uppercase rounded-md 
          transition-all duration-200 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={selected === null}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Price;

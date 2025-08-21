"use client";
import React from "react";

const AddToCart = () => {
  return (
    <div>
      <button
        className="bg-sky-900 px-2 border-1 rounded-md hover:bg-sky-700 cursor-pointer font-mono"
        onClick={() => {
          console.log("add");
        }}>
        Add to cart
      </button>
    </div>
  );
};

export default AddToCart;

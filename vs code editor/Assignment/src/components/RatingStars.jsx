import React from "react";

export default function RatingStars({ value = 0, onChange, readonly = false }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1">
      {stars.map(s => (
        <button
          key={s}
          type="button"
          onClick={() => !readonly && onChange && onChange(s)}
          className={`w-8 h-8 flex items-center justify-center ${s <= value ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

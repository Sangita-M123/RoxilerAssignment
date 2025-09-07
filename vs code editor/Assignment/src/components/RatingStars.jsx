// import React from "react";

// export default function RatingStars({ value = 0, onChange, readonly = false }) {
//   const stars = [1, 2, 3, 4, 5];

//   return (
//     <div className="flex">
//       {stars.map((s) => {
//         const filled = s <= value;
//         return (
//           <button
//             key={s}
//             type="button"
//             disabled={readonly}
//             onClick={() => !readonly && onChange?.(s)}
//             className={`w-8 h-8 flex items-center justify-center text-xl transition-colors 
//               ${filled ? "text-yellow-400" : "text-gray-300"} 
//               ${!readonly ? "hover:scale-110 hover:text-yellow-500" : ""}`}
//             aria-label={`Rate ${s} star${s > 1 ? "s" : ""}`}
//           >
//             ★
//           </button>
//         );
//       })}
//     </div>
//   );
// }
import React from "react";

export default function RatingStars({ value = 0, onChange, readonly = false }) {
  const stars = [1,2,3,4,5];
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

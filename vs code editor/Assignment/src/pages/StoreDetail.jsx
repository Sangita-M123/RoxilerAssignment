// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import RatingStars from "../components/RatingStars";
// import { useAuth } from "../context/AuthContext";

// const BACKEND_URL = "http://localhost:5000";

// export default function StoreDetail() {
//   const { id } = useParams();
//   const { user, refreshUser } = useAuth();
//   const [store, setStore] = useState(null);

//   useEffect(() => {
//     const fetchStore = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`${BACKEND_URL}/api/stores/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStore(res.data);
//       } catch (err) {
//         console.error("Fetch store failed:", err);
//       }
//     };
//     fetchStore();
//   }, [id]);

//   const onRate = async (score) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(`${BACKEND_URL}/api/stores/${id}/ratings`, { value: score }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       refreshUser();
//       // reload store details
//       const res = await axios.get(`${BACKEND_URL}/api/stores/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStore(res.data);
//     } catch (err) {
//       console.error("Rating failed:", err);
//     }
//   };

//   if (!store) return <div>Loading...</div>;

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-semibold">{store.name}</h2>
//       <div className="text-sm text-gray-600">{store.address}</div>

//       <div className="mt-4">
//         <div className="flex items-center gap-4">
//           <RatingStars value={store.rating_avg} readonly />
//           <div>{store.rating_avg} ({store.rating_count})</div>
//         </div>
//       </div>

//       <div className="mt-6">
//         <div className="mb-2">Your rating</div>
//         <RatingStars value={store.myRating || 0} onChange={onRate} readonly={false} />
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import RatingStars from "../components/RatingStars";

// const BACKEND_URL = "http://localhost:5000";

// export default function StoreDetail() {
//   const { id } = useParams();
//   const [store, setStore] = useState(null);

//   const fetchStore = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(`${BACKEND_URL}/api/stores/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setStore(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => { fetchStore(); }, [id]);

//   const onRate = async (score) => {
//   try {
//     const token = localStorage.getItem("token");
//     await axios.post("http://localhost:5000/api/ratings",
//       { store_id: id, score },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     alert("Rating submitted!");

//     // reload store details after rating
//     const res = await axios.get(`http://localhost:5000/api/stores/${id}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setStore(res.data);
//     refreshUser();
//   } catch (err) {
//     alert(err.response?.data?.message || "Error rating store");
//   }
// };


//   if (!store) return <div>Loading...</div>;

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-semibold">{store.name}</h2>
//       <div className="text-sm text-gray-600">{store.address}</div>

//       <div className="mt-4 flex items-center gap-4">
//         <RatingStars value={Math.round(store.rating_avg)||0} readonly />
//         <div>{(store.rating_avg||0).toFixed(1)} ({store.rating_count})</div>
//       </div>

//       <div className="mt-6">
//         <div className="mb-2">Your rating</div>
//         <RatingStars value={store.myRating || 0} onChange={onRate} readonly={false} />
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RatingStars from "../components/RatingStars";

const BACKEND_URL = "http://localhost:5000";

export default function StoreDetail() {
  const { id } = useParams(); // UUID of store
  const [store, setStore] = useState(null);

  const fetchStore = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BACKEND_URL}/api/stores/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStore(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Store not found");
    }
  };

  useEffect(() => { fetchStore(); }, [id]);

  // const onRate = async (score) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     await axios.post(`${BACKEND_URL}/api/ratings`, { store_id: id, score }, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });

  //     // Immediately update UI without refetch
  //     setStore(prev => ({
  //       ...prev,
  //       myRating: score,
  //       // optionally update average rating locally
  //       rating_avg: ((prev.rating_avg * prev.rating_count + score) / (prev.rating_count + 1)),
  //       rating_count: prev.rating_count + 1
  //     }));

  //     alert("Rating submitted!");
  //   } catch (err) {
  //     console.error(err.response?.data || err);
  //     alert(err.response?.data?.message || "Error rating store");
  //   }
  // };
const onRate = async (score) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${BACKEND_URL}/api/ratings`, { store_id: id, score }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Update store in frontend using the returned store object
    setStore(res.data.store);

  } catch (err) {
    console.error(err.response?.data || err);
    alert(err.response?.data?.message || "Error rating store");
  }
};

  if (!store) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold">{store.name}</h2>
      <div className="text-sm text-gray-600">{store.address || "-"}</div>

      <div className="mt-4 flex items-center gap-4">
        <RatingStars value={Math.round(store.rating_avg)||0} readonly />
        <div>{(store.rating_avg||0).toFixed(1)} ({store.rating_count})</div>
      </div>

      <div className="mt-6">
        <div className="mb-2">Your rating</div>
        <RatingStars value={store.myRating || 0} onChange={onRate} readonly={false} />
      </div>
    </div>
  );
}

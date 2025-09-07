// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";

// const BACKEND_URL = "http://localhost:5000";

// export default function OwnerDashboard() {
//   const { user } = useAuth();
//   const [stores, setStores] = useState([]);

//   useEffect(() => {
//     const fetchOwnerStores = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`${BACKEND_URL}/api/stores/owner/${user.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStores(res.data);
//       } catch (err) {
//         console.error("Failed to fetch owner stores:", err);
//       }
//     };

//     if (user?.id) fetchOwnerStores();
//   }, [user]);

//   return (
//     <div>
//       <h2 className="text-2xl mb-4">Owner Dashboard</h2>
//       {stores.map((s) => (
//         <div key={s.id} className="bg-white p-4 rounded shadow mb-3">
//           <div className="flex justify-between items-center">
//             <div>
//               <div className="font-semibold">{s.name}</div>
//               <div className="text-sm text-gray-600">
//                 Avg: {s.rating_avg} ({s.rating_count})
//               </div>
//             </div>
//             <div>
//               <a
//                 href={`#/owner/stores/${s.id}/raters`}
//                 className="text-blue-600"
//               >
//                 View raters
//               </a>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = "http://localhost:5000";

export default function OwnerDashboard() {
  const { user } = useAuth();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BACKEND_URL}/api/owner/stores`, { headers: { Authorization: `Bearer ${token}` }});
        setStores(res.data);
      } catch (err) { console.error(err); }
    };
    if (user?.id) fetch();
  }, [user]);

  return (
    <div>
      <h2 className="text-2xl mb-4">Owner Dashboard</h2>
      {stores.map(s => (
        <div key={s.id} className="bg-white p-4 rounded shadow mb-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-gray-600">Avg: {s.rating_avg} ({s.rating_count})</div>
            </div>
            <div>
              <a href={`#/owner/stores/${s.id}/raters`} className="text-blue-600">View raters</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

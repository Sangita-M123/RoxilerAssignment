// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white shadow">
//       <div className="container mx-auto flex justify-between items-center p-4">
//         <Link to="/" className="font-bold text-lg">
//           Store Ratings
//         </Link>

//         <div className="space-x-4">
//           {user ? (
//             <>
//               <span className="text-sm">
//                 {user.name} ({user.role})
//               </span>
//               <Link to="/stores" className="text-sm hover:underline">
//                 Stores
//               </Link>
//               {user.role?.toLowerCase() === "admin" && (
//                 <Link to="/admin" className="text-sm hover:underline">
//                   Admin
//                 </Link>
//               )}
//               {user.role?.toLowerCase() === "owner" && (
//                 <Link to="/owner" className="text-sm hover:underline">
//                   Owner
//                 </Link>
//               )}
//               <button
//                 onClick={handleLogout}
//                 className="ml-2 px-3 py-1 border rounded hover:bg-gray-100 text-sm"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="text-sm hover:underline">
//                 Login
//               </Link>
//               <Link to="/signup" className="ml-2 text-sm hover:underline">
//                 Signup
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">Store Ratings</Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
             
              <Link to="/dashboard" className="text-sm">Dashboard</Link>

             
              <Link to="/stores" className="text-sm">Stores</Link>

           
              {user.role === "admin" && (
                <>
                  <Link to="/admin/users" className="text-sm">Manage Users</Link>
                  <Link to="/admin/stores" className="text-sm">Manage Stores</Link>
                </>
              )}
              {user.role === "owner" && (
                <Link to="/owner" className="text-sm">Owner Dashboard</Link>
              )}
              
             
              <span className="text-sm">{user.name} ({user.role})</span>
              <button onClick={onLogout} className="px-3 py-1 border rounded text-sm">Logout</button>
            </>
          ) : (
            <>
             
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/signup" className="text-sm">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

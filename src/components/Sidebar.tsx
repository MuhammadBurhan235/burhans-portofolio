// import { useState } from "react";
// import { FaStar } from "react-icons/fa";
// import EditableText from "./EditableText";

// interface SidebarProps {
//   selectedNavbar: string;
//   setSelectedSidebar: (menu: string) => void;
// }

// function Sidebar({ selectedNavbar, setSelectedSidebar }: SidebarProps) {
//   const menus = {
//     Settings: ["Profile", "Preferences", "Security"],
//   };

//   return (
//     <>
//       {selectedNavbar === "Settings" ? (
//         <aside className="w-64 bg-gray-900 text-white p-4">
//           <h2 className="text-xl font-bold mb-4">{selectedNavbar}</h2>
//           <ul className="space-y-2">
//             {menus[selectedNavbar as keyof typeof menus]?.map((menu, index) => (
//               <li key={index}>
//                 <button
//                   onClick={() => setSelectedSidebar(menu)}
//                   className="block w-full text-left p-2 rounded hover:bg-gray-700"
//                 >
//                   {menu}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </aside>
//       ) : (
//         <aside className="w-64 bg-gray-800 text-white p-4 h-screen">
//           <div className="flex items-start space-x-2 mb-4">
//             <img
//               src="src\components\photo.png"
//               alt="photo"
//               className="w-10 h-10 rounded-lg"
//             />
//             <div>
//               <h2 className="text-base font-normal">
//                 <EditableText />
//               </h2>
//               <div className="flex items-center text-yellow-400 space-x-1">
//                 {[...Array(5)].map((_, i) => (
//                   <FaStar key={i} />
//                 ))}
//                 <span className="ml-2 text-white">4.48</span>
//               </div>
//             </div>
//           </div>

//           {/* <div className="text-sm flex justify-between mb-2">
//             <span>MASUK</span>
//             <span>9</span>
//           </div>
//           <div className="text-sm flex justify-between mb-2">
//             <span>BELUM</span>
//             <span>3</span>
//           </div>
//           <div className="text-sm flex justify-between mb-2">
//             <span>PROSES</span>
//             <span>1</span>
//           </div>
//           <div className="text-sm flex justify-between mb-4">
//             <span>SELESAI</span>
//             <span>0</span>
//           </div>

//           <h3 className="text-gray-400 text-sm mb-2">LAPORAN</h3>
//           <ul>
//             {[
//               { name: "Kelola", count: 7 },
//               { name: "Terdisposisi", count: 3 },
//               { name: "Arsip" },
//               { name: "Terlempar" },
//             ].map((item) => (
//               <li key={item.name}>
//                 <button
//                   className={`w-full text-left px-3 py-2 rounded ${
//                     selectedMenu === item.name
//                       ? "bg-blue-700"
//                       : "hover:bg-gray-700"
//                   } flex justify-between`}
//                   onClick={() => setSelectedMenu(item.name)}
//                 >
//                   {item.name} {item.count && <span>{item.count}</span>}
//                 </button>
//               </li>
//             ))}
//           </ul>

//           <h3 className="text-gray-400 text-sm mt-4 mb-2">BUAT LAPORAN</h3>
//           <ul>
//             {["Form Manual", "Dari Twitter"].map((item) => (
//               <li key={item}>
//                 <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-700">
//                   {item}
//                 </button>
//               </li>
//             ))}
//           </ul> */}
//         </aside>
//       )}
//     </>
//   );
// }

// export default Sidebar;

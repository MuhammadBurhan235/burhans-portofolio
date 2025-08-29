// import { useState } from "react";
// import { FaRegQuestionCircle } from "react-icons/fa";
// import Navbar from "./Navbar";

// function DashboardUser() {
//   const [selected, setSelected] = useState("PENGADUAN");
//   const options = ["PENGADUAN", "PERMINTAAN INFORMASI", "SARAN"];
//   const [date, setDate] = useState("");
//   const [activeNavbar, setActiveNavbar] = useState(1);

//   const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedDate = e.target.value;
//     const today = new Date().toISOString().split("T")[0];

//     setDate(selectedDate > today ? today : selectedDate);
//   };

//   return (
//     <div className="w-full h-[100vh] bg-gradient-to-b from-[#084a83] to-[#FFFFFF] flex flex-col items-center">
//       {/*Navbar*/}
//       <Navbar activeNavbar={activeNavbar} setActiveNavbar={setActiveNavbar} />

//       {/*Content Area*/}
//       <div className="w-full min-w-[320px] max-w-[1148px] pt-[184px] bg-transparent flex flex-col items-center max-[769px]:pt-[192px] max-[701px]:pt-[132px] max-[441px]:pt-[124px]">
//         {/* -form */}
//         <div className="w-full min-w-[288px] max-w-[1148px] p-8 bg-white rounded-b-4xl flex flex-wrap gap-8 items-center shadow-md">
//           <h1 className="w-full text-2xl text-[#084a83] font-medium text-center">
//             Sampaikan Laporan Anda
//           </h1>
//           {/* --lasifikasi laporan  */}
//           <div className="w-full flex flex-col gap-2">
//             <p className="w-full text-sm font-medium">
//               Pilih Klasifikasi Laporan
//             </p>
//             <div className="w-full border-2 border-[#084A83] rounded-[8px] overflow-hidden grid grid-cols-3 max-[768px]:grid-cols-1 max-[768px]:grid-rows-3">
//               {options.map((option) => (
//                 <label
//                   key={option}
//                   className={`flex items-center p-4 cursor-pointer text-[#084A83] font-bold text-sm transition duration-300 ease-in-out ${
//                     selected === option
//                       ? "bg-[#084A83] text-white"
//                       : "bg-white hover:bg-[#084A83]/15"
//                   }`}
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selected === option}
//                     onChange={() => setSelected(option)}
//                     className="hidden"
//                   />
//                   <div
//                     className={`w-5 h-5 flex items-center justify-center border-2 rounded-sm mr-3 ${
//                       selected === option
//                         ? "bg-white border-white"
//                         : "border-gray-400"
//                     }`}
//                   >
//                     {selected === option && (
//                       <div className="w-3 h-3 bg-[#084A83] rounded-sm"></div>
//                     )}
//                   </div>
//                   {option}
//                 </label>
//               ))}
//             </div>
//           </div>
//           <div className="w-full px-4 flex gap-2 justify-center items-center">
//             <p className="text-sm font-medium text-center">
//               Perhatikan Cara Menyampaikan Pengaduan Yang Baik dan Benar
//             </p>
//             <a href="">
//               <FaRegQuestionCircle className="text-[#084A83] text-" />
//             </a>
//           </div>
//           <div className="w-full flex flex-col gap-4">
//             <div className="w-full flex flex-col gap-2 group">
//               <p className="text-sm font-medium group-focus-within:text-[#084A83]">
//                 Judul Laporan
//               </p>
//               <input
//                 type="text"
//                 className="w-full border-2 px-4 py-2 rounded-[8px] hover:border-[#084A83]/50 focus:border-[#084A83] text-sm outline-none bg-transparent"
//                 placeholder="Masukkan judul laporan"
//               />
//             </div>
//             <div className="w-full flex flex-col gap-2 group">
//               <p className="w-full text-sm font-medium group-focus-within:text-[#084A83]">
//                 Isi Laporan
//               </p>
//               <input
//                 type="text"
//                 className="w-full border-2 px-4 py-2 rounded-[8px] hover:border-[#084A83]/50 focus:border-[#084A83] text-sm outline-none bg-transparent"
//                 placeholder="Masukkan judul laporan"
//               />
//             </div>
//             <div className="w-full flex flex-col gap-2 group">
//               <p className="text-sm font-medium group-focus-within:text-[#084A83]">
//                 Tanggal Kejadian
//               </p>
//               <input
//                 type="date"
//                 className="w-full border-2 px-4 py-2 rounded-[8px] hover:border-[#084A83]/50 focus:border-[#084A83] text-sm outline-none bg-transparent cursor-text"
//                 value={date}
//                 onChange={handleDateChange}
//                 max={new Date().toISOString().split("T")[0]} // Mencegah pemilihan tanggal masa depan di kalender
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardUser;

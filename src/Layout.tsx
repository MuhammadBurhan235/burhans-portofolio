// import { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import Mainbar from "./components/Mainbar";

// function Layout() {
//   const [selectedNavbar, setSelectedNavbar] = useState("Dashboard");
//   const [selectedSidebar, setSelectedSidebar] = useState("Home");

//   const defaultSidebarState: Record<string, string> = {
//     Dashboard: "Home",
//     Settings: "Profile",
//   };

//   useEffect(() => {
//     setSelectedSidebar(defaultSidebarState[selectedNavbar]);
//   }, [selectedNavbar]);

//   return (
//     <div className="flex h-screen w-full">
//       <div className="flex-1 flex flex-col">
//         <Navbar setSelectedNavbar={setSelectedNavbar} />
//         <div className="flex flex-1">
//           <Sidebar
//             selectedNavbar={selectedNavbar}
//             setSelectedSidebar={setSelectedSidebar}
//           />

//           <Mainbar
//             selectedNavbar={selectedNavbar}
//             selectedSidebar={selectedSidebar}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Layout;

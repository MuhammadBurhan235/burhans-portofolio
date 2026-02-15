import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// const App = lazy(() => import("./App"));
// const Layout = lazy(() => import("./Layout"));
const Landing = lazy(() => import("./components/Landing"));
const DashUser = lazy(() => import("./Pages/PortfolioMP"));
const DashCheck = lazy(() => import("./Pages/PortfolioMP copy"));
const Scroll = lazy(() => import("./components/Scroll"));

// const Dashboard = lazy(() => import("./components/Dashboard"));

const router = createBrowserRouter([
  {
    path: "/burhans-portofolio/",
    element: <DashUser />,
  },
  {
    path: "/burhans-portofolio/dashcheck",
    element: <DashCheck />,
  },
  {
    path: "/burhans-portofolio/dashuser",
    element: <Landing />,
  },
  {
    path: "/burhans-portofolio/scroll",
    element: <Scroll />,
  },
  // {
  //  path: "/warungneojapan/dashadmin",
  // element: <DashboardAdmin />,
  // children: [
  // { path: "landing", element: <Landing /> },
  // { path: "dashboard", element: <Dashboard /> },
  // ],
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center text-lg font-bold">
          Loading...
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
);

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import Friends from "./pages/Friends";

function Layout() {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const hideFooter = location.pathname === "/friends";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="flex flex-1">
        {!isHome && <Sidebar />}

        <div className={`flex-1 ${isHome ? "" : "bg-gray-50 p-6"}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/friends" element={<Friends />} />
          </Routes>
        </div>
      </div>

      {/* FOOTER */}
      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center font-bold">
            EM
          </div>
          <span className="text-xl font-bold text-purple-600">ExpenseMate</span>
        </div>

        {/* Centered Links */}
        <div className="flex gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-purple-600">
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-purple-600">
            Dashboard
          </Link>
          <Link to="/groups" className="hover:text-purple-600">
            Groups
          </Link>
          <Link to="/friends" className="hover:text-purple-600">
            Friends
          </Link>
        </div>

        {/* Right spacer (for symmetry like design) */}
        <div className="w-20"></div>
      </div>
    </nav>
  );
}

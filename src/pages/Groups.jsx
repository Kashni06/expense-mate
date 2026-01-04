import { NavLink } from "react-router-dom";
import { useState } from "react";
import { LayoutGrid, Users, User, PlusCircle, ChevronLeft } from "lucide-react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`min-h-screen bg-white border-r px-3 py-6 transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && (
          <h3 className="text-sm font-semibold text-gray-500">Navigation</h3>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ChevronLeft
            size={18}
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* LINKS */}
      <nav className="space-y-1">
        <SidebarLink
          to="/dashboard"
          icon={<LayoutGrid size={20} />}
          label="Dashboard"
          collapsed={collapsed}
        />

        <SidebarLink
          to="/groups"
          icon={<Users size={20} />}
          label="Groups"
          collapsed={collapsed}
        />

        <SidebarLink
          to="/friends"
          icon={<User size={20} />}
          label="Friends"
          collapsed={collapsed}
        />

        {/* ADD EXPENSE → GROUPS (AUTO OPEN MODAL) */}
        <NavLink
          to="/groups"
          state={{ openExpense: true }}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
            ${
              isActive
                ? "bg-purple-50 text-purple-600"
                : "text-gray-600 hover:bg-gray-100"
            }
            ${collapsed ? "justify-center" : ""}`
          }
        >
          <PlusCircle size={20} />
          {!collapsed && <span>Add Expense</span>}
        </NavLink>
      </nav>
    </aside>
  );
}

/* ---------- REUSABLE LINK ---------- */

function SidebarLink({ to, icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
        ${
          isActive
            ? "bg-purple-50 text-purple-600"
            : "text-gray-600 hover:bg-gray-100"
        }
        ${collapsed ? "justify-center" : ""}`
      }
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}

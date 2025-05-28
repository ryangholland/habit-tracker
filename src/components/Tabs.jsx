import { NavLink } from "react-router-dom";

function Tabs() {
  const baseClasses =
    "pb-2 border-b-2 text-2xl hover:text-white hover:border-white";

  return (
    <div className="p-4">
      <div className="flex border-b border-gray-700 gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "text-white border-white"
                : "text-gray-400 border-transparent"
            }`
          }
        >
          Today
        </NavLink>
        <NavLink
          to="/this-week"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "text-white border-white"
                : "text-gray-400 border-transparent"
            }`
          }
        >
          This Week
        </NavLink>
        <NavLink
          to="/stats"
          className={({ isActive }) =>
            `${baseClasses} ${
              isActive
                ? "text-white border-white"
                : "text-gray-400 border-transparent"
            }`
          }
        >
          Stats
        </NavLink>
      </div>
    </div>
  );
}

export default Tabs;

import { NavLink } from "react-router-dom";

function getTabClass(isActive) {
  const base =
    "pb-2 border-b-2 text-lg sm:text-xl md:text-2xl hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white";

  const active = isActive
    ? "text-black dark:text-white border-black dark:border-white"
    : "text-gray-600 dark:text-gray-400 border-transparent";

  return `${base} ${active}`;
}

function Tabs() {
  const baseClasses =
    "pb-2 border-b-2 text-2xl hover:text-white hover:border-white";

  return (
    <div className="p-4">
      <div className="flex border-b border-gray-300 dark:border-gray-700 gap-8">
        <NavLink to="/" className={({ isActive }) => getTabClass(isActive)}>
          Today
        </NavLink>

        <NavLink
          to="/yesterday"
          className={({ isActive }) => getTabClass(isActive)}
        >
          Yesterday
        </NavLink>

        <NavLink
          to="/stats"
          className={({ isActive }) => getTabClass(isActive)}
        >
          Stats
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => getTabClass(isActive)}
        >
          Settings
        </NavLink>
      </div>
    </div>
  );
}

export default Tabs;

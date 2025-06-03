import { FaCog } from "react-icons/fa";

function Header() {
  return (
    <header>
      <div className="flex justify-between items-center p-4 ">
        <h1 className="text-4xl ">Daily Habit Tracker</h1>
        <FaCog size={28} />
      </div>
      <hr />
    </header>
  );
}

export default Header;

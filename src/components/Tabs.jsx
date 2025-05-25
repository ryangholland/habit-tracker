import { Tab, TabGroup, TabList } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";

function Tabs() {
  const location = useLocation();

  return (
    <TabGroup className="p-4">
      <TabList className="flex border-b border-gray-700 text-2xl gap-8">
        <Link to="/">
          <Tab
            className={`text-gray-400 border-b-2 border-transparent pb-2 
        hover:text-white hover:border-white
 
        ${location.pathname === "/" ? "text-white border-white" : ""}`}
          >
            Today
          </Tab>
        </Link>
        <Link to="/this-week">
          <Tab
            className={`text-gray-400 border-b-2 border-transparent pb-2
        hover:text-white hover:border-white
        ${location.pathname === "/this-week" ? "text-white border-white" : ""}`}
          >
            This Week
          </Tab>
        </Link>
        <Link to="/stats">
          <Tab
            className={`text-gray-400 border-b-2 border-transparent pb-2
        hover:text-white hover:border-white
        ${location.pathname === "/stats" ? "text-white border-white" : ""}`}
          >
            Stats
          </Tab>
        </Link>
      </TabList>
    </TabGroup>
  );
}

export default Tabs;

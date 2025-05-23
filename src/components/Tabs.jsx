import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

function Tabs() {
  return (
    <TabGroup className="p-4">
      <TabList className="flex border-b border-gray-700 text-2xl gap-8">
        <Tab
          className="text-gray-400 border-b-2 border-transparent pb-2 
        hover:text-white hover:border-white 
        data-selected:text-white data-selected:border-white"
        >
          Today
        </Tab>
        <Tab
          className="text-gray-400 border-b-2 border-transparent pb-2
        hover:text-white hover:border-white
        data-selected:text-white data-selected:border-white"
        >
          This Week
        </Tab>
        <Tab
          className="text-gray-400 border-b-2 border-transparent pb-2
        hover:text-white hover:border-white
        data-selected:text-white data-selected:border-white"
        >
          Stats
        </Tab>
      </TabList>
      {/* <TabPanels className="mt-4">
        <TabPanel>Today</TabPanel>
        <TabPanel>This Week</TabPanel>
        <TabPanel>Stats</TabPanel>
      </TabPanels> */}
    </TabGroup>
  );
}

export default Tabs;

import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";
import DeleteHabitDialog from "../components/DeleteHabitDialog";

const Layout = () => {
  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      {/* Header (row 1) */}
      <div className="container max-w-4xl mx-auto p-4 md:p-6">
        <Header />
      </div>

      {/* Tabs (row 2) */}
      <div className="container max-w-4xl mx-auto px-4 md:px-6">
        <Tabs />
      </div>

      {/* Scrollable main content (row 3) */}
      <div className="overflow-y-auto">
        <div className="container max-w-4xl mx-auto px-4 md:px-6 pb-24">
          <main className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 md:p-6 flex flex-col gap-2">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Always-visible footer (row 4) */}
      <Footer />

      {/* Global dialog */}
      <DeleteHabitDialog />
    </div>
  );
};

export default Layout;

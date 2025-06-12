import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";
import DeleteHabitDialog from "../components/DeleteHabitDialog";

const Layout = () => {
  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
      <div className="flex-grow container max-w-4xl mx-auto p-4 md:p-6">
        <Header />
        <Tabs />
        <main
          className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mt-2 mx-4 md:p-6 flex flex-col gap-2 
             overflow-y-auto max-h-[calc(100vh-200px)]"
        >
          <Outlet />
        </main>
      </div>
      <Footer />
      <DeleteHabitDialog />
    </div>
  );
};

export default Layout;

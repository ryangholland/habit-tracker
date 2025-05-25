import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="flex-grow container max-w-4xl mx-auto p-4 md:p-6">
        <Header />
        <Tabs />
        <main className="bg-gray-800 rounded-xl p-4 mt-2 mx-4 md:p-6 flex flex-col gap-2">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

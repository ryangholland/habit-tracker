import Header from "../components/Header";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";
import DeleteHabitDialog from "../components/DeleteHabitDialog";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="container max-w-4xl mx-auto p-4 md:p-6">
        <Header />
      </div>

      <div className="container max-w-4xl mx-auto px-4 md:px-6">
        <Tabs />
      </div>

      <div className="flex-grow container max-w-4xl mx-auto px-4 md:px-6 pb-12">
        <main className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 md:p-6 flex flex-col gap-2">
          {children}
        </main>
      </div>

      <Footer />
      <DeleteHabitDialog />
    </div>
  );
}

export default Layout;

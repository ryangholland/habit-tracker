import Header from "./components/Header";
import Tabs from "./components/Tabs";
import Today from "./pages/Today";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="flex-grow container max-w-4xl mx-auto p-4 md:p-6 ">
        <Header />
        <Tabs />
        <Today />
      </div>
      <Footer />
    </div>
  );
}

export default App;

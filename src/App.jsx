import Header from "./components/Header";
import Tabs from "./components/Tabs";
import Today from "./pages/Today";

function App() {
  return (
    <div className="bg-gray-900 text-white p-4 md:p-6">
      <div className="min-h-screen  max-w-4xl mx-auto">
        <Header />
        <Tabs />
        <Today />
      </div>
    </div>
  );
}

export default App;

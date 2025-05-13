import {  useState } from "react";
import Hero from "./components/Hero";
import Layout from "./components/layout/Layout";
import MoviesLayout from "./components/layout/MoviesLayout";
import { SearchContext, ActiveTab } from "./contexts/GrobalContexts";

function App() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <main className="w-[99vw] min-h-screen m-0 block  pe-4 lg:pe-10 ps-0  bg-primary font-mono relative ">
      <ActiveTab.Provider value={{ activeTab, setActiveTab }}>
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
          <Layout>
            <Hero />
            <MoviesLayout />
          </Layout>
        </SearchContext.Provider>
      </ActiveTab.Provider>
    </main>
  );
}

export default App;

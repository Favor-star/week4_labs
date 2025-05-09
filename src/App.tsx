import { createContext, useState } from "react";
import Hero from "./components/Hero";
import Layout from "./components/layout/Layout";
import MoviesLayout from "./components/layout/MoviesLayout";

export const ActiveTab = createContext<
  | {
      activeTab: string;
      setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);

function App() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <main className="w-[99vw] min-h-screen m-0 block  pe-4 lg:pe-10 ps-0  bg-primary font-mono relative ">
      <ActiveTab.Provider value={{ activeTab, setActiveTab }}>
        <Layout>
          <Hero />
          <MoviesLayout />
        </Layout>
      </ActiveTab.Provider>
    </main>
  );
}

export default App;

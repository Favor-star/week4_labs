import Hero from "./components/Hero";
import Layout from "./components/layout/Layout";
import MoviesLayout from "./components/layout/MoviesLayout";

function App() {
  return (
    <main className="w-[99vw] min-h-screen m-0 block  pe-4 lg:pe-10 ps-0  bg-primary font-mono relative">
      <Layout>
        <Hero />
        <MoviesLayout />
      </Layout>
    </main>
  );
}

export default App;

import { useContext } from "react";
import useGetGenres from "../hooks/useGetGenres";
import { ActiveTab } from "../App";
const Sidebar = () => {
  const genreResult = useGetGenres();
  return (
    <div className="hidden sm:flex w-2/12 max-h-screen bg-secondary/20   flex-col pt-5 pe-2 text-white sticky top-0 left-0">
      <p className="font-bold text-xl md:text-2xl ps-4 mb-5">MoviesApp </p>
      <p className="font-extralight italic text-xl ps-4">Genres</p>
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar_sidebar">
        {genreResult &&
          ["All", ...genreResult.results.slice(1)].map((genre) => (
            <SideBarItem genre={genre} key={genre} />
          ))}
      </div>
      <p className="py-2 text-center w-full">Made with 💖 by Favor</p>
    </div>
  );
};

export default Sidebar;

const SideBarItem = ({ genre }: { genre: string }) => {
  const result = useContext(ActiveTab);
  function handleClick() {
    result?.setActiveTab(genre);
  }
  return (
    <p
      onClick={handleClick}
      className={
        "w-full py-2  ps-4 lg:ps-8 hover:text-secondary hover:bg-white transition-all cursor-pointer" +
        (result?.activeTab === genre ? " bg-white text-secondary" : "")
      }
    >
      {genre}
    </p>
  );
};

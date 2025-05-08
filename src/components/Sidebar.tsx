const Sidebar = () => {
  return (
    <div className="w-2/12 max-h-screen bg-secondary/20  flex flex-col pt-5 pe-2 text-white sticky top-0 left-0">
      <p className="font-bold text-xl md:text-2xl ps-4 mb-5">MoviesApp </p>
      <p className="font-extralight italic text-xl ps-4">Genres</p>
      <div className="flex flex-col flex-1">
        <p className="w-full py-2  ps-4 lg:ps-8 hover:text-secondary hover:bg-white transition-all cursor-pointer">
          All
        </p>
        {Array(7)
          .fill(null)
          .map((_, i) => (
            <SideBarItem key={i} />
          ))}
      </div>
      <p className="py-2 text-center w-full">Made with 💖 by Favor</p>
    </div>
  );
};

export default Sidebar;

const SideBarItem = () => {
  return (
    <p className="w-full py-2  ps-4 lg:ps-8 hover:text-secondary hover:bg-white transition-all cursor-pointer">
      Comedy
    </p>
  );
};

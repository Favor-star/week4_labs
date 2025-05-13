import Search from "./Search";
const Hero = () => {
  return (
    <div className="w-full  py-5 flex-row text-white  border-b-2 border-white">
      <div className="w-full flex flex-col justify-between md:w-1/2">
        <p className="font-bold text-5xl">Discover amazing movies</p>
        <p className="text-base">
          Welcome to the number one site of instant trending movies
        </p>
      </div>
      <Search />
    </div>
  );
};

export default Hero;

import Placeholder from "../assets/img-placeholder.png";
const MoviesCard = () => {
  return (
    <div
      className="grid gap-1 "
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))" }}
    >
      {" "}
      <SingleCard />
    </div>
  );
};

export default MoviesCard;

const SingleCard = () => {
  return (
    <div className="w-full flex flex-col gap-1">
      <img src={Placeholder} alt="Placeholder" />
      <p className=""></p>
    </div>
  );
};

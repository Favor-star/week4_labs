import { setCurrentPage } from "../redux/moviesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const handlePrev = () => dispatch(setCurrentPage(currentPage - 1));
  const handleNext = () => dispatch(setCurrentPage(currentPage + 1));
  const currentPage = useAppSelector((state) => state.movies.currentPage);
  useEffect(() => {
    (function () {
      window.scrollTo(0, 0);
    })();
  }, [currentPage]);
  return (
    <div className="flex max-w-fit items-center justify-center gap-1 text-white">
      <ChevronLeft
        strokeWidth={2}
        className={
          "p-2 aspect-square w-10 h-10 grid place-content-center  border rounded-lg bg-white/30 hover:bg-white hover:text-primary transition-all " +
          (currentPage === 1
            ? "pointer-events-none cursor-not-allowed border-gray-500 text-gray-400"
            : "pointer-events-auto cursor-pointer border-white text-white")
        }
        onClick={handlePrev}
      />
      <div className="flex flex-row gap-1">
        <p className="text-lg p-1 aspect-square w-10  grid place-content-center bg-white/20 rounded-lg ">
          ..
        </p>
        <p className="text-lg p-1 aspect-square w-10  grid place-content-center bg-white/20 border border-white rounded-lg ">
          {currentPage}
        </p>
        <p className="text-lg p-1 aspect-square w-10  grid place-content-center bg-white/20 rounded-lg ">
          ..
        </p>
      </div>
      <ChevronRight
        strokeWidth={2}
        className="p-2 aspect-square w-10 h-10 grid place-content-center  border border-white rounded-lg bg-white/30 hover:bg-white hover:text-primary transition-all"
        onClick={handleNext}
      />
    </div>
  );
};

export default Pagination;

import { setCurrentPage } from "../redux/moviesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import cn from "../utils";

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
    <div className="flex max-w-fit items-center justify-center gap-1 text-white ">
      <ChevronLeft
        strokeWidth={2}
        className={cn(
          "p-2 aspect-square w-10 h-10 grid place-content-center  border border-white dark:border-secondary rounded-lg bg-white/30 dark:bg-secondary/30  hover:bg-white dark:hover:bg-secondary hover:text-primary dark:hover:text-white transition-all dark:text-secondary",
          currentPage === 1
            ? "dark:text-secondary/50 text-white/50 border-none bg-white/10 cursor-not-allowed pointer-events-none dark:border-secondary/50"
            : ""
        )}
        onClick={handlePrev}
      />
      <div className="flex flex-row gap-1">
        <p className="text-lg p-1 aspect-square w-10  grid place-content-center bg-white/20 dark:bg-secondary/20 rounded-lg ">
          ..
        </p>
        <p className="text-lg p-1 aspect-square w-10  grid place-content-center bg-white/20 dark:bg-secondary/20 border border-white dark:border-secondary rounded-lg ">
          {currentPage}
        </p>
        <p className="text-lg p-1 aspect-square w-10  grid place-content-center bg-white/20 dark:bg-secondary/20 rounded-lg ">
          ..
        </p>
      </div>
      <ChevronRight
        strokeWidth={2}
        className="p-2 aspect-square w-10 h-10 grid place-content-center  border border-white dark:border-secondary rounded-lg bg-white/30 dark:bg-secondary/30  hover:bg-white dark:hover:bg-secondary dark:text-secondary hover:text-primary dark:hover:text-white transition-all"
        onClick={handleNext}
      />
    </div>
  );
};

export default Pagination;

import ReviewForm from "./ReviewForm";
import type { ReviewProps } from "..";
import { StarIcon, User2Icon } from "lucide-react";

const ReviewSection: React.FC<{ data: ReviewProps[] }> = ({ data }) => {
  return (
    <div className="w-full ">
      <p className=" p-1 border-b-2 border-white dark:border-primary mb-3 uppercase text-lg font-medium md:max-w-screen-sm">
        Reviews
      </p>
      <section className="flex flex-col w-full gap-2">
        {data.length === 0 ? (
          <div> No reviews yet</div>
        ) : (
          data.map(
            ({ reviewerName, reviewMessage, rating, dateAdded, reviewId }) => (
              <SingleReview
                key={reviewId}
                reviewerName={reviewerName}
                reviewMessage={reviewMessage}
                rating={rating}
                dateAdded={dateAdded}
              />
            )
          )
        )}
      </section>
      <ReviewForm />
    </div>
  );
};

export default ReviewSection;

const SingleReview = ({
  reviewerName,
  reviewMessage,
  rating,
  dateAdded,
}: Omit<ReviewProps, "movieId" | "reviewId">) => {
  const filled = Math.round(rating);
  const total = 5;

  return (
    <div className=" w-full bg-white/20 dark:bg-primary/20 p-2 rounded-xl flex flex-row  items-start gap-2 md:max-w-screen-sm">
      {/* <img src={""} alt="" /> */}
      <User2Icon
        // size={50}
        strokeWidth={1}
        className=" aspect-square h-full w-full max-w-20 p-2 bg-white/50 text-primary dark:bg-primary/50 dark:text-white rounded-lg border dark:border-primary border-white "
      />
      <div className="w-full flex flex-col">
        <p className="w-fit text-lg  uppercase  ">{reviewerName}</p>
        <p className="text-base w-full">{reviewMessage} </p>
        <div className="w-full flex justify-between items-center ">
          <span className="w-fit flex gap-1 dark:text-primary text-white">
            {[...Array(total)].map((_, i) => (
              <StarIcon
                key={i}
                size={20}
                strokeWidth={1.5}
                fill={i < filled ? "black" : "none"}
                stroke="white"
              />
            ))}
          </span>
          <p className="w-fit italic font-light">{dateAdded}</p>
        </div>
      </div>
    </div>
  );
};

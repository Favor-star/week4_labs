import { Loader2Icon } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { addReviewToFirebase, cn } from "../utils";
import type { ReviewProps } from "..";
import { useParams, useRevalidator } from "react-router";

const ReviewForm = () => {
  const param = useParams();
  const { revalidate } = useRevalidator();
  const [review, setReview] = useState<
    Omit<ReviewProps, "dateAdded" | "reviewId" | "movieId">
  >({
    reviewMessage: "",
    reviewerName: "",
    rating: 2.5,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [nameError, setNameError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState(false);
  const handleReviewSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (review.reviewMessage === "" || review.reviewerName === "") {
      review.reviewMessage === "" && setMessageError(true);
      review.reviewerName === "" && setNameError(true);
      return;
    }
    setIsSubmitting(true);
    const movieId = param.id ? param.id : "";
    const randomUUID = crypto.randomUUID() as string;
    const dateAdded = `${new Date().getHours()}:${new Date().getMinutes()} ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;
    const result = addReviewToFirebase({
      movieId: movieId,
      reviewId: randomUUID,
      reviewerName: review.reviewerName,
      reviewMessage: review.reviewMessage,
      rating: review.rating,
      dateAdded,
    });
    result
      .then(() => {
        setReview((review) => ({
          ...review,
          reviewMessage: "",
          rating: 2.5,
          reviewerName: "",
        }));
        revalidate();
        setIsSubmitting(false);
        setFormSubmitted(true);
      })
      .catch(() => {
        setFormSubmitted(false);
      });
  };
  const handleDataInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormSubmitted(false);
    if (e.target.type === "textarea") {
      setReview((review) => ({
        ...review,
        reviewMessage: e.target.value,
      }));
      setMessageError(false);
    }
    if (e.target.type === "text") {
      setReview((review) => ({
        ...review,
        reviewerName: (e.target as HTMLInputElement).value,
      }));
      setNameError(false);
    }
    if (e.target.type === "range") {
      setReview((rev) => ({ ...rev, rating: Number(e.target.value) }));
    }
  };
  return (
    <form
      className="w-full flex gap-1 flex-col  md:max-w-screen-sm py-3 mt-10  rounded-sm"
      onSubmit={handleReviewSubmit}
    >
      <p className="w-fit py-1 border-b-2 uppercase">Submit your review here</p>
      <div className="w-fit flex gap-2 my-3 ps-2 border-s-2">
        <p className="font-light italic">Rating:</p>
        <input
          type="range"
          min={0}
          max={5}
          value={review.rating}
          step={0.5}
          onChange={handleDataInput}
        />
        <p className="">{review.rating}</p>
      </div>
      <div className="w-full flex flex-col gap-0">
        <label htmlFor="nameInput">
          Name
          <input
            type="text"
            name="nameInput"
            id="nameInput"
            className="border w-full  p-2 rounded-lg text-base border-white/20 dark:border-primary/80 dark:focus-within:border-primary/70 "
            placeholder="e.g: Favor Eliab"
            value={review.reviewerName}
            onChange={handleDataInput}
          />
        </label>
        <p
          className={cn(
            "w-full  text-sm text-red-500 italic transition-all ",
            nameError ? "visible" : "invisible"
          )}
        >
          Please provide the name
        </p>
      </div>
      <div className="w-full flex flex-col gap-0">
        <span className="text-base mb-0.5">Review Message</span>
        <textarea
          value={formSubmitted ? "" : review.reviewMessage}
          onChange={handleDataInput}
          placeholder="Write whatever you want"
          className="max-w-screen-sm resize-y bg-inherit w-full min-h-16 border border-white/20 dark:border-primary/50 focus-within:border-white dark:focus-within:border-primary p-2 rounded-lg"
        ></textarea>
        <p
          className={cn(
            "text-sm text-red-500 italic",
            messageError ? "visible" : "invisible"
          )}
        >
          Please provide the message
        </p>
      </div>
      <button
        className={cn(
          "flex gap-2 border border-white dark:border-secondary text-white dark:text-secondary w-fit py-2 px-5 rounded-xl text-base font-medium bg-white/20 hover:bg-white/50 dark:bg-secondary/20 dark:hover:bg-secondary/50 transition-all",
          isSubmitting ? "pointer-events-none" : "pointer-events-auto"
        )}
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2Icon size={24} className="animate-spin" />}
        {formSubmitted ? "Submited" : "Submit"}
      </button>
    </form>
  );
};

export default ReviewForm;

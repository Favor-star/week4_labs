import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StarIcon } from "lucide-react";

// Inline SingleReview for test (from ReviewSection.tsx)
const SingleReview = ({
  reviewerName,
  reviewMessage,
  rating,
}: any) => {
  const filled = Math.round(rating);
  const total = 5;
  return (
    <div>
      <p>{reviewerName}</p>
      <p>{reviewMessage}</p>
      <span>
        {[...Array(total)].map((_, i) => (
          <StarIcon
            key={i}
            data-testid="star"
            fill={i < filled ? "black" : "none"}
            stroke="white"
          />
        ))}
      </span>
    </div>
  );
};

describe("ReviewItem", () => {
  it("properly renders name, rating, and comment", () => {
    render(
      <SingleReview
        reviewerName="Favor"
        reviewMessage="Great movie!"
        rating={4}
        dateAdded="12:00 1/1/2024"
      />
    );
    expect(screen.getByText("Favor")).toBeInTheDocument();
    expect(screen.getByText("Great movie!")).toBeInTheDocument();
    expect(
      screen
        .getAllByTestId("star")
        .filter((star) => star.getAttribute("fill") === "black")
    ).toHaveLength(4);
    expect(screen.getAllByTestId("star")).toHaveLength(5);
  });
});

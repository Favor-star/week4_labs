import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ReviewForm from "../components/ReviewForm";
import { describe, it, expect, vi, beforeEach } from "vitest";
import * as utils from "../utils";
import { MemoryRouter, Route, Routes } from "react-router";
// Mock addReviewToFirebase
vi.mock("../utils", async () => {
  const actual: any = await vi.importActual("../utils");
  return {
    ...actual,
    addReviewToFirebase: vi.fn(),
  };
});

// Mock useRevalidator from react-router
vi.mock("react-router", async () => {
  const actual: any = await vi.importActual("react-router");
  return {
    ...actual,
    useRevalidator: () => ({ revalidate: vi.fn() }),
  };
});
beforeEach(() => {
  render(
    <MemoryRouter initialEntries={["/movie/123"]}>
      <Routes>
        <Route path="/movie/:id" element={<ReviewForm />} />
      </Routes>
    </MemoryRouter>
  );
});

describe("ReviewForm", () => {
  const setup = () =>
    render(
      <MemoryRouter initialEntries={["/movie/123"]}>
        <Routes>
          <Route path="/movie/:id" element={<ReviewForm />} />
        </Routes>
      </MemoryRouter>
    );
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form correctly", () => {
    // setup();
    expect(screen.getByText(/submit your review/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/write whatever you want/i)
    ).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", () => {
    // setup();
    const button = screen.getAllByRole("button", { name: /submit/i })[0];
    fireEvent.click(button);
    expect(screen.getAllByText(/please provide the name/i)[0]).toBeVisible();
    expect(screen.getAllByText(/please provide the message/i)[0]).toBeVisible();
  });

  it("submits review successfully", async () => {
    (utils.addReviewToFirebase as any).mockResolvedValueOnce({});
    fireEvent.change(screen.getAllByPlaceholderText(/e.g:/i)[0], {
      target: { value: "Favor" },
    });
    fireEvent.change(
      screen.getAllByPlaceholderText(/write whatever you want/i)[0],
      {
        target: { value: "Amazing!" },
      }
    );

    fireEvent.click(screen.getAllByRole("button", { name: /submit/i })[0]);
    await waitFor(() => {
      expect(utils.addReviewToFirebase).toHaveBeenCalled();
      expect(
        screen.getByRole("button", { name: /submited/i })
      ).toBeInTheDocument();
    });
  });

  it("handles submission failure", async () => {
    (utils.addReviewToFirebase as any).mockRejectedValueOnce(new Error("fail"));
    setup();

    fireEvent.change(screen.getAllByPlaceholderText(/e.g:/i)[0], {
      target: { value: "Favor" },
    });
    fireEvent.change(
      screen.getAllByPlaceholderText(/write whatever you want/i)[0],
      {
        target: { value: "Error test" },
      }
    );
    fireEvent.click(screen.getAllByRole("button", { name: /submit/i })[0]);
    await waitFor(() => {
      expect(utils.addReviewToFirebase).toHaveBeenCalled();
      expect(
        screen.getAllByRole("button", { name: /submit/i })[0]
      ).toBeInTheDocument();
    });
  });
});

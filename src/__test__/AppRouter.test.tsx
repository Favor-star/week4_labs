import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import AppRouter from "../AppRouter";

import { renderWithProviders } from "../utils/test-utils";

describe("Testing the app", () => {
  it("should render the component correctly", () => {
    renderWithProviders(<AppRouter />);
    expect(screen.getByText(/favor's movie app/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type to search/i)).toBeInTheDocument();
    screen.debug();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

//This is a simple test to check if information has been returned from the API
test("Should display results from API", async () => {
  render(<App />);
  const results = await screen.findByTestId("results");
  expect(results).not.toBeEmpty();
});
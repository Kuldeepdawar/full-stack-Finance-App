// src/components/ApplicationList.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import ApplicationList from "./ApplicationList";

jest.mock("axios");

test("fetches and displays applications", async () => {
  const applications = [
    {
      _id: "1",
      personalDetails: { name: "Jane Doe", age: 28 },
      income: 5000,
      expenses: 2000,
      assets: 10000,
      liabilities: 3000,
    },
  ];

  axios.get.mockResolvedValue({ data: applications });

  render(<ApplicationList />);

  await waitFor(() => screen.getByText(/Saved Applications/i));

  expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
  expect(screen.getByText(/Income: 5000/i)).toBeInTheDocument();
});

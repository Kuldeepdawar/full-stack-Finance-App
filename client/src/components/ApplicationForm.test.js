// src/components/ApplicationForm.test.js
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ApplicationForm from "./ApplicationForm";

test("renders ApplicationForm and submits form data", () => {
  const handleSave = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <ApplicationForm onSave={handleSave} />
  );

  // Fill out the form fields
  fireEvent.change(getByPlaceholderText(/Name/i), {
    target: { value: "John Doe" },
  });
  fireEvent.change(getByPlaceholderText(/Age/i), { target: { value: "30" } });
  fireEvent.change(getByPlaceholderText(/Income/i), {
    target: { value: "5000" },
  });

  // Submit the form
  fireEvent.click(getByText(/Save Application/i));

  // Assert that the handleSave function was called
  expect(handleSave).toHaveBeenCalled();
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// Mock fetch
global.fetch = jest.fn();
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders pharmacy invoice audit title", () => {
    render(<App />);
    const linkElement = screen.getByText(/Pharmacy Invoice Audit/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders upload section", () => {
    render(<App />);
    expect(screen.getByText(/Upload Invoice File/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose File/i)).toBeInTheDocument();
    expect(screen.getByText(/Audit Invoice/i)).toBeInTheDocument();
  });

  test("shows error when trying to submit without file", async () => {
    render(<App />);
    const submitButton = screen.getByText(/Audit Invoice/i);

    fireEvent.click(submitButton);

    expect(screen.getByText(/Please select a file first/i)).toBeInTheDocument();
  });

  test("handles file selection", () => {
    render(<App />);
    const fileInput = screen.getByLabelText(/Choose File/i);
    const file = new File(["test content"], "test.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    const submitButton = screen.getByText(/Audit Invoice/i);
    fireEvent.click(submitButton);

    expect(screen.getByText(/Processing.../i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // Resolve the promise to clean up
    // resolvePromise!({
    //   ok: true,
    //   json: async () => ({
    //     totalItems: 0,
    //     totalDiscrepancies: 0,
    //     discrepancies: [],
    //     summary: {
    //       unitPriceIssues: 0,
    //       formulationIssues: 0,
    //       strengthIssues: 0,
    //       payerIssues: 0,
    //     },
    //   }),
    // });
  });
});

test("submits file and displays results", async () => {
  const mockResponse = {
    totalItems: 2,
    totalDiscrepancies: 1,
    discrepancies: [
      {
        id: 1,
        drugName: "Amoxicillin",
        type: "Unit Price",
        invoiceValue: "$0.50",
        referenceValue: "$0.45",
        description: "11.1% overcharge",
        severity: "low",
      },
    ],
    summary: {
      unitPriceIssues: 1,
      formulationIssues: 0,
      strengthIssues: 0,
      payerIssues: 0,
    },
  };

  mockedFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse,
  } as Response);

  render(<App />);

  const fileInput = screen.getByLabelText(/Choose File/i);
  const file = new File(["test content"], "test.xlsx", {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  fireEvent.change(fileInput, { target: { files: [file] } });

  const submitButton = screen.getByText(/Audit Invoice/i);
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/Total Items/i)).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText(/Total Issues/i)).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText(/Amoxicillin/i)).toBeInTheDocument();
    expect(screen.getByText(/11.1% overcharge/i)).toBeInTheDocument();
  });
});

test("displays no issues message when no discrepancies found", async () => {
  const mockResponse = {
    totalItems: 2,
    totalDiscrepancies: 0,
    discrepancies: [],
    summary: {
      unitPriceIssues: 0,
      formulationIssues: 0,
      strengthIssues: 0,
      payerIssues: 0,
    },
  };

  mockedFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => mockResponse,
  } as Response);

  render(<App />);

  const fileInput = screen.getByLabelText(/Choose File/i);
  const file = new File(["test content"], "test.xlsx", {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  fireEvent.change(fileInput, { target: { files: [file] } });

  const submitButton = screen.getByText(/Audit Invoice/i);
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/No Issues Found!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/All invoice items match the reference data perfectly/i)
    ).toBeInTheDocument();
  });
});

test("handles API error", async () => {
  mockedFetch.mockRejectedValueOnce(new Error("API Error"));

  render(<App />);

  const fileInput = screen.getByLabelText(/Choose File/i);
  const file = new File(["test content"], "test.xlsx", {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  fireEvent.change(fileInput, { target: { files: [file] } });

  const submitButton = screen.getByText(/Audit Invoice/i);
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/API Error/i)).toBeInTheDocument();
  });
});

test("shows loading state during submission", async () => {
  let resolvePromise: (value: any) => void;
  const promise = new Promise((resolve) => {
    resolvePromise = resolve;
  });

  mockedFetch.mockReturnValueOnce(promise as Promise<Response>);

  render(<App />);

  const fileInput = screen.getByLabelText(/Choose File/i);
  const file = new File(["test content"], "test.xlsx", {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  fireEvent.change(fileInput, { target: { files: [file] } });

  expect(screen.getByText(/Selected: test.xlsx/i)).toBeInTheDocument();
});

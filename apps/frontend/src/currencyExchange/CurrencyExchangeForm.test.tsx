import { describe, expect, it, afterEach } from "vitest";
import { CurrencyExchangeForm } from "./CurrencyExchangeForm";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

/**
 * @vitest-environment jsdom
 */

const currencyList = [
  {
    country: "United Kingdom",
    currency: "pound sterling",
    amount: 1,
    currencyCode: "GBP",
    rate: 28.222,
  },
  {
    country: "United States",
    currency: "US Dollar",
    amount: 1,
    currencyCode: "USD",
    rate: 22.781,
  },
];

afterEach(async () => {
  cleanup(); // clear testing data after each test run
});

describe("CurrencyExchangeForm", () => {
  it("should render a form", () => {
    const form = render(<CurrencyExchangeForm currencyList={currencyList} />);
    expect(form).toMatchSnapshot();
  });

  it("should calculate exchange rate when filling in data", () => {
    render(<CurrencyExchangeForm currencyList={currencyList} />);
    const input = screen.getByPlaceholderText("Enter amount");
    fireEvent.change(input, { target: { value: "10" } });
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "USD" } });
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("10 CZK = 0.44 USD")).toBeInTheDocument();
  });

  it("should return error when data is invalid", () => {
    render(<CurrencyExchangeForm currencyList={currencyList} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(
      screen.getByText("Amount must be positive number."),
    ).toBeInTheDocument();
  });
});

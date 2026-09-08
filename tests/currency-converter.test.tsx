// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CurrencyConverter } from "@/components/currency-converter";
import { QueryProvider } from "@/components/query-provider";

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "Pound Sterling" },
];

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(cleanup);

describe("currency converter", () => {
  it("converts an entered amount into the selected currency", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json({ value: 0.9 }))
      .mockImplementation(async () => Response.json({ value: 80 }));
    render(<CurrencyConverter currencies={currencies} />, {
      wrapper: QueryProvider,
    });
    const amount = screen.getByRole("spinbutton", { name: "Amount" });
    const convertedAmount = screen.getByRole("spinbutton", {
      name: "Converted amount",
    });
    await waitFor(() => expect(convertedAmount).toHaveValue(0.9));

    await user.clear(amount);
    await user.type(amount, "100");
    await user.selectOptions(
      screen.getByRole("combobox", { name: "To" }),
      "GBP",
    );

    await waitFor(() => expect(convertedAmount).toHaveValue(80));
    expect(fetch).toHaveBeenLastCalledWith(
      "/api/convert?amount=100&from=USD&to=GBP",
      expect.any(Object),
    );
  });

  it("converts in reverse when the user edits the converted amount", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch)
      .mockResolvedValueOnce(Response.json({ value: 0.9 }))
      .mockImplementation(async () => Response.json({ value: 100 }));
    render(<CurrencyConverter currencies={currencies} />, {
      wrapper: QueryProvider,
    });
    const convertedAmount = screen.getByRole("spinbutton", {
      name: "Converted amount",
    });
    await waitFor(() => expect(convertedAmount).toHaveValue(0.9));

    await user.clear(convertedAmount);
    await user.type(convertedAmount, "90");

    await waitFor(() => {
      expect(screen.getByRole("spinbutton", { name: "Amount" })).toHaveValue(
        100,
      );
    });
    expect(fetch).toHaveBeenLastCalledWith(
      "/api/convert?amount=90&from=EUR&to=USD",
      expect.any(Object),
    );
  });

  it("clears the result and explains why an empty amount is invalid", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch).mockImplementation(async () => Response.json({ value: 0.9 }));
    render(<CurrencyConverter currencies={currencies} />, {
      wrapper: QueryProvider,
    });
    const amount = screen.getByRole("spinbutton", { name: "Amount" });
    const convertedAmount = screen.getByRole("spinbutton", {
      name: "Converted amount",
    });
    await waitFor(() => expect(convertedAmount).toHaveValue(0.9));

    await user.clear(amount);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Enter a valid amount.",
    );
    expect(amount).toHaveAttribute("aria-invalid", "true");
    expect(amount).toHaveAccessibleDescription("Enter a valid amount.");
    expect(convertedAmount).toHaveValue(null);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("shows a failed conversion and recovers when the user tries again", async () => {
    const user = userEvent.setup();
    vi.mocked(fetch)
      .mockResolvedValueOnce(new Response(null, { status: 502 }))
      .mockImplementation(async () => Response.json({ value: 90 }));
    render(<CurrencyConverter currencies={currencies} />, {
      wrapper: QueryProvider,
    });
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to convert currencies. Please try again later.",
    );

    const amount = screen.getByRole("spinbutton", { name: "Amount" });
    await user.clear(amount);
    await user.type(amount, "100");

    await waitFor(() => {
      expect(
        screen.getByRole("spinbutton", { name: "Converted amount" }),
      ).toHaveValue(90);
    });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("keeps the latest result when an older request finishes last", async () => {
    const user = userEvent.setup();
    const olderRequest = Promise.withResolvers<Response>();
    vi.mocked(fetch).mockImplementation(async (url) => {
      if (url === "/api/convert?amount=10&from=USD&to=EUR") {
        return olderRequest.promise;
      }
      if (url === "/api/convert?amount=100&from=USD&to=EUR") {
        return Response.json({ value: 90 });
      }
      return Response.json({ value: 0.9 });
    });
    render(<CurrencyConverter currencies={currencies} />, {
      wrapper: QueryProvider,
    });
    const amount = screen.getByRole("spinbutton", { name: "Amount" });
    const convertedAmount = screen.getByRole("spinbutton", {
      name: "Converted amount",
    });
    await waitFor(() => expect(convertedAmount).toHaveValue(0.9));

    await user.clear(amount);
    await user.type(amount, "10");
    await waitFor(() => {
      expect(fetch).toHaveBeenLastCalledWith(
        "/api/convert?amount=10&from=USD&to=EUR",
        expect.any(Object),
      );
    });

    await user.clear(amount);
    await user.type(amount, "100");
    await waitFor(() => expect(convertedAmount).toHaveValue(90));

    await act(async () => {
      olderRequest.resolve(Response.json({ value: 9 }));
    });

    expect(convertedAmount).toHaveValue(90);
  });
});

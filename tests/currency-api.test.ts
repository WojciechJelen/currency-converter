import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/convert/route";
import { loadCurrencies } from "@/lib/loadCurrencies";

vi.mock("server-only", () => ({}));

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

describe("currency API integration", () => {
  it("maps the currency list from CurrencyBeacon's response", async () => {
    vi.mocked(fetch).mockResolvedValue(
      Response.json({
        response: [
          { id: 1, short_code: "USD", name: "US Dollar", symbol: "$" },
          { id: 2, short_code: "EUR", name: "Euro", symbol: "€" },
        ],
      }),
    );

    const currencies = await loadCurrencies();

    expect(currencies).toEqual([
      { code: "USD", name: "US Dollar" },
      { code: "EUR", name: "Euro" },
    ]);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.currencybeacon.com/v1/currencies",
      expect.objectContaining({
        headers: { Authorization: "Bearer test-api-key" },
      }),
    );
  });

  it("sends the conversion parameters and returns response.value", async () => {
    vi.mocked(fetch).mockResolvedValue(
      Response.json({ response: { amount: 100, value: 90 } }),
    );
    const request = new Request(
      "http://localhost/api/convert?amount=100&from=USD&to=EUR",
    );

    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ value: 90 });
    expect(fetch).toHaveBeenCalledWith(
      new URL(
        "https://api.currencybeacon.com/v1/convert?amount=100&from=USD&to=EUR",
      ),
      expect.objectContaining({
        headers: { Authorization: "Bearer test-api-key" },
      }),
    );
  });

  it("returns 400 for invalid input without calling CurrencyBeacon", async () => {
    const request = new Request(
      "http://localhost/api/convert?amount=-10&from=USD&to=EUR",
    );

    const response = await GET(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: "Invalid conversion parameters.",
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns a helpful error when CurrencyBeacon is unavailable", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 503 }));
    const request = new Request(
      "http://localhost/api/convert?amount=100&from=USD&to=EUR",
    );

    const response = await GET(request);

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      error: "Unable to convert currencies. Please try again later.",
    });
  });

  it("rejects a malformed conversion response", async () => {
    vi.mocked(fetch).mockResolvedValue(
      Response.json({ response: { value: "not a number" } }),
    );
    const request = new Request(
      "http://localhost/api/convert?amount=100&from=USD&to=EUR",
    );

    const response = await GET(request);

    expect(response.status).toBe(502);
  });
});

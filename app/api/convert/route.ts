import { convertCurrency } from "@/lib/convert-currency";
import { currencyConversionQuerySchema } from "@/lib/utils/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = currencyConversionQuerySchema.safeParse({
    amount: searchParams.get("amount"),
    from: searchParams.get("from"),
    to: searchParams.get("to"),
  });
  const headers = { "Cache-Control": "no-store" };

  if (!result.success) {
    return Response.json(
      { error: "Invalid conversion parameters." },
      { status: 400, headers },
    );
  }

  try {
    const conversion = await convertCurrency(result.data);
    return Response.json(conversion, { headers });
  } catch {
    return Response.json(
      { error: "Unable to convert currencies. Please try again later." },
      { status: 502, headers },
    );
  }
}

import { CurrencyConverter } from "@/components/currency-converter";
import { loadCurrencies } from "@/lib/load-currencies";

export default async function Home() {
  const currencies = await loadCurrencies();

  return (
    <main className="flex flex-1 items-start justify-center px-4 py-12 sm:py-24">
      <CurrencyConverter currencies={currencies} />
    </main>
  );
}

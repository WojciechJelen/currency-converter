import { Subtitle } from "@/ui/subtitle";
import { Title } from "@/ui/title";

export default function Loading() {
  return (
    <main className="flex flex-1 items-start justify-center px-4 py-12 sm:py-24">
      <section className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-background p-6 sm:p-8 dark:border-zinc-800">
        <Title>Currency converter</Title>
        <Subtitle role="status" className="mt-2">
          Loading currencies…
        </Subtitle>
      </section>
    </main>
  );
}

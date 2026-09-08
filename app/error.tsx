"use client";

import { Subtitle } from "@/ui/subtitle";
import { Title } from "@/ui/title";

export default function Error({ retry }: { retry: () => void }) {
  return (
    <main className="flex flex-1 items-start justify-center px-4 py-12 sm:py-24">
      <section className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-background p-6 sm:p-8 dark:border-zinc-800">
        <Title>Currency converter</Title>
        <Subtitle role="alert" className="mt-2">
          Could not load currencies. Please try again.
        </Subtitle>
        <button
          type="button"
          onClick={retry}
          className="mt-4 rounded text-sm text-blue-600 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 dark:text-blue-400"
        >
          Retry
        </button>
      </section>
    </main>
  );
}

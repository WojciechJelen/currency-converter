import { Skeleton } from "@/components/ui/skeleton";
import { Subtitle } from "@/ui/subtitle";
import { Title } from "@/ui/title";

export default function Loading() {
  return (
    <main className="flex flex-1 items-start justify-center px-4 py-12 sm:py-24">
      <section className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-background p-6 sm:p-8 dark:border-zinc-800">
        <Title>Currency converter</Title>
        <Subtitle className="mt-2">Choose your currencies</Subtitle>
        <span role="status" className="sr-only">
          Loading converter
        </span>

        <div aria-hidden="true" className="mt-8 grid gap-5">
          {[
            ["Amount", "From"],
            ["Converted amount", "To"],
          ].map((labels) => (
            <div
              key={labels[0]}
              className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-start gap-3"
            >
              {labels.map((label) => (
                <div key={label} className="flex min-w-0 flex-col gap-2">
                  <span className="text-sm font-normal leading-5 text-muted-foreground">
                    {label}
                  </span>
                  <Skeleton className="h-14 w-full rounded-lg motion-reduce:animate-none" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

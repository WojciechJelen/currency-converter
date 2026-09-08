type LabelProps = {
  labelText: string;
  htmlFor: string;
};

export function Label({ labelText, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="text-sm text-zinc-600 dark:text-zinc-400">
      {labelText}
    </label>
  );
}

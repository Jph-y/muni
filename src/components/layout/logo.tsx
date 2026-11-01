import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-white ring-2 ring-gold/60 ring-offset-2 ring-offset-background",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-7"
      >
        <path
          d="M16 4.5c3.4 3.1 5.4 6.6 5.4 10a5.4 5.4 0 0 1-10.8 0c0-3.4 2-6.9 5.4-10Z"
          fill="currentColor"
        />
        <path
          d="M16 14.5v9.2M16 19.6l4.1-3.4M16 22.2l-3.9-3.2"
          stroke="#C9A227"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M9 27.5h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

import Link from "next/link";

/**
 * Mark: one root node fanning out to two children — the smallest possible
 * drawing of an agent graph, which is what the whole path teaches.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden
      className={className}
      strokeLinecap="round"
    >
      <path
        d="M8.4 13h2.9M13.1 10.6l3.4-2.3M13.1 15.4l3.4 2.3"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="5.4" cy="13" r="3" fill="currentColor" />
      <circle cx="19.6" cy="6.6" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <circle
        cx="19.6"
        cy="19.4"
        r="2.4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

const SIZES = {
  sm: { badge: "h-8 w-8 rounded-[10px]", mark: "h-[18px] w-[18px]", word: "text-[17px]", serif: "text-[19px] ml-[3px]", gap: "gap-2.5" },
  lg: { badge: "h-9 w-9 rounded-[11px]", mark: "h-5 w-5", word: "text-[20px]", serif: "text-[22px] ml-1", gap: "gap-3" },
} as const;

/**
 * `surface` says what the logo is sitting on, not what colour it is. The badge
 * is a dark tile with a light mark in both cases — inverting it on dark
 * backgrounds made the same brand read as two different marks. On obsidian the
 * tile lifts one step off the background and takes a hairline ring so it still
 * separates.
 */
export default function Logo({
  className = "",
  surface = "light",
  size = "sm",
  href,
}: {
  className?: string;
  surface?: "light" | "dark";
  size?: "sm" | "lg";
  /** Pass a route to make the whole lockup a link. */
  href?: React.ComponentProps<typeof Link>["href"];
}) {
  const s = SIZES[size];

  const lockup = (
    <>
      <span
        className={`grid shrink-0 place-items-center text-canvas ${s.badge} ${
          surface === "light"
            ? "bg-ink shadow-[0_1px_0_rgba(255,255,255,0.16)_inset,0_4px_12px_-6px_rgba(21,21,26,0.7)]"
            : "bg-obsidian-2 ring-1 ring-white/14"
        }`}
      >
        <LogoMark className={s.mark} />
      </span>
      <span className={`${s.word} leading-none tracking-[-0.03em]`}>
        <span className="font-medium">Agent</span>
        <span className={`em-serif ${s.serif}`}>School</span>
      </span>
    </>
  );

  const shell = `flex items-center ${s.gap} ${className}`;

  // Two explicit returns rather than a dynamic tag: a `Link | "span"` union
  // cannot be given props that typecheck for both.
  if (href) {
    return (
      <Link
        href={href}
        aria-label="Agent School home"
        className={`${shell} transition-opacity hover:opacity-80`}
      >
        {lockup}
      </Link>
    );
  }

  return <span className={shell}>{lockup}</span>;
}

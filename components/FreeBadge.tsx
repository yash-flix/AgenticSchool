/**
 * The nav's standing trust signal. A verified-style tick rather than the plain
 * `.chip-free` pill, so it reads as a claim someone stands behind instead of a
 * loose tag. The shared chip is left alone — stage headers and course pages
 * still use it, where a quieter treatment is right.
 */
export default function FreeBadge({ className = "" }: { className?: string }) {
  return (
    <span
      title="Every course is free on YouTube. No sign-up, no paywall."
      className={`items-center gap-1.5 rounded-full border border-moss/35 bg-moss/8 py-[3px] pr-2.5 pl-[3px] ${className}`}
    >
      <span className="grid h-[15px] w-[15px] shrink-0 place-items-center rounded-full bg-moss">
        <svg viewBox="0 0 14 14" aria-hidden className="h-[9px] w-[9px]">
          <path
            d="M3.4 7.3 5.8 9.7 10.6 4.6"
            fill="none"
            stroke="#fbfaf7"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-mono text-[9.5px] tracking-[0.15em] text-moss uppercase">
        Free
      </span>
    </span>
  );
}

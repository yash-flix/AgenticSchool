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

export default function Logo({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "canvas";
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        className={`grid h-8 w-8 place-items-center rounded-[10px] ${
          tone === "ink"
            ? "bg-ink text-canvas shadow-[0_1px_0_rgba(255,255,255,0.16)_inset,0_4px_12px_-6px_rgba(21,21,26,0.7)]"
            : "bg-canvas text-ink"
        }`}
      >
        <LogoMark className="h-[18px] w-[18px]" />
      </span>
      <span className="text-[17px] leading-none tracking-[-0.03em]">
        <span className="font-medium">Agent</span>
        <span className="em-serif ml-[3px] text-[19px]">School</span>
      </span>
    </span>
  );
}

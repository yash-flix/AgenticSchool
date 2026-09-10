import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import Callout from "@/components/notes/Callout";

/**
 * Global element map for every MDX note. Markdown renders to bare HTML tags;
 * this is where they pick up the site's type scale, so a note written in a
 * text editor lands looking like the rest of the site without any classes in
 * the prose itself.
 */
function A({ href = "", children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls =
    "underline decoration-flame/50 decoration-[1.5px] underline-offset-[3px] transition-colors hover:decoration-flame";
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} target="_blank" rel="noreferrer" {...rest}>
      {children}
    </a>
  );
}

const components = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="display-3 mt-14 mb-5 first:mt-0">{children}</h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="display-4 mt-12 mb-4 border-t border-line pt-8 text-[1.45rem] first:mt-0 first:border-t-0 first:pt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="mt-9 mb-3 text-[17px] font-medium tracking-[-0.02em]">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="my-5 text-[16.5px] leading-[1.68] tracking-[-0.011em] text-ink-2 first:mt-0">
      {children}
    </p>
  ),
  a: A,
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-medium text-ink">{children}</strong>
  ),
  em: ({ children }: { children?: ReactNode }) => (
    <em className="em-serif text-[1.05em]">{children}</em>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="my-5 space-y-2.5 pl-1">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="my-5 list-decimal space-y-2.5 pl-6 marker:font-mono marker:text-[12px] marker:text-muted">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="relative pl-5 text-[16px] leading-[1.62] text-ink-2 before:absolute before:top-[0.75em] before:left-0 before:h-[5px] before:w-[5px] before:rounded-full before:bg-line-2 [ol_&]:pl-1 [ol_&]:before:hidden">
      {children}
    </li>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-7 border-l-2 border-flame pl-5 [&_p]:text-[17px] [&_p]:text-ink">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="rule-x my-12 h-px border-0" />,
  code: ({ children }: { children?: ReactNode }) => (
    <code className="rounded-[5px] bg-panel px-1.5 py-0.5 font-mono text-[0.86em] text-ink [pre_&]:rounded-none [pre_&]:bg-transparent [pre_&]:p-0 [pre_&]:text-inherit">
      {children}
    </code>
  ),
  pre: ({ children }: { children?: ReactNode }) => (
    <pre className="my-7 overflow-x-auto rounded-[12px] bg-obsidian p-5 font-mono text-[13px] leading-[1.6] text-canvas/90 shadow-[var(--shadow-panel)] ring-1 ring-black/10">
      {children}
    </pre>
  ),
  table: ({ children }: { children?: ReactNode }) => (
    <div className="my-7 overflow-x-auto rounded-xl border border-line">
      <table className="w-full text-[14.5px] [&_td]:border-t [&_td]:border-line [&_td]:px-4 [&_td]:py-3 [&_td]:text-ink-2 [&_th]:bg-panel [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-mono [&_th]:text-[10.5px] [&_th]:tracking-[0.15em] [&_th]:text-muted [&_th]:uppercase">
        {children}
      </table>
    </div>
  ),
  Callout,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}

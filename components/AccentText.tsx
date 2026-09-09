import { Fragment } from "react";

/**
 * Renders a headline where a phrase wrapped in *asterisks* is set in the
 * italic serif accent face. Keeps the emphasis in the copy, not the markup.
 */
export default function AccentText({ children }: { children: string }) {
  const parts = children.split("*");
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className="em-serif">
            {p}
          </span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        )
      )}
    </>
  );
}

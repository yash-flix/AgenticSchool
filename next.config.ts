import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Notes are written as MDX under content/notes and imported by the /notes
  // routes, so the bundler has to treat .mdx as a module type.
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

// Plugins are named as strings, not imported: Turbopack can only serialise
// string-named plugins, and remark-gfm is what gives notes tables, task
// lists and autolinks.
const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: { remarkPlugins: ["remark-gfm"] },
});

export default withMDX(nextConfig);

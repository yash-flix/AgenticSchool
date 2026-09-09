export const referenceRepo = {
  owner: "Sumanth077",
  name: "Hands-On AI Engineering",
  slug: "Sumanth077/Hands-On-AI-Engineering",
  url: "https://github.com/Sumanth077/Hands-On-AI-Engineering",
  description:
    "A curated collection of practical AI projects implementing OCR systems, RAG, AI agents, and other AI use cases.",
  stars: 3358,
  forks: 854,
  language: "Python",
  /** Read from the GitHub API on 10 September 2026. */
  readAt: "10 Sep 2026",
  categories: [
    { name: "AI agents", path: "ai_agents", count: 41 },
    { name: "RAG apps", path: "rag_apps", count: 11 },
    { name: "Multimodal", path: "multimodal", count: 6 },
    { name: "OCR", path: "OCR", count: 4 },
    { name: "Audio", path: "audio", count: 3 },
    { name: "Fine-tuning", path: "fine_tuning", count: 1 },
  ],
};

export const referenceTotal = referenceRepo.categories.reduce(
  (a, c) => a + c.count,
  0
);

export type ReferenceBuild = {
  dir: string;
  path: string;
  title: string;
  blurb: string;
  stack: string[];
  /** Which stage of the course path this build is a natural exercise for. */
  stage: string;
};

const base = `${referenceRepo.url}/tree/main`;

export const referenceBuilds: ReferenceBuild[] = [
  {
    dir: "multi_agent_research_assistant_ag2",
    path: "ai_agents",
    title: "Multi-agent research assistant",
    blurb:
      "A research crew that splits a question across agents and reconciles what they find. The clearest thing to build right after the orchestration stage.",
    stack: ["AG2", "Multi-agent"],
    stage: "2.0 Orchestrate",
  },
  {
    dir: "deep_research_assistant",
    path: "ai_agents",
    title: "Deep research assistant",
    blurb:
      "Long-horizon research with planning and iterative search, rather than a single retrieval pass and a summary.",
    stack: ["Planning", "Search"],
    stage: "2.0 Orchestrate",
  },
  {
    dir: "self_evolving_code_review_agent",
    path: "ai_agents",
    title: "Self-evolving code review agent",
    blurb:
      "A reviewer that updates its own rules from feedback. Good for seeing how memory changes agent behaviour over time.",
    stack: ["Memory", "Evaluation"],
    stage: "3.0 Context",
  },
  {
    dir: "multi_agent_financial_analyst",
    path: "ai_agents",
    title: "Multi-agent financial analyst",
    blurb:
      "Analyst, researcher, and writer agents producing one report. A direct parallel to the CrewAI course, on harder data.",
    stack: ["CrewAI", "Tools"],
    stage: "2.0 Orchestrate",
  },
  {
    dir: "github_intelligence_agent",
    path: "ai_agents",
    title: "GitHub intelligence agent",
    blurb:
      "Reads a repository and answers questions about it. A practical test of whether your retrieval design survives real code.",
    stack: ["RAG", "Tools"],
    stage: "3.0 Context",
  },
  {
    dir: "browser_automation_agent",
    path: "ai_agents",
    title: "Browser automation agent",
    blurb:
      "An agent that drives a browser to finish a task. The clearest demonstration of why tool interfaces need guardrails.",
    stack: ["Tools", "Guardrails"],
    stage: "3.0 Context",
  },
  {
    dir: "hybrid_rag_system",
    path: "rag_apps",
    title: "Hybrid RAG system",
    blurb:
      "Dense and sparse retrieval combined, then reranked. Build this alongside the production RAG course to feel the difference.",
    stack: ["Hybrid search", "Reranking"],
    stage: "3.0 Context",
  },
  {
    dir: "graphrag_knowledge_system",
    path: "rag_apps",
    title: "GraphRAG knowledge system",
    blurb:
      "Retrieval over a knowledge graph instead of a flat vector store. Worth building once you know where embeddings fall down.",
    stack: ["Knowledge graph", "RAG"],
    stage: "3.0 Context",
  },
  {
    dir: "multi_agent_coding_assistant",
    path: "ai_agents",
    title: "Multi-agent coding assistant",
    blurb:
      "Planner, coder, and reviewer working on one codebase. A fitting capstone once the whole path is behind you.",
    stack: ["Multi-agent", "Codegen"],
    stage: "4.0 Ship",
  },
];

export function buildUrl(b: ReferenceBuild) {
  return `${base}/${b.path}/${b.dir}`;
}

export function categoryUrl(path: string) {
  return `${base}/${path}`;
}

/* ------------------------------------------------------------------ */
/* Community projects                                                  */
/* ------------------------------------------------------------------ */

export type CommunityProject = {
  id: string;
  title: string;
  tagline: string;
  author: string;
  repoUrl: string;
  demoUrl?: string;
  stack: string[];
  stage: string;
  createdAt: string;
};

export const projectStages = [
  "1.0 Ground",
  "2.0 Orchestrate",
  "3.0 Context",
  "4.0 Ship",
] as const;

export type NewProject = {
  title: string;
  tagline: string;
  author: string;
  repoUrl: string;
  demoUrl?: string;
  stack: string[];
  stage: string;
};

/** Field-level validation shared by the form and the API route. */
export function validateProject(input: Partial<NewProject>) {
  const errors: Record<string, string> = {};
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  if (str(input.title).length < 3) errors.title = "Give it a name.";
  if (str(input.title).length > 70) errors.title = "Keep the name under 70 characters.";
  if (str(input.tagline).length < 12)
    errors.tagline = "One sentence on what it does.";
  if (str(input.tagline).length > 180)
    errors.tagline = "Keep it under 180 characters.";
  if (str(input.author).length < 2) errors.author = "Who built it?";

  const repo = str(input.repoUrl);
  if (!/^https:\/\/(github\.com|gitlab\.com)\/[\w.-]+\/[\w.-]+/i.test(repo))
    errors.repoUrl = "Needs a public GitHub or GitLab URL.";

  const demo = str(input.demoUrl);
  if (demo && !/^https:\/\/\S+\.\S+/.test(demo))
    errors.demoUrl = "Demo link must start with https://";

  if (!input.stack || input.stack.length === 0)
    errors.stack = "Pick at least one thing you used.";

  if (!input.stage || !projectStages.includes(input.stage as never))
    errors.stage = "Pick the stage this came out of.";

  return errors;
}

export const stackOptions = [
  "LangGraph",
  "CrewAI",
  "OpenAI Agents SDK",
  "MCP",
  "RAG",
  "Vector DB",
  "n8n",
  "Pure Python",
  "Evals",
];

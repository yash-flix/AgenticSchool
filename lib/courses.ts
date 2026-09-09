export type Stage = {
  id: string;
  index: string;
  name: string;
  headline: string;
  blurb: string;
};

export type Course = {
  slug: string;
  n: string;
  stage: string;
  sub: string;
  title: string;
  shortTitle: string;
  channel: string;
  videoId: string;
  minutes: number;
  views: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  free: boolean;
  topics: string[];
  summary: string;
  outcomes: string[];
};

export const stages: Stage[] = [
  {
    id: "ground",
    index: "1.0",
    name: "Ground",
    headline: "Learn what an *agent* actually is before you wire one up",
    blurb:
      "Models, tools, loops, and state. These three courses give you the vocabulary and the first working agent, without hiding anything behind a framework.",
  },
  {
    id: "orchestrate",
    index: "2.0",
    name: "Orchestrate",
    headline: "Move from one agent to a *team* that coordinates",
    blurb:
      "Graphs, roles, handoffs, and control flow. Learn the three orchestration models that every production agent stack is built on top of.",
  },
  {
    id: "context",
    index: "3.0",
    name: "Context",
    headline: "Give your agents *something real* to work with",
    blurb:
      "An agent is only as good as what it can read and reach. Retrieval, vector stores, memory, and the protocol that plugs agents into your tools.",
  },
  {
    id: "ship",
    index: "4.0",
    name: "Ship",
    headline: "Build the projects that *prove* you can do this",
    blurb:
      "End with two long build-alongs. One writes real Python, one ships client-ready automations. Both leave you with something to show.",
  },
];

export const courses: Course[] = [
  {
    slug: "agentic-ai-complete-course",
    n: "01",
    stage: "ground",
    sub: "1.1",
    title: "Agentic AI – Complete Course for Beginners",
    shortTitle: "Agentic AI, end to end",
    channel: "freeCodeCamp.org",
    videoId: "Zy7EXDONlTY",
    minutes: 1456,
    views: 271948,
    level: "Beginner",
    free: true,
    topics: ["Fundamentals", "Python", "Frameworks"],
    summary:
      "The single longest structured run at agentic AI on YouTube. It starts at prompting and ends at multi-agent systems, so you can treat it as the spine of the whole path and use everything else as depth.",
    outcomes: [
      "Explain the agent loop: perceive, plan, act, observe",
      "Wire tools and function calling into a model",
      "Compare the major agent frameworks on their own terms",
      "Carry one project through the entire course",
    ],
  },
  {
    slug: "complete-agentic-ai-10-hours",
    n: "02",
    stage: "ground",
    sub: "1.2",
    title: "Complete Agentic AI Course in 10 Hours",
    shortTitle: "The practitioner's ten hours",
    channel: "Krish Naik",
    videoId: "rV3HJ4LEZ7k",
    minutes: 673,
    views: 873912,
    level: "Beginner",
    free: true,
    topics: ["LangChain", "LangGraph", "RAG", "Guardrails"],
    summary:
      "Denser and faster than the freeCodeCamp run, and it goes places the others skip: guardrails, evaluations, and vectorless retrieval. Best watched second, when the vocabulary already means something.",
    outcomes: [
      "Build with LangChain and LangGraph side by side",
      "Add guardrails and evaluation to an agent",
      "Understand vectorless retrieval and when it wins",
      "Ship a full agentic app rather than a notebook",
    ],
  },
  {
    slug: "ai-agents-pure-python",
    n: "03",
    stage: "ground",
    sub: "1.3",
    title: "Building AI Agents in Pure Python – Beginner Course",
    shortTitle: "No frameworks, no magic",
    channel: "Dave Ebbelaar",
    videoId: "bZzyPscbtI8",
    minutes: 47,
    views: 455799,
    level: "Beginner",
    free: true,
    topics: ["Python", "From scratch", "Structured output"],
    summary:
      "Forty-seven minutes that will save you weeks. Every abstraction you meet later is a wrapper around what happens here, so watching this early makes the frameworks legible instead of mysterious.",
    outcomes: [
      "Write an agent loop by hand in plain Python",
      "Use structured outputs to make model responses safe",
      "Recognise what a framework is doing for you",
      "Debug agents without framework tooling",
    ],
  },
  {
    slug: "langgraph-complete-course",
    n: "04",
    stage: "orchestrate",
    sub: "2.1",
    title: "LangGraph Complete Course for Beginners – Complex AI Agents with Python",
    shortTitle: "Agents as graphs",
    channel: "freeCodeCamp.org",
    videoId: "jGg_1h0qzaM",
    minutes: 190,
    views: 963056,
    level: "Intermediate",
    free: true,
    topics: ["LangGraph", "State machines", "Multi-agent"],
    summary:
      "LangGraph is how most teams put agents into production, because it makes control flow explicit. This is the clearest free course on it, and the state model it teaches transfers to every other framework.",
    outcomes: [
      "Model an agent as nodes, edges, and shared state",
      "Add branching, loops, and human checkpoints",
      "Persist and resume long-running agent runs",
      "Build a multi-agent graph that actually terminates",
    ],
  },
  {
    slug: "crewai-multi-agent",
    n: "05",
    stage: "orchestrate",
    sub: "2.2",
    title: "CrewAI Tutorial | Agentic AI Tutorial",
    shortTitle: "Agents with job titles",
    channel: "codebasics",
    videoId: "G42J2MSKyc8",
    minutes: 71,
    views: 126105,
    level: "Intermediate",
    free: true,
    topics: ["CrewAI", "Multi-agent", "Roles"],
    summary:
      "The role-based view of orchestration: researcher, writer, reviewer, each with goals and tools. An hour is exactly the right length to understand where role delegation beats a hand-built graph, and where it does not.",
    outcomes: [
      "Define agents by role, goal, and backstory",
      "Chain tasks across a crew with dependencies",
      "Give each agent its own tool set",
      "Judge role-based design against graph-based design",
    ],
  },
  {
    slug: "openai-agents-sdk",
    n: "06",
    stage: "orchestrate",
    sub: "2.3",
    title: "OpenAI Agents SDK Tutorial (Full Series)",
    shortTitle: "The vendor SDK path",
    channel: "Kody Simpson",
    videoId: "gFcAfU3V1Zo",
    minutes: 151,
    views: 39686,
    level: "Intermediate",
    free: true,
    topics: ["Agents SDK", "Handoffs", "Tracing"],
    summary:
      "A full series on the first-party SDK, covering handoffs, guardrails, and tracing. Worth doing after LangGraph so you can feel the trade between a thin vendor SDK and a framework you control.",
    outcomes: [
      "Build agents, handoffs, and guardrails with the SDK",
      "Trace an agent run and read what went wrong",
      "Use sessions to keep conversation state",
      "Decide when a vendor SDK is enough",
    ],
  },
  {
    slug: "mcp-full-course",
    n: "07",
    stage: "context",
    sub: "3.1",
    title: "MCP Full Course For Beginners (With Deployment)",
    shortTitle: "Plugging agents into everything",
    channel: "Ansh Lamba",
    videoId: "io02ZM0ADqM",
    minutes: 226,
    views: 42515,
    level: "Intermediate",
    free: true,
    topics: ["MCP", "Tools", "Deployment"],
    summary:
      "Model Context Protocol is becoming the standard way agents reach tools and data. This course goes past the explainer and into writing servers and deploying them, which is the part most MCP videos skip.",
    outcomes: [
      "Write an MCP server that exposes tools and resources",
      "Connect an MCP server to a real client",
      "Deploy a server other people can use",
      "Design tool interfaces an agent can call reliably",
    ],
  },
  {
    slug: "production-rag-langchain",
    n: "08",
    stage: "context",
    sub: "3.2",
    title: "Production RAG with LangChain & Vector Databases – Full Course",
    shortTitle: "Retrieval that survives contact",
    channel: "freeCodeCamp.org",
    videoId: "mHxLXzYjQRE",
    minutes: 459,
    views: 217032,
    level: "Advanced",
    free: true,
    topics: ["RAG", "Vector DB", "Evaluation"],
    summary:
      "Most agent failures are retrieval failures. Seven hours on chunking, embeddings, hybrid search, reranking, and evaluation, aimed at systems that keep working after the demo.",
    outcomes: [
      "Choose chunking and embedding strategies deliberately",
      "Run hybrid search and reranking over a vector store",
      "Evaluate retrieval quality instead of guessing",
      "Give an agent long-term memory it can trust",
    ],
  },
  {
    slug: "advanced-multi-agent-python",
    n: "09",
    stage: "ship",
    sub: "4.1",
    title: "ADVANCED Python AI Multi-Agent Tutorial (RAG, Streamlit, Langflow)",
    shortTitle: "The capstone build",
    channel: "Tech With Tim",
    videoId: "msLovKSj8Q0",
    minutes: 108,
    views: 136807,
    level: "Advanced",
    free: true,
    topics: ["Project", "RAG", "Streamlit"],
    summary:
      "A single build that pulls the whole path together: several agents, retrieval, and a front end a human can actually use. Do this one with your own dataset rather than the one on screen.",
    outcomes: [
      "Assemble multiple agents into one working app",
      "Put a Streamlit interface in front of an agent system",
      "Combine retrieval with agent reasoning",
      "Finish with a portfolio project you can demo",
    ],
  },
  {
    slug: "n8n-build-and-sell-agents",
    n: "10",
    stage: "ship",
    sub: "4.2",
    title: "Build & Sell n8n AI Agents (8+ Hour Course, No Code)",
    shortTitle: "Turning agents into work",
    channel: "Nate Herk | AI Automation",
    videoId: "Ey18PDiaAYI",
    minutes: 507,
    views: 1883479,
    level: "Beginner",
    free: true,
    topics: ["n8n", "No-code", "Automation"],
    summary:
      "The most watched course on this list, and the most commercial. Eight hours of agent automations built in n8n, plus how they get packaged and sold. Different skill from the Python track, and a useful one.",
    outcomes: [
      "Build agent workflows visually in n8n",
      "Connect real business tools without writing glue code",
      "Design automations clients will pay for",
      "Ship faster than a from-scratch build allows",
    ],
  },
];

export const totalMinutes = courses.reduce((a, c) => a + c.minutes, 0);
export const totalViews = courses.reduce((a, c) => a + c.views, 0);

export function fmtDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function fmtViews(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${Math.round(v / 1_000)}K`;
  return String(v);
}

export function thumb(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export function watchUrl(videoId: string) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export const allTopics = Array.from(
  new Set(courses.flatMap((c) => c.topics))
).sort();

/* ------------------------------------------------------------------ */
/* Field track — from the "Build with Ai" playlist                     */
/* ------------------------------------------------------------------ */

export type FieldVideo = {
  videoId: string;
  title: string;
  channel: string;
  minutes: number;
  tag: string;
};

export const playlistUrl =
  "https://www.youtube.com/playlist?list=PLchXxfd_3auQ";

export const playlistName = "Build with Ai";

/**
 * Long-form talks and walkthroughs on how working engineers use agents day to
 * day. Different from the course path: less curriculum, more shoulder-surfing.
 */
export const fieldTrack: FieldVideo[] = [
  {
    videoId: "14RP8liACqo",
    title:
      "How Senior Engineers Actually Build With AI in 2026 | Full Stack Systems Architecture App",
    channel: "JavaScript Mastery",
    minutes: 238,
    tag: "Build-along",
  },
  {
    videoId: "UPtmKh1vMN8",
    title: "Claude Code Advanced Full Course (3 Hours)",
    channel: "Nick Saraev",
    minutes: 198,
    tag: "Tooling",
  },
  {
    videoId: "TAKDIvvUdc4",
    title: "Complete Claude Code Course In 2 Hours For Developers",
    channel: "Krish Naik",
    minutes: 119,
    tag: "Tooling",
  },
  {
    videoId: "58n-n-3oRic",
    title:
      "Andrew Ng's graph engineering course: 1 prompt → 100 agents → loops → graphs",
    channel: "Function Form",
    minutes: 110,
    tag: "Orchestration",
  },
  {
    videoId: "K-mA3MZ_EzU",
    title: "Watch me build a brand-new project from scratch",
    channel: "Matt Pocock",
    minutes: 108,
    tag: "Build-along",
  },
  {
    videoId: "uqX2hY7CseU",
    title:
      "How Senior Engineers Actually Build with AI in 2026 | Splitwise AI Clone",
    channel: "Ankita Kulkarni",
    minutes: 101,
    tag: "Build-along",
  },
  {
    videoId: "kPN564Kol14",
    title: "L8 Principal Building a Full Stack App with Agentic Engineering",
    channel: "Kun Chen",
    minutes: 100,
    tag: "Workflow",
  },
  {
    videoId: "-QFHIoCo-Ko",
    title: "Full Walkthrough: Workflow for AI Coding",
    channel: "AI Engineer · Matt Pocock",
    minutes: 97,
    tag: "Workflow",
  },
  {
    videoId: "Ak_edo5Z9YM",
    title: "Build This Project to Get Hired in 2026",
    channel: "Harkirat Singh",
    minutes: 60,
    tag: "Build-along",
  },
  {
    videoId: "88B6DimMD2g",
    title: "How This Ex-Meta L8 Engineer Ships 40 PRs a Day with AI Agents",
    channel: "Peter Yang",
    minutes: 56,
    tag: "Workflow",
  },
  {
    videoId: "Ukju3maxbEQ",
    title: "A Meta Engineer's Agentic Engineering Workflow",
    channel: "Jason Ku",
    minutes: 52,
    tag: "Workflow",
  },
  {
    videoId: "QBfXiWvM0qc",
    title: "A $75M founder reveals his agentic engineering setup",
    channel: "David Ondrej",
    minutes: 52,
    tag: "Workflow",
  },
  {
    videoId: "iQyg-KypKAA",
    title: "L8 Principal's Agentic Engineering Workflow",
    channel: "Kun Chen",
    minutes: 46,
    tag: "Workflow",
  },
  {
    videoId: "5N-okeDdIuI",
    title: "L8 Principal's Agentic Dev Environment From Scratch",
    channel: "Kun Chen",
    minutes: 45,
    tag: "Setup",
  },
  {
    videoId: "0oXOOlqVu5M",
    title: "So I tried Matt's skills...",
    channel: "Theo · t3.gg",
    minutes: 38,
    tag: "Review",
  },
  {
    videoId: "S-sYlFiGFv8",
    title: "How the Claude Code team uses Claude Code",
    channel: "Claude",
    minutes: 22,
    tag: "Workflow",
  },
  {
    videoId: "17-YSUHo6Lk",
    title: "Agentic SDLC at Uber",
    channel: "AI Engineer",
    minutes: 18,
    tag: "In production",
  },
  {
    videoId: "xLQgOzK1adE",
    title: "My current agentic coding workflow",
    channel: "Web Dev Cody",
    minutes: 14,
    tag: "Workflow",
  },
  {
    videoId: "PXzHKuBuyJU",
    title: "How to Write a CLAUDE.md That Actually Works",
    channel: "ByteMonk",
    minutes: 7,
    tag: "Setup",
  },
];

export const fieldMinutes = fieldTrack.reduce((a, v) => a + v.minutes, 0);
export const libraryMinutes = totalMinutes + fieldMinutes;
export const libraryCount = courses.length + fieldTrack.length;

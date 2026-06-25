export type ForkColumn = "da" | "ml" | "genai";

export interface JourneyBlock {
  id: string;
  label: string;
  level: number;
  /** If set, this block occupies one third of a fork row. */
  forkColumn?: ForkColumn;
  /** Track tag shown as a pill. */
  tag?: string;
  /** Key into the BLOCK_ICONS map. */
  icon: string;
}

/**
 * Blocks ordered foundation-first (index 0 = foundation, level 0).
 * Fork rows share the same `level` value.
 */
export const JOURNEY_BLOCKS: JourneyBlock[] = [
  { id: "infra-setup",         label: "Infra Setup",                level: 0, tag: "DE",    icon: "server" },
  { id: "cost-monitoring",     label: "Cost Monitoring",            level: 1, tag: "DE",    icon: "dollar" },
  { id: "data-governance",     label: "Data Governance Strategy",   level: 2, tag: "DE",    icon: "shield" },
  { id: "access-data",         label: "Access Your Data",           level: 3, tag: "DE",    icon: "cloud-download" },
  { id: "first-pipeline",      label: "Build the First Pipeline",   level: 4, tag: "DE",    icon: "pipeline" },
  { id: "automation",          label: "Automation & Orchestration", level: 5, tag: "DE",    icon: "gear" },
  // Fork row, level 6
  { id: "metric-views",        label: "Business Semantics",         level: 6, forkColumn: "da",    tag: "DA",    icon: "tag" },
  { id: "feature-store",       label: "Feature Store",              level: 6, forkColumn: "ml",    tag: "ML",    icon: "database" },
  { id: "vector-search",       label: "Document Intelligence",      level: 6, forkColumn: "genai", tag: "GenAI", icon: "search" },
  // Fork row, level 7
  { id: "aibi",                label: "Unified Analytics",          level: 7, forkColumn: "da",    tag: "DA",    icon: "dashboard" },
  { id: "mlops",               label: "Predictive Analytics",       level: 7, forkColumn: "ml",    tag: "ML",    icon: "brain" },
  { id: "agentbricks",         label: "Agents",                     level: 7, forkColumn: "genai", tag: "GenAI", icon: "bot" },
  // Full-width rows resume
  { id: "data-access-control", label: "Data Access Control",        level: 8, icon: "key" },
  { id: "cicd-devops",         label: "CI/CD and DevOps",           level: 9, icon: "git-branch" },
];

export const MAX_LEVEL = 9;

export type ProgressState = "completed" | "current" | "pending";

export function getBlockState(
  block: JourneyBlock,
  currentLevel: number,
  currentForkColumn?: ForkColumn,
): ProgressState {
  if (block.level > currentLevel) return "pending";

  if (block.level < currentLevel) {
    // Full-width blocks (no fork) are always completed if below current level
    if (!block.forkColumn) return "completed";
    // If the current level is a non-fork row, all fork blocks below are completed
    const currentIsFork = JOURNEY_BLOCKS.some(
      (b) => b.level === currentLevel && b.forkColumn,
    );
    if (!currentIsFork) return "completed";
    // Fork blocks below current level: only completed if on the active track
    if (block.forkColumn === currentForkColumn) return "completed";
    return "pending";
  }

  // Same level as current
  if (!block.forkColumn) return "current";
  if (block.forkColumn === currentForkColumn) return "current";
  return "pending";
}

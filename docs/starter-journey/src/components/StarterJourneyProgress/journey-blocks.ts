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
 * The single fork row shares level 6. Levels 0-5 and 7-9 are full-width.
 */
export const JOURNEY_BLOCKS: JourneyBlock[] = [
  { id: "infra-setup",           label: "Infra Setup",                level: 0, icon: "server" },
  { id: "cost-monitoring",       label: "Cost Monitoring",            level: 1, icon: "dollar" },
  { id: "data-governance",       label: "Data Governance Strategy",   level: 2, icon: "shield" },
  { id: "access-data",           label: "Access Your Data",           level: 3, icon: "cloud-download" },
  { id: "first-pipeline",        label: "Build the First Pipeline",   level: 4, icon: "activity" },
  { id: "query-explore",         label: "Query and Explore",          level: 5, icon: "search" },
  // Fork row, level 6
  { id: "unified-analytics",     label: "Unified Analytics",          level: 6, forkColumn: "da",    tag: "DA",  icon: "grid" },
  { id: "predictive-analytics",  label: "Predictive Analytics",       level: 6, forkColumn: "ml",    tag: "ML",  icon: "cpu" },
  { id: "agents",                label: "Agents",                     level: 6, forkColumn: "genai", tag: "AI",  icon: "bot" },
  // Full-width rows resume
  { id: "automation",            label: "Automation & Orchestration", level: 7, icon: "settings" },
  { id: "data-access-control",   label: "Data Access Control",        level: 8, icon: "key" },
  { id: "cicd-devops",           label: "CI/CD and DevOps",           level: 9, icon: "git-branch" },
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
    if (!block.forkColumn) return "completed";
    const currentIsFork = JOURNEY_BLOCKS.some(
      (b) => b.level === currentLevel && b.forkColumn,
    );
    if (!currentIsFork) return "completed";
    if (block.forkColumn === currentForkColumn) return "completed";
    return "pending";
  }

  // Same level as current
  if (!block.forkColumn) return "current";
  if (block.forkColumn === currentForkColumn) return "current";
  return "pending";
}

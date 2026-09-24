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

export const JOURNEY_BLOCKS: JourneyBlock[] = [
  { id: "introduction", label: "Introduction", level: 0, icon: "grid" },
  { id: "account-workspaces", label: "Account and workspaces", level: 1, icon: "server" },
  { id: "data-access-etl", label: "Data access and ETL", level: 2, icon: "activity" },
  { id: "governance", label: "Governance", level: 3, icon: "shield" },
  { id: "genie-ontology", label: "Genie Ontology", level: 4, icon: "bot" },
  { id: "data-science", label: "Data science", level: 5, icon: "cpu" },
  { id: "operations", label: "Operations and CI/CD", level: 6, icon: "git-branch" },
];

export const MAX_LEVEL = 6;

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

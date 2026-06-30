import React from 'react';
import clsx from 'clsx';
import {
  JOURNEY_BLOCKS,
  getBlockState,
  type ForkColumn,
  type JourneyBlock,
  type ProgressState,
} from './journey-blocks';
import { BLOCK_ICONS } from './icons';
import styles from './styles.module.css';

const ENV_BADGES = [
  { label: 'DEV', cls: styles.envDev },
  { label: 'STG', cls: styles.envStg },
  { label: 'PRD', cls: styles.envPrd },
] as const;

const STATE_CLASS: Record<ProgressState, string> = {
  completed: styles.completed,
  current: styles.current,
  pending: styles.pending,
};

const TRACK_CLASS: Record<ForkColumn, string> = {
  da: styles.trackDa,
  ml: styles.trackMl,
  genai: styles.trackAi,
};

interface BlockRowProps {
  block: JourneyBlock;
  state: ProgressState;
  isFoundation?: boolean;
  index: number;
}

function BlockRow({ block, state, isFoundation, index }: BlockRowProps) {
  return (
    <div
      className={clsx(
        styles.block,
        STATE_CLASS[state],
        block.forkColumn && TRACK_CLASS[block.forkColumn],
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {block.forkColumn && <span className={styles.accent} />}

      <span className={styles.icon}>{BLOCK_ICONS[block.icon]}</span>
      <span className={styles.label}>{block.label}</span>

      {isFoundation && (
        <span className={styles.envBadges}>
          {ENV_BADGES.map((env) => (
            <span key={env.label} className={clsx(styles.envBadge, env.cls)}>
              {env.label}
            </span>
          ))}
        </span>
      )}

      {block.tag && !isFoundation && <span className={styles.tag}>{block.tag}</span>}

      {state === 'completed' && (
        <svg
          className={styles.check}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      {state === 'current' && <span className={styles.currentDot} />}
    </div>
  );
}

function MergeConnector() {
  return (
    <div className={styles.merge} aria-hidden="true">
      <span className={styles.mTop} />
      <span className={styles.mLeft} />
      <span className={styles.mCenter} />
      <span className={styles.mRight} />
      <span className={styles.mStem} />
      <span className={styles.mArrow}>
        <svg width="13" height="11" viewBox="0 0 13 11" fill="currentColor">
          <path d="M6.5 0 13 11 0 11Z" />
        </svg>
      </span>
    </div>
  );
}

const SPLIT_COLS = ['colDa', 'colMl', 'colAi'] as const;

function SplitConnector({ colorful }: { colorful: boolean }) {
  const style = {
    '--sj-arr-da': colorful ? 'var(--sj-track-da)' : 'var(--sj-connector)',
    '--sj-arr-ml': colorful ? 'var(--sj-track-ml)' : 'var(--sj-connector)',
    '--sj-arr-ai': colorful ? 'var(--sj-track-ai)' : 'var(--sj-connector)',
  } as React.CSSProperties;

  return (
    <div className={styles.split} style={style} aria-hidden="true">
      <span className={styles.sTop} />
      <span className={styles.sCenter} />
      {SPLIT_COLS.map((col) => (
        <React.Fragment key={col}>
          <span className={clsx(styles.sBar, styles[col])} />
          <span className={clsx(styles.sArrow, styles[col])}>
            <svg width="14" height="12" viewBox="0 0 14 12" fill="currentColor">
              <path d="M7 0 14 12 0 12Z" />
            </svg>
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

export interface StarterJourneyProgressProps {
  currentLevel?: number;
  currentForkColumn?: ForkColumn;
  showTitle?: boolean;
  showLegend?: boolean;
  colorfulArrows?: boolean;
  title?: string;
  className?: string;
}

export default function StarterJourneyProgress({
  currentLevel = 1,
  currentForkColumn,
  showTitle = true,
  showLegend = true,
  colorfulArrows = true,
  title = 'Starter Journey Progress',
  className,
}: StarterJourneyProgressProps) {
  const forkBlocks = JOURNEY_BLOCKS.filter((b) => b.level === 6);
  const upperBlocks = JOURNEY_BLOCKS.filter((b) => b.level >= 7).sort(
    (a, b) => b.level - a.level,
  );
  const lowerBlocks = JOURNEY_BLOCKS.filter((b) => b.level <= 5).sort(
    (a, b) => b.level - a.level,
  );

  let rowIndex = 0;
  const renderBlock = (block: JourneyBlock) => (
    <BlockRow
      key={block.id}
      block={block}
      state={getBlockState(block, currentLevel, currentForkColumn)}
      isFoundation={block.level === 0}
      index={rowIndex++}
    />
  );

  return (
    <section className={clsx(styles.root, className)} aria-label={title}>
      {showTitle && <h3 className={styles.title}>{title}</h3>}

      <div className={styles.stack}>
        {upperBlocks.map(renderBlock)}

        <MergeConnector />

        <div className={styles.fork}>{forkBlocks.map(renderBlock)}</div>

        <SplitConnector colorful={colorfulArrows} />

        {lowerBlocks.map(renderBlock)}
      </div>

      {showLegend && (
        <div className={styles.legend}>
          <span className={clsx(styles.legendItem, styles.completed)}>
            <span className={styles.legendSwatch} /> Completed
          </span>
          <span className={clsx(styles.legendItem, styles.current)}>
            <span className={styles.legendSwatch} /> Current
          </span>
          <span className={clsx(styles.legendItem, styles.pending)}>
            <span className={styles.legendSwatch} /> Pending
          </span>
        </div>
      )}
    </section>
  );
}

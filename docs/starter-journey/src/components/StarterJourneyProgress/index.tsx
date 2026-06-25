// src/components/StarterJourneyProgress/index.tsx
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

const ENV_BADGES = ['DEV', 'STG', 'PRD'] as const;
const ENV_VARS = ['--sj-dev', '--sj-staging', '--sj-prod'] as const;

const STATE_CLASS: Record<ProgressState, string> = {
  completed: styles.completed,
  current: styles.current,
  pending: styles.pending,
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
      className={clsx(styles.block, STATE_CLASS[state], isFoundation && styles.foundation)}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <span className={styles.icon}>{BLOCK_ICONS[block.icon]}</span>
      <span className={styles.label}>{block.label}</span>

      {isFoundation && (
        <span className={styles.envBadges}>
          {ENV_BADGES.map((env, i) => (
            <span
              key={env}
              className={styles.envBadge}
              style={{ '--sj-env': `var(${ENV_VARS[i]})` } as React.CSSProperties}
            >
              {env}
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

export interface StarterJourneyProgressProps {
  currentLevel?: number;
  currentForkColumn?: ForkColumn;
  showTitle?: boolean;
  showLegend?: boolean;
  title?: string;
  className?: string;
}

export default function StarterJourneyProgress({
  currentLevel = 1,
  currentForkColumn,
  showTitle = true,
  showLegend = true,
  title = 'Starter Journey Progress',
  className,
}: StarterJourneyProgressProps) {
  const levels = Array.from(new Set(JOURNEY_BLOCKS.map((b) => b.level))).sort((a, b) => a - b);

  let rowIndex = 0;
  return (
    <section className={clsx(styles.root, className)} aria-label={title}>
      {showTitle && <h3 className={styles.title}>{title}</h3>}

      <div className={styles.stack}>
        {levels.map((level) => {
          const blocksAtLevel = JOURNEY_BLOCKS.filter((b) => b.level === level);
          const isFork = blocksAtLevel.length > 1;
          const isFoundation = level === 0;

          if (isFork) {
            return (
              <div key={level} className={styles.fork}>
                {blocksAtLevel.map((block) => (
                  <BlockRow
                    key={block.id}
                    block={block}
                    state={getBlockState(block, currentLevel, currentForkColumn)}
                    index={rowIndex++}
                  />
                ))}
              </div>
            );
          }

          const block = blocksAtLevel[0];
          return (
            <BlockRow
              key={block.id}
              block={block}
              state={getBlockState(block, currentLevel, currentForkColumn)}
              isFoundation={isFoundation}
              index={rowIndex++}
            />
          );
        })}
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

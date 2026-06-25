// src/pages/journey-sandbox.tsx
import React from 'react';
import Layout from '@theme/Layout';
import StarterJourneyProgress from '@site/src/components/StarterJourneyProgress';
import type { ForkColumn } from '@site/src/components/StarterJourneyProgress/journey-blocks';

interface SandboxState {
  title: string;
  currentLevel: number;
  currentForkColumn?: ForkColumn;
}

const STATES: SandboxState[] = [
  { title: 'Level 1 · Cost Monitoring (DE) — early progress', currentLevel: 1 },
  { title: 'Level 4 · Build the First Pipeline (DE)', currentLevel: 4 },
  { title: 'Level 6 · ML fork · Feature Store (current)', currentLevel: 6, currentForkColumn: 'ml' },
  { title: 'Level 7 · GenAI fork · Agents (current)', currentLevel: 7, currentForkColumn: 'genai' },
  { title: 'Level 7 · DA fork · Unified Analytics (current)', currentLevel: 7, currentForkColumn: 'da' },
  { title: 'Level 9 · CI/CD — journey complete', currentLevel: 9 },
];

export default function JourneySandbox(): React.ReactElement {
  return (
    <Layout
      title="Journey Sandbox"
      description="Preview of the Starter Journey progress component"
    >
      <main className="container margin-vert--lg">
        <h1>Starter Journey Progress — Sandbox</h1>
        <p>
          Toggle the site light/dark switch (top-right) to verify both themes. Each card below
          renders the component with a different <code>currentLevel</code> /{' '}
          <code>currentForkColumn</code>. Verify that blocks below the current level are{' '}
          <strong>completed</strong> (green, checkmark), the current block is{' '}
          <strong>highlighted</strong> (blue, glowing dot), and blocks above are{' '}
          <strong>pending</strong> (grey). On a fork level, only the active track column should be
          current/completed; the other two columns should be pending.
        </p>

        {STATES.map((s) => (
          <div
            key={s.title}
            style={{
              marginBottom: '3rem',
              borderTop: '1px solid var(--ifm-color-emphasis-300)',
              paddingTop: '1.5rem',
            }}
          >
            <h2 style={{ fontSize: '1rem', color: 'var(--ifm-color-emphasis-700)' }}>{s.title}</h2>
            <StarterJourneyProgress
              currentLevel={s.currentLevel}
              currentForkColumn={s.currentForkColumn}
              showTitle={false}
            />
          </div>
        ))}
      </main>
    </Layout>
  );
}

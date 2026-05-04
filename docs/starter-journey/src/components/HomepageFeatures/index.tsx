import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Built by Bricksters',
    image: require('@site/static/img/build-by-bricksters.webp').default,
    description: (
      <>
        Skip the guesswork - Get the "insider playbook" built by Databricks employees who have guided hundres of global customers to success.
      </>
    ),
  },
  {
    title: 'Your First Chapter',
    image: require('@site/static/img/your-first-chapter.webp').default,
    description: (
      <>
        No Experience Required - Master the platform through simple storytelling. We've traded jargon for a clear, step-by-step path that anyone can follow.
      </>
    ),
  },
  {
    title: 'Accelerate to win',
    image: require('@site/static/img/accelerate-to-win.webp').default,
    description: (
      <>
        Don't get stuck in setup. Use our optimized resources to launch use cases faster and drive organizational value immediately.
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureImageWrapper}>
          <img className={styles.featureImg} src={image} alt={title} role="img" />
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

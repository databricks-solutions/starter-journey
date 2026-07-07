import type {ReactNode} from 'react';
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
        Written by Databricks employees who have set up hundreds of customer accounts.
      </>
    ),
  },
  {
    title: 'Your First Chapter',
    image: require('@site/static/img/your-first-chapter.webp').default,
    description: (
      <>
        No prior Databricks experience needed. The content is in order and easy to follow if you're new to Databricks.
      </>
    ),
  },
  {
    title: 'Past the Setup Wall',
    image: require('@site/static/img/accelerate-to-win.webp').default,
    description: (
      <>
        Start with an empty account. Finish with a DevOps and CI/CD-ready Databricks project your team can build on.
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className="col col--4">
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

import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HeaderAnimation from '@site/src/components/HeaderAnimation';
import Heading from '@theme/Heading';
import {useColorMode} from '@docusaurus/theme-common';

import styles from './index.module.css';

function HomepageHero() {
  const {siteConfig} = useDocusaurusContext();
  const {colorMode} = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  return (
    <section className={styles.heroSection}>
      <HeaderAnimation isDarkMode={isDarkTheme} />
      <div className={styles.heroOverlay}>
        <div className={styles.heroText}>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/01-get-started">
              Start the Journey →
            </Link>
          </div>
        </div>
        <div className={styles.heroFeatures}>
          <HomepageFeatures />
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHero />
    </Layout>
  );
}

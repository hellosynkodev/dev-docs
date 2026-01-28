import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/dev-docs/docs/javascript/">
            📚 Documentação JavaScript
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/dev-docs/docs/intro">
            ⏱️ Tutorial - 5min
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const history = useHistory();

  useEffect(() => {
    // Redirecionar para documentação JavaScript após 2 segundos
    const timer = setTimeout(() => {
      history.push('/dev-docs/docs/javascript/');
    }, 2000);
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Referência técnica completa de JavaScript com exemplos práticos">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

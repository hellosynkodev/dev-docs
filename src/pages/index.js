import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)} style={{background: 'linear-gradient(135deg, #3ecc5f 0%, #1f8f3a 100%)'}}>
      <div className="container">
        <Heading as="h1" className="hero__title" style={{color: '#fff', fontSize: '3.5rem', fontWeight: '900'}}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle" style={{color: '#f0f0f0', fontSize: '1.3rem', fontWeight: '300'}}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--lg"
            to="/dev-docs/docs/javascript/"
            style={{backgroundColor: '#fff', color: '#1f8f3a', borderColor: '#fff', fontWeight: 'bold'}}>
            📚 Explorar Documentação
          </Link>
          <Link
            className="button button--outline button--lg"
            href="https://github.com/hellosynkodev"
            target="_blank"
            rel="noopener noreferrer"
            style={{borderColor: '#fff', color: '#fff', fontWeight: 'bold'}}>
            💻 Ver no GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function AboutSection() {
  return (
    <section style={{backgroundColor: '#f9f9f9', padding: '60px 20px'}}>
      <div className="container">
        <div style={{display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap'}}>
          <div style={{flex: 1, minWidth: '300px'}}>
            <Heading as="h2" style={{color: '#1f8f3a', marginBottom: '20px'}}>
              Sobre Esta Documentação
            </Heading>
            <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: '#333', marginBottom: '15px'}}>
              Uma referência técnica <strong>completa e prática</strong> de JavaScript, criada para desenvolvedores que buscam dominar a linguagem com <strong>exemplos reais</strong> e <strong>explicações diretas</strong>.
            </p>
            <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: '#333', marginBottom: '15px'}}>
              Cada tópico foi cuidadosamente estruturado com <strong>145+ exemplos de código</strong> cobrindo desde conceitos fundamentais até tópicos avançados como programação assíncrona e POO.
            </p>
            <p style={{fontSize: '1.1rem', lineHeight: '1.8', color: '#555'}}>
              Desenvolvido com foco em <strong>clareza</strong> e <strong>aplicação prática</strong>.
            </p>
          </div>
          <div style={{flex: 1, minWidth: '300px', backgroundColor: '#3ecc5f', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(62, 204, 95, 0.2)'}}>
            <Heading as="h3" style={{color: '#fff', marginBottom: '15px'}}>
              🚀 Comunidade & Contribuição
            </Heading>
            <p style={{color: '#fff', marginBottom: '15px', fontSize: '1rem'}}>
              Encontre mais projetos, siga meus trabalhos e contribua no GitHub.
            </p>
            <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
              <a href="https://github.com/hellosynkodev" target="_blank" rel="noopener noreferrer" 
                 style={{padding: '10px 20px', backgroundColor: '#fff', color: '#3ecc5f', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', border: 'none', cursor: 'pointer'}}>
                GitHub Repos
              </a>
              <a href="https://github.com/hellosynkodev/dev-docs" target="_blank" rel="noopener noreferrer"
                 style={{padding: '10px 20px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', border: '1px solid #fff', cursor: 'pointer'}}>
                Este Projeto
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const history = useHistory();

  useEffect(() => {
    // Redirecionar para documentação JavaScript após 3 segundos
    const timer = setTimeout(() => {
      history.push('/dev-docs/docs/javascript/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Referência técnica completa de JavaScript com exemplos práticos">
      <HomepageHeader />
      <main>
        <AboutSection />
      </main>
    </Layout>
  );
}

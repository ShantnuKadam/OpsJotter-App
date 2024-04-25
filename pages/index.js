import Head from 'next/head';
import styles from '../styles/Home.module.css';
// import Dashboard from './post/home';
import { SessionProvider } from 'next-auth/react';
import LoginPage from './login';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Opsjotter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider>
      <LoginPage/>
      </SessionProvider>
      
    </div>
  );
}

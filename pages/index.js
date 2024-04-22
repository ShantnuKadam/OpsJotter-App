import Head from 'next/head';
import styles from '../styles/Home.module.css';
// import Dashboard from './post/home';
import LoginPage from './login';
import { SessionProvider } from 'next-auth/react';

export default function Home({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SessionProvider>
      <LoginPage/>
      </SessionProvider>

    </div>
  );
}

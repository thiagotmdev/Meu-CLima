import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Clima } from '../../components/Clima';



export default function Home() {
  return (
    <>
    <Head>
      <title>Meu Clima</title>
      <meta name="author" content="Thiago Mendes - Arckmake Studio"/>
      <meta name="keywords" content="HTML, CSS, JavaScript, NextJS, ReactJS, Axios"/>
      <meta name="description" content="Aplicação feita em NextJS, que mostra os dados do clima no dia na cidade pesquisada" />
      <meta charSet="UTF-8"/>
    </Head>
      <div className={styles.container}>
        <header>
          <h1 className={styles.title}>Meu Clima</h1>
        </header>
        <section>
          <Clima />
        </section>
      </div>
    </>
  )
}

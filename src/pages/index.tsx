import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { Clima } from '../../components/Clima';



export default function Home() {
  return (
    <>
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

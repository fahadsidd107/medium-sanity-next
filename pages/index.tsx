import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <Header/>

     <div>

<div>Medium is place to write, read and connect</div>

<div></div>

     </div>
    </div>
  )
}

export default Home

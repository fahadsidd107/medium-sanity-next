import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Image from "next/image";
import Logo from "../assets/medium.png";
import { sanityClient,urlFor } from "../sanity";
import {Post} from "../typings"
import { copyFileSync } from "fs";


interface Props{
  posts:[Post]
}

const Home: any = ({posts}:Props) => {
console.log(posts)
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-decoration decoration-4">
              Medium
            </span>{" "}
            is place to write,read and connect
          </h1>
          <h2>
            It's easy free to post your thinking on any topic and connect wit
            millions of readers
          </h2>
        </div>

        <Image
          className="hidden md:inline-flex h-32 lg:h-full"
          src={Logo}
          alt="logo"
        />
      </div>

      {/* Post */}
    </div>
  );
};

export const getServerSideProps = async () => {
  const qeury = `*[_type=="post"]{
    _id,
    title,
    author->{
    name,
    image
  },
  description,
  mainImage,
  slug
    
  }`;

  const posts = await sanityClient.fetch(qeury)
};

export default Home;

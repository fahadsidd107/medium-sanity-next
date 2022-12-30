import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Image from "next/image";
import Logo from "../assets/medium.png";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";
import { copyFileSync } from "fs";
import Link from "next/link";

interface Props {
  posts: [Post];
}

const Home: any = ({ posts }: Props) => {
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
            It's easy free to post your thinking on any topic and connect with
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:pd-6">
        {posts.map((post) => (
          <Link key={post._id} href={`post/${post.slug.current}`}>
            <div className="border rounded-lg group cursor-pointer overflow-hidden">
              {post.mainImage && (
                <img
                  className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                  src={urlFor(post.mainImage).url()}
                  alt={post.title}
                />
              )}
            </div>
            <div className="flex justify-between p-5 bg-white">
              <div>
                <p className="text-lg font-bold">{post.title}</p>
                <p className="text-xs">
                  {post.description} by {post.author.name}
                </p>
              </div>
              <div>
                {post.author.image && (
                  <img
                    className="h-12 w-12 rounded-full"
                    src={urlFor(post.author.image).url()!}
                    alt={post.author.name}
                  />
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Post */}
    </div>
  );
};

export const getServerSideProps: any = async () => {
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

  const posts = await sanityClient.fetch(qeury);

  return {
    props: {
      posts,
    },
  };
};

export default Home;

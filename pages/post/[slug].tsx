import React from "react";
import { sanityClient, urlFor } from "../../sanity";
import Header from "../../components/Header";
import { Post } from "../../typings";
import { GetStaticProps } from "next";
function Post() {
  return (
    <main>
      <Header />
    </main>
  );
}

export default Post;

export const getSaticPaths = async () => {
  const qeury = `*[_type=="post"]{
  _id,
  slug{
  current
}
}`;

  const posts = await sanityClient.fetch(qeury);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const qeury = `*[_type=="post" && slug.current == $slug][0]{
  _id,
  _createdAt,
  author->{
  name,
  image
},
description,
mainImage,
slug,
body
}`;

  const posts = await sanityClient.fetch(qeury, {
    slug: params?.slug,
  });

  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts,
    },
  };
};

// "comments" : *[
//   _type == "comments" &&
//   post._ref == ^._id  &&
//   approved == true],

import React from "react";
import { sanityClient, urlFor } from "../../sanity";
import Header from "../../components/Header";
import { Post } from "../../typings";
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
  fallback:"blocking",
}
};

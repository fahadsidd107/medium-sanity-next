import React from "react";
import { sanityClient, urlFor } from "../../sanity";
import Header from "../../components/Header";
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

};

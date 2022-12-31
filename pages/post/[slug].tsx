import { sanityClient, urlFor } from "../../sanity";
import Header from "../../components/Header";
import { Post } from "../../typings";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  console.log(post._createdAt);
  return (
    <main>
      <Header />
      <img
        className="w-full h-40 object-cover"
        src={urlFor(post.mainImage).url()!}
      />
      <article>
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">{post.description}</h2>
        <div>
          <img src="" alt=""/>
        </div>
      </article>
    </main>
  );
}
export default Post;

export const getSaticPaths: any = async () => {
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
  const qeury = `*[_type=="post" && slug.current == "$slug"][0]{
    _id,
    _createdAt,
    title,
    author->{
    name,
    image
  },
  "comments" : *[
    _type == "comments" &&
    post._ref == ^._id  &&
    approved == true],
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
    revalidate: 60, //after seconds
  };
};

import { sanityClient, urlFor } from "../../sanity";
import Header from "../../components/Header";
import { Post } from "../../typings";
import { GetStaticPaths, GetStaticProps } from "next";
import PortableText from "react-portable-text";

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
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
          <p className="font-extralight">
            Blog Post By{" "}
            <span className="text-green-600">{post.author.name} </span>-
            Puslished at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h1 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>
      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />

      <form>
        <div className="flex flex-col p-5 max-w-2xl mx-auto mb-10">
          <h3 className="text-sm text-yellow-500">Enjoyed the article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below</h4>
          <label>
            <span>Name</span>
            <input placeholder="Muhammad Fahad Siddiqui" type="text" />
          </label>
          <label>
            <span>Email</span>
            <input placeholder="fsiddiqui107@gmail.com" type="email" />
          </label>
          <label>
            <span>Comment</span>
            <textarea placeholder="Muhammad Fahad Siddiqui" rows={8} />
          </label>
        </div>
      </form>
    </main>
  );
}
export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `*[_type == "post"] {
    "params": { "slug": slug.current }
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: { params: { slug: string } }) => ({
    params: post.params,
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.slug) {
    return { notFound: true };
  }

  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author->{
      name,
      image
    },
    "comments": *[ _type == "comment" && post._ref == ^._id && approved == true],
    description,
    mainImage,
    slug,
    body
  }`;

  const post = await sanityClient.fetch<Post>(query, { slug: params.slug });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

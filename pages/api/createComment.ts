// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

 const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "vsjmslk9",
    useCdn: process.env.NODE_ENV === "production",
    token : process.env.NEXT_PUBLIC_SANITY_API_TOKEN || ""
  };

type Data = {
  name: string;
};

export default function createComment(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name:"Muhammad Fahad Siddiqui" });
}
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@sanity/client";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "vsjmslk9",
  useCdn: process.env.NODE_ENV === "production",
  token:
    process.env.NEXT_PUBLIC_SANITY_API_TOKEN ||
    "skPMdMRT0Fru6tr4qkNCsckFmTAqMIXjBHyMi8jGMLFwCkK6MtifwLaJ283HXhboGlZx8cW1GFdKTC3hIRF54jtyOH2mvZBwYV3DXWIVLs2f3LIREQk2K68j0COQOPE9icc8fB1Ir261FUyIAgO8OZoggw9UGGN6yOTclEtOh3Ua5y2efpCo",
};

type Data = {
  message: string;
};

const client = createClient(config);

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { _id, name, email, comment } = JSON.parse(req.body);
  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
    });
  } catch (err) {
    return res.status(500).json({ message: "Unable to create comment." });
  }
  console.log("Comment created");
  return res.status(200).json({ message: "Comment Submitted " });
}

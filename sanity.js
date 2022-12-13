import {
  createImageUrlBuilder,
  createCurrentUserHook,
  createClient,
} from "next-sanity";


console.log(process.env.NEXT_PUBLIC_PROJECT_ID)
export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  // projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  projectId:'vsjmslk9',
  appVersion: "21-03-25",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);
export const urlFor = (source) => createImageUrlBuilder(config).image(source);
export const useCurrentUser = createCurrentUserHook(config);

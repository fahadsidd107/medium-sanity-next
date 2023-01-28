export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "approve",
      title: "Approve",
      type: "boolean",
      description: "comment wont show untill you approve it",
    },
    {
      name: "email",
      type: "string",
    },
    {
      name: "comment",
      type: "text",
    },
    {
      name: "post",

      type: "reference",
      to: { type: "post" },
    },
  ],
};

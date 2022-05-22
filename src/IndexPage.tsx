import React from "react";
import { trpc, useMatchMutate } from "./utils/trpc.ts";

export const IndexPage = () => {
  const { client } = trpc.useContext();

  const posts = trpc.useSWR(["post.get"], {});

  const matchMutate = useMatchMutate();
  return (
    <>
      <div>
        {posts.data
          ? posts.data.map((post) => {
            return <p>{post.name}</p>;
          })
          : "Loading..."}
      </div>

      <button
        onClick={async () => {
          await client.mutation("post.create", {
            name: "Post-" + Math.random(),
          });

          matchMutate("post.get");
        }}
      >
        Create Post
      </button>
    </>
  );
};

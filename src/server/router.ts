import { router } from "@trpc/server";
import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

const posts = [{
  name: "First Post",
}];

export const appRouter = router().query("hello", {
  resolve() {
    return "world";
  },
}).query("post.get", {
  resolve() {
    return posts;
  },
}).mutation("post.create", {
  input: z.object({
    name: z.string(),
  }),
  resolve({ input }) {
    posts.push(input);
    return input;
  },
});

export type AppRouter = typeof appRouter;

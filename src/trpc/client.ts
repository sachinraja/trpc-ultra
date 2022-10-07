import { httpBatchLink } from "@trpc/client";
import { trpc } from "../trpc/trpc.ts";

const getBaseUrl = () => {
  if (typeof Deno === "undefined") {
    // In the browser, we return a relative URL
    return "";
  }

  // When rendering on the server, we return an absolute URL
  // assume localhost
  return "http://localhost:8000";
};

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});

import { Application, Router } from "https://deno.land/x/oak@v10.5.1/mod.ts";
import { ultraHandler } from "https://deno.land/x/ultra@v1.0.1/src/oak/handler.ts";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./src/server/router.ts";

const port = 8000;

const router = new Router();

router.all("/api/trpc/:path", async (ctx) => {
  const trpcRes = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req:
      (ctx.request.originalRequest as unknown as { request: Request }).request,
    router: appRouter,
  });

  ctx.response.body = trpcRes.body;
  ctx.response.headers = trpcRes.headers;
  ctx.response.status = trpcRes.status;
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

// ULTRA middleware
// needs to go AFTER your custom routes
// it acts as the final catch all when no
// other route matches
app.use(ultraHandler);

console.log(`Ultra running on http://localhost:${port}`);
await app.listen({ port });

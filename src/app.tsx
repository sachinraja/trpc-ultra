import React, { useState } from "react";
import { SWRConfig } from "swr";
import { Helmet } from "react-helmet";
import { Route, Switch } from "wouter";
import ultraCache from "ultra/cache";
import { Cache } from "https://deno.land/x/ultra@v1.0.1/src/types.ts";
import { trpc } from "./utils/trpc.ts";
import { createTRPCClient } from "@trpc/client";
import { IndexPage } from "./IndexPage.tsx";

const options = (cache: Cache) => ({
  provider: () => ultraCache(cache),
  suspense: true,
  revalidateOnMount: false,
});

const Ultra = ({ cache }: { cache: Cache }) => {
  const [client] = useState(() =>
    createTRPCClient({ url: "http://localhost:8000/api/trpc" })
  );

  return (
    <SWRConfig value={options(cache)}>
      <trpc.TRPCProvider client={client}>
        <Helmet>
          <title>Ultra</title>
        </Helmet>

        <main>
          <Switch>
            <Route path="/">
              <IndexPage />
            </Route>
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
        </main>
      </trpc.TRPCProvider>
    </SWRConfig>
  );
};

export default Ultra;

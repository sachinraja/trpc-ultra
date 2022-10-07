import hydrate from "ultra/hydrate.js";
import App from "./src/app.tsx";

// Twind
import "./src/twind/twind.ts";

import { HelmetProvider } from "react-helmet-async";
import { trpc } from "./src/trpc/trpc.ts";

// React Query
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/react-query/query-client.ts";
declare const __REACT_QUERY_DEHYDRATED_STATE: unknown;

import { trpcClient } from "./src/trpc/client.ts";

function ClientApp() {
  return (
    <HelmetProvider>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={__REACT_QUERY_DEHYDRATED_STATE}>
            <App />
          </Hydrate>
        </QueryClientProvider>
      </trpc.Provider>
    </HelmetProvider>
  );
}

hydrate(document, <ClientApp />);

import { createSWRHooks, getUseMatchMutate } from "trpc-swr";
import type { AppRouter } from "../server/router.ts";
import { TRPCClient } from "@trpc/client";

// @ts-expect-error version mismatch
export const trpc = createSWRHooks<AppRouter>();

// fix version mismatch (esm.sh does not rewrite imports in TS types)
export const useContext = trpc.useContext as unknown as () => ({
  client: TRPCClient<AppRouter>;
});

// @ts-expect-error version mismatch
export const useMatchMutate = getUseMatchMutate<AppRouter>();

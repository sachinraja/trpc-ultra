import { createSWRHooks, getUseMatchMutate } from "trpc-swr";
import type { AppRouter } from "../server/router.ts";

export const trpc = createSWRHooks<AppRouter>();

export const useMatchMutate = getUseMatchMutate<AppRouter>();

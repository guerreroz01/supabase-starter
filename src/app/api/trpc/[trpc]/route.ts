import {
  fetchRequestHandler,
  FetchCreateContextFnOptions,
} from "@trpc/server/adapters/fetch";
import { appRouter } from "../trpc-router";

const handler = async (request: Request, response: Response) => {
  console.log(`Incoming request ${request.url}`);

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: (
      opts: FetchCreateContextFnOptions
    ): object | Promise<object> => {
      return {};
    },
  });
};

export { handler as GET, handler as POST };

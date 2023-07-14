import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const t = initTRPC.create({
  transformer: superjson,
});
const prisma = new PrismaClient();

export const appRouter = t.router({
  getUsers: t.procedure.query(async ({ ctx }) => {
    const users = await prisma.user.findMany();
    return users;
  }),
  addUser: t.procedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const newUser = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
        },
      });
      return newUser;
    }),
});

export type AppRouter = typeof appRouter;

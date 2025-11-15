import { PrismaClient } from "@/app/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["warn", "error"] });

if (!globalForPrisma.prisma) {
  console.log("Prisma Client initialized");
}

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'client', 'DOCTOR');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('enCA', 'frCA');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'client',
    "language" "Language" NOT NULL DEFAULT 'enCA',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

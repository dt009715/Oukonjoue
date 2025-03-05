/*
  Warnings:

  - You are about to drop the `artists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `institutions` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ARTISTS', 'INSTITUTIONS');

-- DropTable
DROP TABLE "artists";

-- DropTable
DROP TABLE "institutions";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "artistId" INTEGER,
    "institutionId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artists" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "mail" TEXT,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institutions" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "mail" TEXT,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Institutions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_artistId_key" ON "User"("artistId");

-- CreateIndex
CREATE UNIQUE INDEX "User_institutionId_key" ON "User"("institutionId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institutions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

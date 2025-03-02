/*
  Warnings:

  - Added the required column `city` to the `institutions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institutions" ADD COLUMN     "city" TEXT NOT NULL;

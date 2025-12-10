/*
  Warnings:

  - You are about to drop the column `address` on the `Artists` table. All the data in the column will be lost.
  - Added the required column `city` to the `Artists` table without a default value. This is not possible if the table is not empty.
  - Made the column `mail` on table `Artists` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Institutions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mail` on table `Institutions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Artists" DROP COLUMN "address",
ADD COLUMN     "city" TEXT NOT NULL,
ALTER COLUMN "mail" SET NOT NULL;

-- AlterTable
ALTER TABLE "Institutions" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "mail" SET NOT NULL;

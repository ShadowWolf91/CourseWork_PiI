/*
  Warnings:

  - You are about to drop the column `timeAmount` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `timeAmount` on the `OpenQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `timeAmount` on the `Tests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "timeAmount";

-- AlterTable
ALTER TABLE "OpenQuestions" DROP COLUMN "timeAmount";

-- AlterTable
ALTER TABLE "Tests" DROP COLUMN "timeAmount";

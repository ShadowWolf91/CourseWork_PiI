/*
  Warnings:

  - You are about to drop the column `statistic_id` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `statistic_id` on the `OpenQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `statistic_id` on the `Tests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "statistic_id";

-- AlterTable
ALTER TABLE "OpenQuestions" DROP COLUMN "statistic_id";

-- AlterTable
ALTER TABLE "Tests" DROP COLUMN "statistic_id";

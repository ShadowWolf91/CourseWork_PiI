/*
  Warnings:

  - You are about to drop the column `mark` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `rightAnswered` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `questionAmount` on the `Themes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cards" ADD COLUMN     "questionAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rightAnswered" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "OpenQuestions" ADD COLUMN     "questionAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rightAnswered" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Statistics" DROP COLUMN "mark",
DROP COLUMN "rightAnswered",
DROP COLUMN "score",
ADD COLUMN     "markCard" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "markOpenQuestion" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "markTest" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scoreCard" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scoreOpenQuestion" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "scoreTest" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Tests" ADD COLUMN     "questionAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rightAnswered" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Themes" DROP COLUMN "questionAmount";

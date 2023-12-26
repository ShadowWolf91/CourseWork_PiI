/*
  Warnings:

  - You are about to drop the column `mark` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `rightAnswered` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Statistics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Statistics" DROP COLUMN "mark",
DROP COLUMN "rightAnswered",
DROP COLUMN "score",
ADD COLUMN     "markCards" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "markOpenQuestions" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "markTests" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rightAnsweredCards" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rightAnsweredOQs" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rightAnsweredTests" INTEGER NOT NULL DEFAULT 0;

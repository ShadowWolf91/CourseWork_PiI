/*
  Warnings:

  - Made the column `score` on table `Statistics` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mark` on table `Statistics` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rightAnswered` on table `Statistics` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Statistics" ALTER COLUMN "score" SET NOT NULL,
ALTER COLUMN "mark" SET NOT NULL,
ALTER COLUMN "rightAnswered" SET NOT NULL;

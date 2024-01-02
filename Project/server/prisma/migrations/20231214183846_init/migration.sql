/*
  Warnings:

  - A unique constraint covering the columns `[openQustionName]` on the table `OpenQuestions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `openQustionName` to the `OpenQuestions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OpenQuestions" ADD COLUMN     "openQustionName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OpenQuestions_openQustionName_key" ON "OpenQuestions"("openQustionName");

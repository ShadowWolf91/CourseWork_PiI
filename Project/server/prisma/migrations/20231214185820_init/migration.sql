/*
  Warnings:

  - You are about to drop the column `openQustionName` on the `OpenQuestions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[openQuestionName]` on the table `OpenQuestions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `openQuestionName` to the `OpenQuestions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "OpenQuestions_openQustionName_key";

-- AlterTable
ALTER TABLE "OpenQuestions" DROP COLUMN "openQustionName",
ADD COLUMN     "openQuestionName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OpenQuestions_openQuestionName_key" ON "OpenQuestions"("openQuestionName");

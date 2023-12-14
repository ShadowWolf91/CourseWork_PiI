/*
  Warnings:

  - A unique constraint covering the columns `[TestName]` on the table `Tests` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `TestName` to the `Tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tests" ADD COLUMN     "TestName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tests_TestName_key" ON "Tests"("TestName");

/*
  Warnings:

  - You are about to drop the column `TestName` on the `Tests` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[testName]` on the table `Tests` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `testName` to the `Tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Tests_TestName_key";

-- AlterTable
ALTER TABLE "Tests" DROP COLUMN "TestName",
ADD COLUMN     "testName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tests_testName_key" ON "Tests"("testName");

/*
  Warnings:

  - Made the column `test_id` on table `Statistics` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Statistics" ALTER COLUMN "test_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "Tests"("id_test") ON DELETE CASCADE ON UPDATE CASCADE;

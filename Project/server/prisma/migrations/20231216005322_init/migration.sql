/*
  Warnings:

  - A unique constraint covering the columns `[id_statistics]` on the table `Statistics` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Statistics" ALTER COLUMN "id_statistics" DROP DEFAULT;
DROP SEQUENCE "statistics_id_statistics_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Statistics_id_statistics_key" ON "Statistics"("id_statistics");

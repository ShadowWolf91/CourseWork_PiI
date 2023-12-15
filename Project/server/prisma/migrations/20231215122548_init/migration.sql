/*
  Warnings:

  - You are about to drop the column `card_id` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `openQuestion_id` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `test_id` on the `Statistics` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Statistics" DROP CONSTRAINT "Statistics_test_id_fkey";

-- AlterTable
ALTER TABLE "Cards" ADD COLUMN     "statistic_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "OpenQuestions" ADD COLUMN     "statistic_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Statistics" DROP COLUMN "card_id",
DROP COLUMN "openQuestion_id",
DROP COLUMN "test_id";

-- AlterTable
ALTER TABLE "Tests" ADD COLUMN     "statistic_id" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_statistic_id_fkey" FOREIGN KEY ("statistic_id") REFERENCES "Statistics"("id_statistics") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenQuestions" ADD CONSTRAINT "OpenQuestions_statistic_id_fkey" FOREIGN KEY ("statistic_id") REFERENCES "Statistics"("id_statistics") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_statistic_id_fkey" FOREIGN KEY ("statistic_id") REFERENCES "Statistics"("id_statistics") ON DELETE CASCADE ON UPDATE CASCADE;

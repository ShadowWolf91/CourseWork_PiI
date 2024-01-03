/*
  Warnings:

  - The primary key for the `Statistics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_statistics` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `markCards` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `markOpenQuestions` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `markTests` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `rightAnsweredCards` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `rightAnsweredOQs` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `rightAnsweredTests` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `questionAmount` on the `Themes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_statistic_id_fkey";

-- DropForeignKey
ALTER TABLE "OpenQuestions" DROP CONSTRAINT "OpenQuestions_statistic_id_fkey";

-- DropForeignKey
ALTER TABLE "Statistics" DROP CONSTRAINT "Statistics_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Tests" DROP CONSTRAINT "Tests_statistic_id_fkey";

-- AlterTable
ALTER TABLE "Statistics" DROP CONSTRAINT "Statistics_pkey",
DROP COLUMN "id_statistics",
DROP COLUMN "markCards",
DROP COLUMN "markOpenQuestions",
DROP COLUMN "markTests",
DROP COLUMN "rightAnsweredCards",
DROP COLUMN "rightAnsweredOQs",
DROP COLUMN "rightAnsweredTests",
DROP COLUMN "title",
DROP COLUMN "user_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "mark" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rightAnswered" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "Statistics_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Themes" DROP COLUMN "questionAmount";

-- CreateTable
CREATE TABLE "TOCSession" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "statisticId" INTEGER NOT NULL,
    "themeId" INTEGER NOT NULL,

    CONSTRAINT "TOCSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TOCSession_statisticId_key" ON "TOCSession"("statisticId");

-- AddForeignKey
ALTER TABLE "TOCSession" ADD CONSTRAINT "TOCSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TOCSession" ADD CONSTRAINT "TOCSession_statisticId_fkey" FOREIGN KEY ("statisticId") REFERENCES "Statistics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

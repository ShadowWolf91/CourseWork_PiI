/*
  Warnings:

  - A unique constraint covering the columns `[cardName]` on the table `Cards` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cardName` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cards" ADD COLUMN     "cardName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cards_cardName_key" ON "Cards"("cardName");

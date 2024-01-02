/*
  Warnings:

  - The primary key for the `OpenQuestions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_openQustion` on the `OpenQuestions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OpenQuestions" DROP CONSTRAINT "OpenQuestions_pkey",
DROP COLUMN "id_openQustion",
ADD COLUMN     "id_openQuestion" SERIAL NOT NULL,
ADD CONSTRAINT "OpenQuestions_pkey" PRIMARY KEY ("id_openQuestion");

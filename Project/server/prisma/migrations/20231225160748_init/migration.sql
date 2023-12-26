/*
  Warnings:

  - The primary key for the `Cards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `correctAnswer` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `id_card` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `rightAnswered` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `word` on the `Cards` table. All the data in the column will be lost.
  - The primary key for the `OpenQuestions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `correctAnswer` on the `OpenQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `id_openQuestion` on the `OpenQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `OpenQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `rightAnswered` on the `OpenQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `scoreCard` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `scoreOpenQuestion` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `scoreTest` on the `Statistics` table. All the data in the column will be lost.
  - The primary key for the `Tests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `correctAnswer` on the `Tests` table. All the data in the column will be lost.
  - You are about to drop the column `id_test` on the `Tests` table. All the data in the column will be lost.
  - You are about to drop the column `optionA` on the `Tests` table. All the data in the column will be lost.
  - You are about to drop the column `optionB` on the `Tests` table. All the data in the column will be lost.
  - You are about to drop the column `optionC` on the `Tests` table. All the data in the column will be lost.
  - You are about to drop the column `optionD` on the `Tests` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `Tests` table. All the data in the column will be lost.
  - You are about to drop the column `rightAnswered` on the `Tests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_pkey",
DROP COLUMN "correctAnswer",
DROP COLUMN "id_card",
DROP COLUMN "rightAnswered",
DROP COLUMN "word",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "questionAmount" DROP DEFAULT,
ADD CONSTRAINT "Cards_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OpenQuestions" DROP CONSTRAINT "OpenQuestions_pkey",
DROP COLUMN "correctAnswer",
DROP COLUMN "id_openQuestion",
DROP COLUMN "question",
DROP COLUMN "rightAnswered",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "questionAmount" DROP DEFAULT,
ADD CONSTRAINT "OpenQuestions_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Statistics" DROP COLUMN "scoreCard",
DROP COLUMN "scoreOpenQuestion",
DROP COLUMN "scoreTest",
ADD COLUMN     "rightAnsweredCard" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rightAnsweredOQ" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rightAnsweredTest" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Tests" DROP CONSTRAINT "Tests_pkey",
DROP COLUMN "correctAnswer",
DROP COLUMN "id_test",
DROP COLUMN "optionA",
DROP COLUMN "optionB",
DROP COLUMN "optionC",
DROP COLUMN "optionD",
DROP COLUMN "question",
DROP COLUMN "rightAnswered",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "questionAmount" DROP DEFAULT,
ADD CONSTRAINT "Tests_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Test" (
    "id_test" SERIAL NOT NULL,
    "tests_id" INTEGER NOT NULL,
    "question" VARCHAR(200) NOT NULL,
    "optionA" VARCHAR(50) NOT NULL,
    "optionB" VARCHAR(50) NOT NULL,
    "optionC" VARCHAR(50) NOT NULL,
    "optionD" VARCHAR(50) NOT NULL,
    "correctAnswer" VARCHAR(50) NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id_test")
);

-- CreateTable
CREATE TABLE "OpenQuestion" (
    "id_openQuestion" SERIAL NOT NULL,
    "openQuestion_id" INTEGER NOT NULL,
    "question" VARCHAR(200) NOT NULL,
    "correctAnswer" VARCHAR(50) NOT NULL,

    CONSTRAINT "OpenQuestion_pkey" PRIMARY KEY ("id_openQuestion")
);

-- CreateTable
CREATE TABLE "Card" (
    "id_card" SERIAL NOT NULL,
    "card_id" INTEGER NOT NULL,
    "word" VARCHAR(50) NOT NULL,
    "correctAnswer" VARCHAR(50) NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id_card")
);

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_id_test_fkey" FOREIGN KEY ("id_test") REFERENCES "Tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenQuestion" ADD CONSTRAINT "OpenQuestion_openQuestion_id_fkey" FOREIGN KEY ("openQuestion_id") REFERENCES "OpenQuestions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

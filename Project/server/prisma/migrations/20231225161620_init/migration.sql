/*
  Warnings:

  - The primary key for the `Cards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `questionAmount` on the `Cards` table. All the data in the column will be lost.
  - The primary key for the `OpenQuestions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OpenQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `questionAmount` on the `OpenQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `markCard` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `markOpenQuestion` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `markTest` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `rightAnsweredCard` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `rightAnsweredOQ` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `rightAnsweredTest` on the `Statistics` table. All the data in the column will be lost.
  - The primary key for the `Tests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tests` table. All the data in the column will be lost.
  - You are about to drop the column `questionAmount` on the `Tests` table. All the data in the column will be lost.
  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpenQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `correctAnswer` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `word` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correctAnswer` to the `OpenQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `OpenQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correctAnswer` to the `Tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionA` to the `Tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionB` to the `Tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionC` to the `Tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionD` to the `Tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_card_id_fkey";

-- DropForeignKey
ALTER TABLE "OpenQuestion" DROP CONSTRAINT "OpenQuestion_openQuestion_id_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_id_test_fkey";

-- AlterTable
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_pkey",
DROP COLUMN "id",
DROP COLUMN "questionAmount",
ADD COLUMN     "correctAnswer" VARCHAR(50) NOT NULL,
ADD COLUMN     "id_card" SERIAL NOT NULL,
ADD COLUMN     "word" VARCHAR(50) NOT NULL,
ADD CONSTRAINT "Cards_pkey" PRIMARY KEY ("id_card");

-- AlterTable
ALTER TABLE "OpenQuestions" DROP CONSTRAINT "OpenQuestions_pkey",
DROP COLUMN "id",
DROP COLUMN "questionAmount",
ADD COLUMN     "correctAnswer" VARCHAR(50) NOT NULL,
ADD COLUMN     "id_openQuestion" SERIAL NOT NULL,
ADD COLUMN     "question" VARCHAR(200) NOT NULL,
ADD CONSTRAINT "OpenQuestions_pkey" PRIMARY KEY ("id_openQuestion");

-- AlterTable
ALTER TABLE "Statistics" DROP COLUMN "markCard",
DROP COLUMN "markOpenQuestion",
DROP COLUMN "markTest",
DROP COLUMN "rightAnsweredCard",
DROP COLUMN "rightAnsweredOQ",
DROP COLUMN "rightAnsweredTest",
ADD COLUMN     "mark" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rightAnswered" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Tests" DROP CONSTRAINT "Tests_pkey",
DROP COLUMN "id",
DROP COLUMN "questionAmount",
ADD COLUMN     "correctAnswer" VARCHAR(50) NOT NULL,
ADD COLUMN     "id_test" SERIAL NOT NULL,
ADD COLUMN     "optionA" VARCHAR(50) NOT NULL,
ADD COLUMN     "optionB" VARCHAR(50) NOT NULL,
ADD COLUMN     "optionC" VARCHAR(50) NOT NULL,
ADD COLUMN     "optionD" VARCHAR(50) NOT NULL,
ADD COLUMN     "question" VARCHAR(200) NOT NULL,
ADD CONSTRAINT "Tests_pkey" PRIMARY KEY ("id_test");

-- AlterTable
ALTER TABLE "Themes" ADD COLUMN     "questionAmount" INTEGER NOT NULL DEFAULT 10;

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "OpenQuestion";

-- DropTable
DROP TABLE "Test";

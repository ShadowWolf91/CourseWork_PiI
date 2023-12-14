/*
  Warnings:

  - The primary key for the `Cards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `card_id` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `id_Cs` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `mode_id` on the `Cards` table. All the data in the column will be lost.
  - The primary key for the `OpenQuestions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_OQs` on the `OpenQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `mode_id` on the `OpenQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `openQuestion_id` on the `OpenQuestions` table. All the data in the column will be lost.
  - The primary key for the `Tests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_Ts` on the `Tests` table. All the data in the column will be lost.
  - You are about to drop the column `mode_id` on the `Tests` table. All the data in the column will be lost.
  - You are about to drop the column `test_id` on the `Tests` table. All the data in the column will be lost.
  - You are about to drop the `Card` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpenQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `correctAnswer` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme_id` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeAmount` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `word` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correctAnswer` to the `OpenQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `OpenQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme_id` to the `OpenQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeAmount` to the `OpenQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correctAnswer` to the `Tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionA` to the `Tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionB` to the `Tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionC` to the `Tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `optionD` to the `Tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme_id` to the `Tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeAmount` to the `Tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mode` to the `Themes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionAmount` to the `Themes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Modes" AS ENUM ('TEST', 'OPEN_QUESTION', 'CARD');

-- DropForeignKey
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_card_id_fkey";

-- DropForeignKey
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_mode_id_fkey";

-- DropForeignKey
ALTER TABLE "Mode" DROP CONSTRAINT "Mode_theme_id_fkey";

-- DropForeignKey
ALTER TABLE "OpenQuestions" DROP CONSTRAINT "OpenQuestions_mode_id_fkey";

-- DropForeignKey
ALTER TABLE "OpenQuestions" DROP CONSTRAINT "OpenQuestions_openQuestion_id_fkey";

-- DropForeignKey
ALTER TABLE "Statistics" DROP CONSTRAINT "Statistics_card_id_fkey";

-- DropForeignKey
ALTER TABLE "Statistics" DROP CONSTRAINT "Statistics_openQuestion_id_fkey";

-- DropForeignKey
ALTER TABLE "Statistics" DROP CONSTRAINT "Statistics_test_id_fkey";

-- DropForeignKey
ALTER TABLE "Tests" DROP CONSTRAINT "Tests_mode_id_fkey";

-- DropForeignKey
ALTER TABLE "Tests" DROP CONSTRAINT "Tests_test_id_fkey";

-- AlterTable
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_pkey",
DROP COLUMN "card_id",
DROP COLUMN "id_Cs",
DROP COLUMN "mode_id",
ADD COLUMN     "correctAnswer" VARCHAR(50) NOT NULL,
ADD COLUMN     "id_card" SERIAL NOT NULL,
ADD COLUMN     "theme_id" INTEGER NOT NULL,
ADD COLUMN     "timeAmount" TIME(0) NOT NULL,
ADD COLUMN     "word" VARCHAR(50) NOT NULL,
ADD CONSTRAINT "Cards_pkey" PRIMARY KEY ("id_card");

-- AlterTable
ALTER TABLE "OpenQuestions" DROP CONSTRAINT "OpenQuestions_pkey",
DROP COLUMN "id_OQs",
DROP COLUMN "mode_id",
DROP COLUMN "openQuestion_id",
ADD COLUMN     "correctAnswer" VARCHAR(50) NOT NULL,
ADD COLUMN     "id_openQustion" SERIAL NOT NULL,
ADD COLUMN     "question" VARCHAR(200) NOT NULL,
ADD COLUMN     "theme_id" INTEGER NOT NULL,
ADD COLUMN     "timeAmount" TIME(0) NOT NULL,
ADD CONSTRAINT "OpenQuestions_pkey" PRIMARY KEY ("id_openQustion");

-- AlterTable
ALTER TABLE "Tests" DROP CONSTRAINT "Tests_pkey",
DROP COLUMN "id_Ts",
DROP COLUMN "mode_id",
DROP COLUMN "test_id",
ADD COLUMN     "correctAnswer" VARCHAR(50) NOT NULL,
ADD COLUMN     "id_test" SERIAL NOT NULL,
ADD COLUMN     "optionA" VARCHAR(50) NOT NULL,
ADD COLUMN     "optionB" VARCHAR(50) NOT NULL,
ADD COLUMN     "optionC" VARCHAR(50) NOT NULL,
ADD COLUMN     "optionD" VARCHAR(50) NOT NULL,
ADD COLUMN     "question" VARCHAR(200) NOT NULL,
ADD COLUMN     "theme_id" INTEGER NOT NULL,
ADD COLUMN     "timeAmount" TIME(0) NOT NULL,
ADD CONSTRAINT "Tests_pkey" PRIMARY KEY ("id_test");

-- AlterTable
ALTER TABLE "Themes" ADD COLUMN     "mode" "Modes" NOT NULL,
ADD COLUMN     "questionAmount" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Card";

-- DropTable
DROP TABLE "Mode";

-- DropTable
DROP TABLE "OpenQuestion";

-- DropTable
DROP TABLE "Test";

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "Themes"("id_theme") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenQuestions" ADD CONSTRAINT "OpenQuestions_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "Themes"("id_theme") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "Themes"("id_theme") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "Tests"("id_test") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_openQuestion_id_fkey" FOREIGN KEY ("openQuestion_id") REFERENCES "OpenQuestions"("id_openQustion") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Cards"("id_card") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `answer` on the `Card` table. All the data in the column will be lost.
  - You are about to alter the column `word` on the `Card` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `mode` on the `Mode` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `rightAnswer` on the `OpenQuestion` table. All the data in the column will be lost.
  - You are about to alter the column `question` on the `OpenQuestion` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to drop the column `answeredRight` on the `Statistics` table. All the data in the column will be lost.
  - You are about to alter the column `subjectName` on the `Subjects` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `question` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `optionA` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `optionB` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `optionC` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `optionD` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `correctAnswer` on the `Test` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to drop the column `card_id` on the `Themes` table. All the data in the column will be lost.
  - You are about to drop the column `openQuestion_id` on the `Themes` table. All the data in the column will be lost.
  - You are about to drop the column `test_id` on the `Themes` table. All the data in the column will be lost.
  - You are about to alter the column `themeName` on the `Themes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - A unique constraint covering the columns `[subjectName]` on the table `Subjects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `correctAnswer` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correctAnswer` to the `OpenQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_id` to the `Statistics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openQuestion_id` to the `Statistics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `test_id` to the `Statistics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Statistics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE card_id_card_seq;
ALTER TABLE "Card" DROP COLUMN "answer",
ADD COLUMN     "correctAnswer" VARCHAR(50) NOT NULL,
ALTER COLUMN "id_card" SET DEFAULT nextval('card_id_card_seq'),
ALTER COLUMN "word" SET DATA TYPE VARCHAR(50);
ALTER SEQUENCE card_id_card_seq OWNED BY "Card"."id_card";

-- AlterTable
CREATE SEQUENCE cards_id_cs_seq;
ALTER TABLE "Cards" ALTER COLUMN "id_Cs" SET DEFAULT nextval('cards_id_cs_seq');
ALTER SEQUENCE cards_id_cs_seq OWNED BY "Cards"."id_Cs";

-- AlterTable
CREATE SEQUENCE mode_id_mode_seq;
ALTER TABLE "Mode" ALTER COLUMN "id_mode" SET DEFAULT nextval('mode_id_mode_seq'),
ALTER COLUMN "mode" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "questionAmount" DROP NOT NULL,
ALTER COLUMN "timeAmount" SET DATA TYPE TIME(0);
ALTER SEQUENCE mode_id_mode_seq OWNED BY "Mode"."id_mode";

-- AlterTable
CREATE SEQUENCE openquestion_id_openquestion_seq;
ALTER TABLE "OpenQuestion" DROP COLUMN "rightAnswer",
ADD COLUMN     "correctAnswer" VARCHAR(50) NOT NULL,
ALTER COLUMN "id_openQuestion" SET DEFAULT nextval('openquestion_id_openquestion_seq'),
ALTER COLUMN "question" SET DATA TYPE VARCHAR(200);
ALTER SEQUENCE openquestion_id_openquestion_seq OWNED BY "OpenQuestion"."id_openQuestion";

-- AlterTable
CREATE SEQUENCE openquestions_id_oqs_seq;
ALTER TABLE "OpenQuestions" ALTER COLUMN "id_OQs" SET DEFAULT nextval('openquestions_id_oqs_seq');
ALTER SEQUENCE openquestions_id_oqs_seq OWNED BY "OpenQuestions"."id_OQs";

-- AlterTable
CREATE SEQUENCE statistics_id_statistics_seq;
ALTER TABLE "Statistics" DROP COLUMN "answeredRight",
ADD COLUMN     "card_id" INTEGER NOT NULL,
ADD COLUMN     "openQuestion_id" INTEGER NOT NULL,
ADD COLUMN     "rightAnswered" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "test_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "id_statistics" SET DEFAULT nextval('statistics_id_statistics_seq'),
ALTER COLUMN "score" SET DEFAULT 0,
ALTER COLUMN "mark" SET DEFAULT 0;
ALTER SEQUENCE statistics_id_statistics_seq OWNED BY "Statistics"."id_statistics";

-- AlterTable
CREATE SEQUENCE subjects_id_subject_seq;
ALTER TABLE "Subjects" ALTER COLUMN "id_subject" SET DEFAULT nextval('subjects_id_subject_seq'),
ALTER COLUMN "subjectName" SET DATA TYPE VARCHAR(50);
ALTER SEQUENCE subjects_id_subject_seq OWNED BY "Subjects"."id_subject";

-- AlterTable
CREATE SEQUENCE test_id_test_seq;
ALTER TABLE "Test" ALTER COLUMN "id_test" SET DEFAULT nextval('test_id_test_seq'),
ALTER COLUMN "question" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "optionA" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "optionB" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "optionC" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "optionD" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "correctAnswer" SET DATA TYPE VARCHAR(50);
ALTER SEQUENCE test_id_test_seq OWNED BY "Test"."id_test";

-- AlterTable
CREATE SEQUENCE tests_id_ts_seq;
ALTER TABLE "Tests" ALTER COLUMN "id_Ts" SET DEFAULT nextval('tests_id_ts_seq');
ALTER SEQUENCE tests_id_ts_seq OWNED BY "Tests"."id_Ts";

-- AlterTable
CREATE SEQUENCE themes_id_theme_seq;
ALTER TABLE "Themes" DROP COLUMN "card_id",
DROP COLUMN "openQuestion_id",
DROP COLUMN "test_id",
ALTER COLUMN "id_theme" SET DEFAULT nextval('themes_id_theme_seq'),
ALTER COLUMN "themeName" SET DATA TYPE VARCHAR(50);
ALTER SEQUENCE themes_id_theme_seq OWNED BY "Themes"."id_theme";

-- CreateIndex
CREATE UNIQUE INDEX "Subjects_subjectName_key" ON "Subjects"("subjectName");

-- AddForeignKey
ALTER TABLE "Themes" ADD CONSTRAINT "Themes_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subjects"("id_subject") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mode" ADD CONSTRAINT "Mode_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "Themes"("id_theme") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_mode_id_fkey" FOREIGN KEY ("mode_id") REFERENCES "Mode"("id_mode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "Test"("id_test") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenQuestions" ADD CONSTRAINT "OpenQuestions_mode_id_fkey" FOREIGN KEY ("mode_id") REFERENCES "Mode"("id_mode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpenQuestions" ADD CONSTRAINT "OpenQuestions_openQuestion_id_fkey" FOREIGN KEY ("openQuestion_id") REFERENCES "OpenQuestion"("id_openQuestion") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_mode_id_fkey" FOREIGN KEY ("mode_id") REFERENCES "Mode"("id_mode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card"("id_card") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "Tests"("id_Ts") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_openQuestion_id_fkey" FOREIGN KEY ("openQuestion_id") REFERENCES "OpenQuestions"("id_OQs") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Cards"("id_Cs") ON DELETE CASCADE ON UPDATE CASCADE;

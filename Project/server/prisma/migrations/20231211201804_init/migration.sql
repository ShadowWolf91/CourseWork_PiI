-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'TEACHER', 'DEFAULT');

-- CreateTable
CREATE TABLE "Subjects" (
    "id_subject" INTEGER NOT NULL,
    "subjectName" TEXT NOT NULL,

    CONSTRAINT "Subjects_pkey" PRIMARY KEY ("id_subject")
);

-- CreateTable
CREATE TABLE "Themes" (
    "id_theme" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "themeName" TEXT NOT NULL,
    "test_id" INTEGER NOT NULL,
    "openQuestion_id" INTEGER NOT NULL,
    "card_id" INTEGER NOT NULL,

    CONSTRAINT "Themes_pkey" PRIMARY KEY ("id_theme")
);

-- CreateTable
CREATE TABLE "Mode" (
    "id_mode" INTEGER NOT NULL,
    "theme_id" INTEGER NOT NULL,
    "mode" TEXT NOT NULL,
    "questionAmount" INTEGER NOT NULL,
    "timeAmount" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mode_pkey" PRIMARY KEY ("id_mode")
);

-- CreateTable
CREATE TABLE "Test" (
    "id_test" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "optionA" TEXT NOT NULL,
    "optionB" TEXT NOT NULL,
    "optionC" TEXT NOT NULL,
    "optionD" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id_test")
);

-- CreateTable
CREATE TABLE "OpenQuestion" (
    "id_openQuestion" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "rightAnswer" TEXT NOT NULL,

    CONSTRAINT "OpenQuestion_pkey" PRIMARY KEY ("id_openQuestion")
);

-- CreateTable
CREATE TABLE "Card" (
    "id_card" INTEGER NOT NULL,
    "word" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id_card")
);

-- CreateTable
CREATE TABLE "Tests" (
    "id_Ts" INTEGER NOT NULL,
    "mode_id" INTEGER NOT NULL,
    "test_id" INTEGER NOT NULL,

    CONSTRAINT "Tests_pkey" PRIMARY KEY ("id_Ts")
);

-- CreateTable
CREATE TABLE "OpenQuestions" (
    "id_OQs" INTEGER NOT NULL,
    "mode_id" INTEGER NOT NULL,
    "openQuestion_id" INTEGER NOT NULL,

    CONSTRAINT "OpenQuestions_pkey" PRIMARY KEY ("id_OQs")
);

-- CreateTable
CREATE TABLE "Cards" (
    "id_Cs" INTEGER NOT NULL,
    "mode_id" INTEGER NOT NULL,
    "card_id" INTEGER NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id_Cs")
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "password" VARCHAR(128) NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'DEFAULT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Statistics" (
    "id_statistics" INTEGER NOT NULL,
    "answeredRight" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "mark" INTEGER NOT NULL,

    CONSTRAINT "Statistics_pkey" PRIMARY KEY ("id_statistics")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

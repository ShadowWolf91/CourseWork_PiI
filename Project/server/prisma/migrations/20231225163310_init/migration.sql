/*
  Warnings:

  - A unique constraint covering the columns `[themeName]` on the table `Themes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Themes_id_theme_key";

-- AlterTable
CREATE SEQUENCE themes_id_theme_seq;
ALTER TABLE "Themes" ALTER COLUMN "id_theme" SET DEFAULT nextval('themes_id_theme_seq');
ALTER SEQUENCE themes_id_theme_seq OWNED BY "Themes"."id_theme";

-- CreateIndex
CREATE UNIQUE INDEX "Themes_themeName_key" ON "Themes"("themeName");

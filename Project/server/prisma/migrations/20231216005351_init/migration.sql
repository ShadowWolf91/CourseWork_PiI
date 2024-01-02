/*
  Warnings:

  - A unique constraint covering the columns `[id_theme]` on the table `Themes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Statistics_id_statistics_key";

-- AlterTable
CREATE SEQUENCE statistics_id_statistics_seq;
ALTER TABLE "Statistics" ALTER COLUMN "id_statistics" SET DEFAULT nextval('statistics_id_statistics_seq');
ALTER SEQUENCE statistics_id_statistics_seq OWNED BY "Statistics"."id_statistics";

-- AlterTable
ALTER TABLE "Themes" ALTER COLUMN "id_theme" DROP DEFAULT;
DROP SEQUENCE "themes_id_theme_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Themes_id_theme_key" ON "Themes"("id_theme");

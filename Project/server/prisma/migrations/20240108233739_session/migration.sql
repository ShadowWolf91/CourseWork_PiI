-- DropForeignKey
ALTER TABLE "TOCSession" DROP CONSTRAINT "TOCSession_statisticId_fkey";

-- DropForeignKey
ALTER TABLE "TOCSession" DROP CONSTRAINT "TOCSession_themeId_fkey";

-- AddForeignKey
ALTER TABLE "TOCSession" ADD CONSTRAINT "TOCSession_statisticId_fkey" FOREIGN KEY ("statisticId") REFERENCES "Statistics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TOCSession" ADD CONSTRAINT "TOCSession_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Themes"("id_theme") ON DELETE CASCADE ON UPDATE CASCADE;

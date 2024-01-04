-- AddForeignKey
ALTER TABLE "TOCSession" ADD CONSTRAINT "TOCSession_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Themes"("id_theme") ON DELETE RESTRICT ON UPDATE CASCADE;

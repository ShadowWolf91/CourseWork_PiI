-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "Tests"("id_test") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_openQuestion_id_fkey" FOREIGN KEY ("openQuestion_id") REFERENCES "OpenQuestions"("id_openQustion") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statistics" ADD CONSTRAINT "Statistics_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Cards"("id_card") ON DELETE CASCADE ON UPDATE CASCADE;

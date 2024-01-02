-- DropForeignKey
ALTER TABLE "Statistics" DROP CONSTRAINT "Statistics_card_id_fkey";

-- DropForeignKey
ALTER TABLE "Statistics" DROP CONSTRAINT "Statistics_openQuestion_id_fkey";

-- DropForeignKey
ALTER TABLE "Statistics" DROP CONSTRAINT "Statistics_test_id_fkey";

-- AlterTable
ALTER TABLE "Statistics" ALTER COLUMN "score" DROP NOT NULL,
ALTER COLUMN "mark" DROP NOT NULL,
ALTER COLUMN "card_id" DROP NOT NULL,
ALTER COLUMN "openQuestion_id" DROP NOT NULL,
ALTER COLUMN "rightAnswered" DROP NOT NULL,
ALTER COLUMN "test_id" DROP NOT NULL;

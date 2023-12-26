/*
  Warnings:

  - The primary key for the `UserToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deviceId` on the `UserToken` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserToken` table. All the data in the column will be lost.
  - Added the required column `device_id` to the `UserToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `UserToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserToken" DROP CONSTRAINT "UserToken_userId_fkey";

-- AlterTable
ALTER TABLE "UserToken" DROP CONSTRAINT "UserToken_pkey",
DROP COLUMN "deviceId",
DROP COLUMN "userId",
ADD COLUMN     "device_id" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "UserToken_pkey" PRIMARY KEY ("user_id", "device_id");

-- AddForeignKey
ALTER TABLE "UserToken" ADD CONSTRAINT "UserToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

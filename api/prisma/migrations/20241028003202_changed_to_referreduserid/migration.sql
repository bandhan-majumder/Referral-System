/*
  Warnings:

  - You are about to drop the column `referredUser` on the `Referrals` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[referredUserId]` on the table `Referrals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referredUserId` to the `Referrals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Referrals" DROP CONSTRAINT "Referrals_referredUser_fkey";

-- DropIndex
DROP INDEX "Referrals_referredUser_key";

-- AlterTable
ALTER TABLE "Referrals" DROP COLUMN "referredUser",
ADD COLUMN     "referredUserId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Referrals_referredUserId_key" ON "Referrals"("referredUserId");

-- AddForeignKey
ALTER TABLE "Referrals" ADD CONSTRAINT "Referrals_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

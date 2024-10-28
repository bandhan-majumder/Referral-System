/*
  Warnings:

  - A unique constraint covering the columns `[referredUser]` on the table `Referrals` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Referrals_referredUser_key" ON "Referrals"("referredUser");

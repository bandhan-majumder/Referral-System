/*
  Warnings:

  - The primary key for the `Referrals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Referrals" DROP CONSTRAINT "Referrals_referredUserId_fkey";

-- AlterTable
ALTER TABLE "Referrals" DROP CONSTRAINT "Referrals_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "referredUserId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Referrals_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Referrals_id_seq";

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Users_id_seq";

-- AddForeignKey
ALTER TABLE "Referrals" ADD CONSTRAINT "Referrals_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

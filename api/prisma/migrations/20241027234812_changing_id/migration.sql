/*
  Warnings:

  - The primary key for the `Referrals` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Referrals` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `referredUser` on the `Referrals` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Referrals" DROP CONSTRAINT "Referrals_referredUser_fkey";

-- AlterTable
ALTER TABLE "Referrals" DROP CONSTRAINT "Referrals_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "referredUser",
ADD COLUMN     "referredUser" INTEGER NOT NULL,
ADD CONSTRAINT "Referrals_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Referrals" ADD CONSTRAINT "Referrals_referredUser_fkey" FOREIGN KEY ("referredUser") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

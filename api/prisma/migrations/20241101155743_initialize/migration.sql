-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "referralCode" CHAR(6) NOT NULL,
    "referralCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referrals" (
    "id" TEXT NOT NULL,
    "referralCode" TEXT NOT NULL,
    "referredUserId" TEXT NOT NULL,

    CONSTRAINT "Referrals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_referralCode_key" ON "Users"("referralCode");

-- CreateIndex
CREATE UNIQUE INDEX "Referrals_referredUserId_key" ON "Referrals"("referredUserId");

-- AddForeignKey
ALTER TABLE "Referrals" ADD CONSTRAINT "Referrals_referralCode_fkey" FOREIGN KEY ("referralCode") REFERENCES "Users"("referralCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referrals" ADD CONSTRAINT "Referrals_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

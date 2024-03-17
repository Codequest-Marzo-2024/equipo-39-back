/*
  Warnings:

  - You are about to drop the column `RaffleId` on the `participants` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `participants` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `participants` table. All the data in the column will be lost.
  - You are about to drop the column `ParticipantId` on the `winners` table. All the data in the column will be lost.
  - You are about to drop the column `RaffleId` on the `winners` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idPlatform,raffleId]` on the table `participants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idPlatform` to the `participants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raffleId` to the `participants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `participants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participantId` to the `winners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raffleId` to the `winners` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "participants" DROP CONSTRAINT "participants_RaffleId_fkey";

-- DropForeignKey
ALTER TABLE "winners" DROP CONSTRAINT "winners_ParticipantId_fkey";

-- DropForeignKey
ALTER TABLE "winners" DROP CONSTRAINT "winners_RaffleId_fkey";

-- AlterTable
ALTER TABLE "participants" DROP COLUMN "RaffleId",
DROP COLUMN "email",
DROP COLUMN "userName",
ADD COLUMN     "idPlatform" TEXT NOT NULL,
ADD COLUMN     "raffleId" INTEGER NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "winners" DROP COLUMN "ParticipantId",
DROP COLUMN "RaffleId",
ADD COLUMN     "participantId" INTEGER NOT NULL,
ADD COLUMN     "raffleId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "participants_idPlatform_raffleId_key" ON "participants"("idPlatform", "raffleId");

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "raffles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "winners" ADD CONSTRAINT "winners_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "raffles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "winners" ADD CONSTRAINT "winners_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

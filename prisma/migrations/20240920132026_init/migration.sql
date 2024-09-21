/*
  Warnings:

  - You are about to drop the column `details` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "details",
DROP COLUMN "timestamp";

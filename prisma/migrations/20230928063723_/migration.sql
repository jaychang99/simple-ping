/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Log` DROP COLUMN `isDeleted`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Service` DROP COLUMN `isDeleted`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `isDeleted`,
    ADD COLUMN `deletedAt` DATETIME(3) NULL;

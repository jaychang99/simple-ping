-- AlterTable
ALTER TABLE `Log` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Service` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

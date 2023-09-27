-- CreateTable
CREATE TABLE `Service` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Service_uuid_key`(`uuid`),
    UNIQUE INDEX `Service_url_key`(`url`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Log` (
    `uuid` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `serviceUuid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Log_uuid_key`(`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_serviceUuid_fkey` FOREIGN KEY (`serviceUuid`) REFERENCES `Service`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

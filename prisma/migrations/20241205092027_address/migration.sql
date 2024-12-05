-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `AddressLine1` VARCHAR(191) NOT NULL,
    `AddressLine2` VARCHAR(191) NULL,
    `City` VARCHAR(191) NOT NULL,
    `State` VARCHAR(191) NOT NULL,
    `Country` VARCHAR(191) NOT NULL,
    `PostalCode` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

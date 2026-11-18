-- CreateTable
CREATE TABLE `prestador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password_hash` VARCHAR(100) NOT NULL,
    `contact` VARCHAR(45) NOT NULL,
    `status` VARCHAR(10) NULL DEFAULT 'true',

    UNIQUE INDEX `idprestador_UNIQUE`(`id`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

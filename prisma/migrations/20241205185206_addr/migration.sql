/*
  Warnings:

  - You are about to alter the column `PostalCode` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `address` MODIFY `PostalCode` INTEGER NOT NULL;

/*
  Warnings:

  - Added the required column `ongoing` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rental" ADD COLUMN     "ongoing" BOOLEAN NOT NULL;

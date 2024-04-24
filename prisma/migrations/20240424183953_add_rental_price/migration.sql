/*
  Warnings:

  - Added the required column `rental_price` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "rental_price" DOUBLE PRECISION NOT NULL;

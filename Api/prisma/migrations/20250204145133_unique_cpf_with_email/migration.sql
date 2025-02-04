/*
  Warnings:

  - A unique constraint covering the columns `[cpf,email]` on the table `peoples` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "peoples_cpf_key";

-- DropIndex
DROP INDEX "peoples_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "peoples_cpf_email_key" ON "peoples"("cpf", "email");

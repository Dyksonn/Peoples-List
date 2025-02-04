-- CreateTable
CREATE TABLE "peoples" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birth_date" DATETIME NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "peoples_email_key" ON "peoples"("email");

-- CreateIndex
CREATE UNIQUE INDEX "peoples_cpf_key" ON "peoples"("cpf");

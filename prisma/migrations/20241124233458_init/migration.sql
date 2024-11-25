/*
  Warnings:

  - Added the required column `status` to the `tbProjectServices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `tbProjectServices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `tbTasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `tbTasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tbProjectServices" ADD COLUMN     "status" VARCHAR(20) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "tbTasks" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" VARCHAR(20) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "tbuserdetails" (
    "PK_detail" SERIAL NOT NULL,
    "FK_user" INTEGER NOT NULL,
    "phoneNumber" VARCHAR(15),
    "address" VARCHAR(255),
    "dateOfBirth" TIMESTAMP(3),
    "hireDate" TIMESTAMP(3),
    "position" VARCHAR(80),
    "salary" VARCHAR(30) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbuserdetails_pkey" PRIMARY KEY ("PK_detail")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbuserdetails_FK_user_key" ON "tbuserdetails"("FK_user");

-- AddForeignKey
ALTER TABLE "tbuserdetails" ADD CONSTRAINT "tbuserdetails_FK_user_fkey" FOREIGN KEY ("FK_user") REFERENCES "tbUsers"("PK_user") ON DELETE RESTRICT ON UPDATE CASCADE;

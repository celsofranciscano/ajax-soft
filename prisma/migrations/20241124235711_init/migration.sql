-- CreateTable
CREATE TABLE "tbdepartments" (
    "PK_department" SERIAL NOT NULL,
    "department" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbdepartments_pkey" PRIMARY KEY ("PK_department")
);

-- CreateTable
CREATE TABLE "tbroles" (
    "PK_role" SERIAL NOT NULL,
    "FK_department" INTEGER NOT NULL,
    "role" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbroles_pkey" PRIMARY KEY ("PK_role")
);

-- CreateTable
CREATE TABLE "tbprivileges" (
    "PK_privilege" SERIAL NOT NULL,
    "privilege" VARCHAR(50) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbprivileges_pkey" PRIMARY KEY ("PK_privilege")
);

-- CreateTable
CREATE TABLE "tbusers" (
    "PK_user" SERIAL NOT NULL,
    "FK_privilege" INTEGER NOT NULL,
    "FK_role" INTEGER NOT NULL,
    "CI" VARCHAR(20) NOT NULL,
    "firstName" VARCHAR(80) NOT NULL,
    "lastName" VARCHAR(80) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "profileImage" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbusers_pkey" PRIMARY KEY ("PK_user")
);

-- CreateTable
CREATE TABLE "tbuserdetails" (
    "PK_detail" SERIAL NOT NULL,
    "FK_user" INTEGER NOT NULL,
    "phoneNumber" VARCHAR(15),
    "address" VARCHAR(255),
    "github" VARCHAR(255),
    "linkedin" VARCHAR(255),
    "instagram" VARCHAR(255),
    "web" VARCHAR(255),
    "description" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbuserdetails_pkey" PRIMARY KEY ("PK_detail")
);

-- CreateTable
CREATE TABLE "tbphases" (
    "PK_phase" SERIAL NOT NULL,
    "phase" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbphases_pkey" PRIMARY KEY ("PK_phase")
);

-- CreateTable
CREATE TABLE "tbstages" (
    "PK_stage" SERIAL NOT NULL,
    "FK_phase" INTEGER NOT NULL,
    "stage" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbstages_pkey" PRIMARY KEY ("PK_stage")
);

-- CreateTable
CREATE TABLE "tbcategories" (
    "PK_category" SERIAL NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbcategories_pkey" PRIMARY KEY ("PK_category")
);

-- CreateTable
CREATE TABLE "tbcustomers" (
    "PK_customer" SERIAL NOT NULL,
    "business" VARCHAR(80) NOT NULL,
    "firstName" VARCHAR(80) NOT NULL,
    "lastName" VARCHAR(80) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(15) NOT NULL,
    "address" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL,
    "profileImage" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbcustomers_pkey" PRIMARY KEY ("PK_customer")
);

-- CreateTable
CREATE TABLE "tbstatus" (
    "PK_status" SERIAL NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbstatus_pkey" PRIMARY KEY ("PK_status")
);

-- CreateTable
CREATE TABLE "tbprojects" (
    "PK_project" SERIAL NOT NULL,
    "FK_status" INTEGER NOT NULL,
    "FK_customer" INTEGER NOT NULL,
    "FK_category" INTEGER NOT NULL,
    "FK_stage" INTEGER NOT NULL,
    "project" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "image" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbprojects_pkey" PRIMARY KEY ("PK_project")
);

-- CreateTable
CREATE TABLE "tbprojectdetails" (
    "PK_projectdetails" SERIAL NOT NULL,
    "FK_project" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "deploymentUrl" VARCHAR(255),
    "cost" DOUBLE PRECISION,
    "estimatedTime" INTEGER,
    "githubUrl" VARCHAR(255),
    "notionUrl" VARCHAR(255),
    "figmaUrl" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbprojectdetails_pkey" PRIMARY KEY ("PK_projectdetails")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbprivileges_privilege_key" ON "tbprivileges"("privilege");

-- CreateIndex
CREATE UNIQUE INDEX "tbusers_CI_key" ON "tbusers"("CI");

-- CreateIndex
CREATE UNIQUE INDEX "tbusers_email_key" ON "tbusers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbuserdetails_FK_user_key" ON "tbuserdetails"("FK_user");

-- CreateIndex
CREATE UNIQUE INDEX "tbcustomers_email_key" ON "tbcustomers"("email");

-- AddForeignKey
ALTER TABLE "tbroles" ADD CONSTRAINT "tbroles_FK_department_fkey" FOREIGN KEY ("FK_department") REFERENCES "tbdepartments"("PK_department") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbusers" ADD CONSTRAINT "tbusers_FK_privilege_fkey" FOREIGN KEY ("FK_privilege") REFERENCES "tbprivileges"("PK_privilege") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbusers" ADD CONSTRAINT "tbusers_FK_role_fkey" FOREIGN KEY ("FK_role") REFERENCES "tbroles"("PK_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbuserdetails" ADD CONSTRAINT "tbuserdetails_FK_user_fkey" FOREIGN KEY ("FK_user") REFERENCES "tbusers"("PK_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbstages" ADD CONSTRAINT "tbstages_FK_phase_fkey" FOREIGN KEY ("FK_phase") REFERENCES "tbphases"("PK_phase") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbprojects" ADD CONSTRAINT "tbprojects_FK_status_fkey" FOREIGN KEY ("FK_status") REFERENCES "tbstatus"("PK_status") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbprojects" ADD CONSTRAINT "tbprojects_FK_customer_fkey" FOREIGN KEY ("FK_customer") REFERENCES "tbcustomers"("PK_customer") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbprojects" ADD CONSTRAINT "tbprojects_FK_category_fkey" FOREIGN KEY ("FK_category") REFERENCES "tbcategories"("PK_category") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbprojects" ADD CONSTRAINT "tbprojects_FK_stage_fkey" FOREIGN KEY ("FK_stage") REFERENCES "tbstages"("PK_stage") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbprojectdetails" ADD CONSTRAINT "tbprojectdetails_FK_project_fkey" FOREIGN KEY ("FK_project") REFERENCES "tbprojects"("PK_project") ON DELETE RESTRICT ON UPDATE CASCADE;

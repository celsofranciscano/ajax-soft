-- CreateTable
CREATE TABLE "tbUsers" (
    "PK_user" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" VARCHAR(10) NOT NULL,
    "lastName" VARCHAR(10) NOT NULL,
    "career" VARCHAR(20) NOT NULL,
    "age" INTEGER NOT NULL,
    "linkedin" VARCHAR(20) NOT NULL,
    "expertiseParagraph" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "tbUsers_pkey" PRIMARY KEY ("PK_user")
);

-- CreateTable
CREATE TABLE "tbadmins" (
    "PK_admin" SERIAL NOT NULL,
    "userName" VARCHAR(20) NOT NULL,
    "firstName" VARCHAR(10) NOT NULL,
    "lastName" VARCHAR(10) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbadmins_pkey" PRIMARY KEY ("PK_admin")
);

-- CreateTable
CREATE TABLE "tbroles" (
    "PK_role" SERIAL NOT NULL,
    "FK_user" INTEGER NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbroles_pkey" PRIMARY KEY ("PK_role")
);

-- CreateTable
CREATE TABLE "tbcompanies" (
    "PK_company" SERIAL NOT NULL,
    "companyName" VARCHAR(100) NOT NULL,
    "industry" VARCHAR(50) NOT NULL,
    "address" VARCHAR(100) NOT NULL,
    "website" VARCHAR(100) NOT NULL,
    "category" VARCHAR(20) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "tbcompanies_pkey" PRIMARY KEY ("PK_company")
);

-- CreateTable
CREATE TABLE "tbJobs" (
    "PK_job" SERIAL NOT NULL,
    "FK_company" INTEGER NOT NULL,
    "jobTitle" VARCHAR(100) NOT NULL,
    "jobDescription" VARCHAR(500) NOT NULL,
    "jobRequirements" VARCHAR(500) NOT NULL,
    "locationIrl" VARCHAR(100) NOT NULL,
    "salary" DECIMAL(10,2) NOT NULL,
    "closeDate" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbJobs_pkey" PRIMARY KEY ("PK_job")
);

-- CreateTable
CREATE TABLE "tbsubmits" (
    "PK_submit" SERIAL NOT NULL,
    "FK_user" INTEGER NOT NULL,
    "FK_job" INTEGER NOT NULL,
    "submitDate" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'En revisión',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbsubmits_pkey" PRIMARY KEY ("PK_submit")
);

-- CreateTable
CREATE TABLE "tbExperiences" (
    "PK_experience" SERIAL NOT NULL,
    "FK_user" INTEGER NOT NULL,
    "roleAssignet" VARCHAR(10) NOT NULL,
    "initialDate" TIMESTAMP(3) NOT NULL,
    "finalDate" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbExperiences_pkey" PRIMARY KEY ("PK_experience")
);

-- CreateTable
CREATE TABLE "tbExperienceDetail" (
    "PK_experienceDetail" SERIAL NOT NULL,
    "FK_experience" INTEGER NOT NULL,
    "personalAchievements" VARCHAR(200) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tbExperienceDetail_pkey" PRIMARY KEY ("PK_experienceDetail")
);

-- CreateTable
CREATE TABLE "tbServices" (
    "PK_service" SERIAL NOT NULL,
    "serviceName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "valueAdded" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "tbServices_pkey" PRIMARY KEY ("PK_service")
);

-- CreateTable
CREATE TABLE "tbProjects" (
    "PK_project" SERIAL NOT NULL,
    "FK_job" INTEGER NOT NULL,
    "projectName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technologies" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "stages" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "tbProjects_pkey" PRIMARY KEY ("PK_project")
);

-- CreateTable
CREATE TABLE "tbTasks" (
    "PK_task" SERIAL NOT NULL,
    "FK_project" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "timeExpected" VARCHAR NOT NULL,

    CONSTRAINT "tbTasks_pkey" PRIMARY KEY ("PK_task")
);

-- CreateTable
CREATE TABLE "tbProjectServices" (
    "PK_projectService" SERIAL NOT NULL,
    "FK_project" INTEGER NOT NULL,
    "FK_service" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbProjectServices_pkey" PRIMARY KEY ("PK_projectService")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbUsers_email_key" ON "tbUsers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbadmins_email_key" ON "tbadmins"("email");

-- AddForeignKey
ALTER TABLE "tbroles" ADD CONSTRAINT "tbroles_FK_user_fkey" FOREIGN KEY ("FK_user") REFERENCES "tbUsers"("PK_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbJobs" ADD CONSTRAINT "tbJobs_FK_company_fkey" FOREIGN KEY ("FK_company") REFERENCES "tbcompanies"("PK_company") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbsubmits" ADD CONSTRAINT "tbsubmits_FK_user_fkey" FOREIGN KEY ("FK_user") REFERENCES "tbUsers"("PK_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbsubmits" ADD CONSTRAINT "tbsubmits_FK_job_fkey" FOREIGN KEY ("FK_job") REFERENCES "tbJobs"("PK_job") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbExperiences" ADD CONSTRAINT "tbExperiences_FK_user_fkey" FOREIGN KEY ("FK_user") REFERENCES "tbUsers"("PK_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbExperienceDetail" ADD CONSTRAINT "tbExperienceDetail_FK_experience_fkey" FOREIGN KEY ("FK_experience") REFERENCES "tbExperiences"("PK_experience") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbProjects" ADD CONSTRAINT "tbProjects_FK_job_fkey" FOREIGN KEY ("FK_job") REFERENCES "tbJobs"("PK_job") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbTasks" ADD CONSTRAINT "tbTasks_FK_project_fkey" FOREIGN KEY ("FK_project") REFERENCES "tbProjects"("PK_project") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbProjectServices" ADD CONSTRAINT "tbProjectServices_FK_project_fkey" FOREIGN KEY ("FK_project") REFERENCES "tbProjects"("PK_project") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbProjectServices" ADD CONSTRAINT "tbProjectServices_FK_service_fkey" FOREIGN KEY ("FK_service") REFERENCES "tbServices"("PK_service") ON DELETE RESTRICT ON UPDATE CASCADE;

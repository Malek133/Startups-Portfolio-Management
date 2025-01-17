-- CreateTable
CREATE TABLE "Startup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "managementTeam" TEXT[],
    "description" TEXT,

    CONSTRAINT "Startup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancingStatus" (
    "id" TEXT NOT NULL,
    "startupId" TEXT NOT NULL,
    "amountInvested" DOUBLE PRECISION NOT NULL,
    "numberOfRounds" INTEGER NOT NULL,
    "valuation" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FinancingStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interaction" (
    "id" TEXT NOT NULL,
    "startupId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "startupId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialTransaction" (
    "id" TEXT NOT NULL,
    "startupId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "FinancialTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "startupId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stakeholder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,

    CONSTRAINT "Stakeholder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StakeholderAppointment" (
    "id" TEXT NOT NULL,
    "stakeholderId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "StakeholderAppointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FinancingStatus_startupId_key" ON "FinancingStatus"("startupId");

-- AddForeignKey
ALTER TABLE "FinancingStatus" ADD CONSTRAINT "FinancingStatus_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialTransaction" ADD CONSTRAINT "FinancialTransaction_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StakeholderAppointment" ADD CONSTRAINT "StakeholderAppointment_stakeholderId_fkey" FOREIGN KEY ("stakeholderId") REFERENCES "Stakeholder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

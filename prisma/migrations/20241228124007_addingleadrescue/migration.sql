-- CreateTable
CREATE TABLE "LeadHistory" (
    "id" SERIAL NOT NULL,
    "leadId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "notes" TEXT,
    "createdBy" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeadHistory" ADD CONSTRAINT "LeadHistory_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

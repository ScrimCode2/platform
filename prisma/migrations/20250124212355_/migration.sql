-- CreateEnum
CREATE TYPE "BlockType" AS ENUM ('TEXT', 'CODE');

-- CreateTable
CREATE TABLE "document" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "block" (
    "id" SERIAL NOT NULL,
    "documentId" INTEGER NOT NULL,
    "type" "BlockType" NOT NULL,
    "content" TEXT NOT NULL,
    "language" TEXT,
    "orderIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "block_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "block" ADD CONSTRAINT "block_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

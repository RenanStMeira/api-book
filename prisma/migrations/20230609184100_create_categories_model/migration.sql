-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "booksId" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_booksId_fkey" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "borrow_records_table" DROP CONSTRAINT "borrow_records_table_book_id_books_table_id_fk";
--> statement-breakpoint
ALTER TABLE "borrow_records_table" ADD CONSTRAINT "borrow_records_table_book_id_books_table_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books_table"("id") ON DELETE cascade ON UPDATE no action;
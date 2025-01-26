CREATE TABLE "borrow_records_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"book_id" uuid NOT NULL,
	"borrow_data" timestamp with time zone DEFAULT now() NOT NULL,
	"due_date" date NOT NULL,
	"return_date" date,
	"status" "borrow_status" DEFAULT 'BORROWED' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "borrow_records_table_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "borrow_records_table" ADD CONSTRAINT "borrow_records_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "borrow_records_table" ADD CONSTRAINT "borrow_records_table_book_id_books_table_id_fk" FOREIGN KEY ("book_id") REFERENCES "public"."books_table"("id") ON DELETE no action ON UPDATE no action;
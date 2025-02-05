ALTER TABLE "borrow_records_table" ADD COLUMN "borrow_date" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "borrow_records_table" DROP COLUMN "borrow_data";
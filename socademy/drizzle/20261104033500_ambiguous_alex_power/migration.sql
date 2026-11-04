ALTER TABLE `events` ADD `category` text DEFAULT 'other' NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `is_outdoor` integer DEFAULT false NOT NULL;
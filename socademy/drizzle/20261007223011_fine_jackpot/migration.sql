CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`title` text NOT NULL,
	`description` text,
	`location` text,
	`startsAt` integer NOT NULL,
	`endsAt` integer,
	`createdAt` integer NOT NULL
);

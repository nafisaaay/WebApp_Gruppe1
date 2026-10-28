CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`text` text NOT NULL,
	`userId` text NOT NULL,
	`userName` text NOT NULL,
	`postId` integer NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`text` text NOT NULL,
	`userId` text NOT NULL,
	`userName` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);

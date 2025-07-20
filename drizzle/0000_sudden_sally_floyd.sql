CREATE TABLE `employees` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`emp_id` text NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`date_of_birth` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `employees_emp_id_unique` ON `employees` (`emp_id`);
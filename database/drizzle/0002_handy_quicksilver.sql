CREATE TABLE `OrderLines` (
	`id` varchar(255) NOT NULL,
	`product_id` int,
	`quantity` int NOT NULL,
	`order_id` varchar(255) NOT NULL,
	CONSTRAINT `OrderLines_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Orders` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`created_date` datetime,
	`collect_date` date,
	`total_price` decimal(10,2) NOT NULL,
	CONSTRAINT `Orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`id` varchar(255) NOT NULL,
	`last_name` text NOT NULL,
	`first_name` text NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `Users_id` PRIMARY KEY(`id`),
	CONSTRAINT `Users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `OrderLines` ADD CONSTRAINT `OrderLines_product_id_Products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `OrderLines` ADD CONSTRAINT `OrderLines_order_id_Orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `Orders`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_user_id_Users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;
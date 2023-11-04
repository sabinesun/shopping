CREATE TABLE `Products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`inventory` int NOT NULL,
	CONSTRAINT `Products_id` PRIMARY KEY(`id`)
);

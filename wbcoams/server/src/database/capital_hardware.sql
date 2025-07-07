-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.2.0 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for capitalhardware
CREATE DATABASE IF NOT EXISTS `capitalhardware` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `capitalhardware`;

-- Dumping structure for table capitalhardware.brands
CREATE TABLE IF NOT EXISTS `brands` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdUserId` int unsigned NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedUserId` int unsigned NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `name` varchar(100) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table capitalhardware.brands: ~3 rows (approximately)
INSERT INTO `brands` (`id`, `createdAt`, `createdUserId`, `updatedAt`, `updatedUserId`, `isActive`, `name`, `logo`) VALUES
	(1, '2025-06-21 02:02:32', 100, '2025-06-21 02:02:32', 100, 1, 'Makita', ''),
	(2, '2025-06-21 02:05:36', 100, '2025-06-21 02:05:36', 100, 1, 'Globe', ''),
	(3, '2025-06-21 02:05:41', 100, '2025-06-21 02:06:49', 100, 0, 'Hogo', '');

-- Dumping structure for table capitalhardware.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdUserId` int unsigned NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedUserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table capitalhardware.categories: ~3 rows (approximately)
INSERT INTO `categories` (`id`, `name`, `isActive`, `createdAt`, `createdUserId`, `updatedAt`, `updatedUserId`) VALUES
	(1, 'Door Locks', 1, '2025-06-21 01:34:32', 100, '2025-06-21 01:52:22', 100),
	(2, 'Nails', 1, '2025-06-21 01:34:41', 100, '2025-06-21 01:52:30', 100),
	(3, 'Roller Brush', 1, '2025-06-21 01:34:50', 100, '2025-06-21 01:52:43', 100);

-- Dumping structure for table capitalhardware.cheques
CREATE TABLE IF NOT EXISTS `cheques` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `chequeNumber` varchar(50) NOT NULL,
  `status` enum('pending','passed','returned') NOT NULL DEFAULT 'pending',
  `amount` decimal(12,2) NOT NULL,
  `customerId` int unsigned NOT NULL,
  `bankName` varchar(100) NOT NULL,
  `bankBranch` varchar(100) NOT NULL,
  `accountNumber` varchar(50) NOT NULL,
  `chequeDate` datetime NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` int unsigned NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedBy` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_chequeNumber` (`chequeNumber`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `cheques_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table capitalhardware.cheques: ~0 rows (approximately)

-- Dumping structure for table capitalhardware.cheque_returns
CREATE TABLE IF NOT EXISTS `cheque_returns` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `paymentId` int NOT NULL,
  `returnDate` datetime NOT NULL,
  `reason` varchar(100) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `chequeId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `chequeId` (`chequeId`),
  KEY `paymentId` (`paymentId`),
  CONSTRAINT `cheque_returns_ibfk_1` FOREIGN KEY (`chequeId`) REFERENCES `cheques` (`id`),
  CONSTRAINT `FK_cheque_returns_payments` FOREIGN KEY (`paymentId`) REFERENCES `payments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table capitalhardware.cheque_returns: ~0 rows (approximately)

-- Dumping structure for table capitalhardware.customers
CREATE TABLE IF NOT EXISTS `customers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `creditLimit` decimal(12,2) NOT NULL DEFAULT '100000.00',
  `creditBalance` decimal(12,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId` (`userId`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table capitalhardware.customers: ~21 rows (approximately)
INSERT INTO `customers` (`id`, `userId`, `creditLimit`, `creditBalance`) VALUES
	(2, 95, 100000.00, 837.75),
	(10, 108, 410000.00, 0.00),
	(11, 114, 350000.00, 0.00),
	(12, 117, 350000.00, 0.00),
	(13, 120, 350000.00, 0.00),
	(14, 122, 350000.00, 0.00),
	(15, 124, 350000.00, 0.00),
	(16, 125, 380000.00, 0.00),
	(17, 137, 380000.00, 0.00),
	(18, 144, 380000.00, 0.00),
	(19, 146, 380000.00, 0.00),
	(20, 147, 380000.00, 0.00),
	(21, 149, 380000.00, 0.00),
	(22, 150, 380000.00, 0.00),
	(23, 152, 380000.00, 0.00),
	(24, 153, 380000.00, 0.00),
	(25, 156, 380000.00, 0.00),
	(32, 164, 380000.00, 0.00),
	(33, 165, 380000.00, 0.00),
	(34, 168, 380000.00, 0.00),
	(36, 171, 100000.00, 0.00);

-- Dumping structure for table capitalhardware.invoices
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customerId` int unsigned NOT NULL,
  `invoiceDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subTotal` decimal(12,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `dueDate` datetime DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `status` enum('draft','finalized','paid','cancelled') NOT NULL DEFAULT 'draft',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdUserId` int unsigned NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedUserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table capitalhardware.invoices: ~7 rows (approximately)
INSERT INTO `invoices` (`id`, `customerId`, `invoiceDate`, `subTotal`, `discount`, `total`, `dueDate`, `remarks`, `status`, `isActive`, `createdAt`, `createdUserId`, `updatedAt`, `updatedUserId`) VALUES
	(3, 2, '2024-06-01 08:00:00', 0.00, 10.00, 250.75, NULL, 'Thank you for your business.', 'draft', 0, '2025-06-21 23:36:10', 1, '2025-06-22 17:00:49', 1),
	(4, 2, '2024-06-01 08:00:00', 0.00, 10.00, 250.75, '2024-07-01 08:00:00', 'Thank you for your business.', 'draft', 1, '2025-06-21 23:42:59', 1, '2025-06-21 23:42:59', 1),
	(5, 10, '2024-06-01 08:00:00', 0.00, 10.00, 250.75, '2024-07-01 08:00:00', 'Thank you for your business.', 'draft', 1, '2025-06-21 23:52:02', 100, '2025-06-22 13:05:45', 100),
	(6, 2, '2024-06-01 08:00:00', 0.00, 10.00, 250.75, '2024-07-01 08:00:00', 'Thank you for your business.', 'draft', 1, '2025-06-22 12:20:08', 100, '2025-06-22 12:20:08', 100),
	(7, 2, '2024-06-01 08:00:00', 0.00, 10.00, 250.75, '2024-07-01 08:00:00', 'Thank you for your business.', 'draft', 1, '2025-06-22 12:20:55', 100, '2025-06-22 12:20:55', 100),
	(8, 2, '2024-06-01 08:00:00', 0.00, 10.00, 250.75, '2024-07-01 08:00:00', 'Thank you for your business.', 'draft', 1, '2025-06-22 21:51:14', 1, '2025-06-22 21:51:14', 1),
	(9, 2, '2024-06-01 08:00:00', 175.75, 10.00, 165.75, '2024-07-01 08:00:00', 'Thank you for your business.', 'draft', 1, '2025-06-22 23:14:02', 100, '2025-06-23 00:13:54', 100);

-- Dumping structure for table capitalhardware.invoice_items
CREATE TABLE IF NOT EXISTS `invoice_items` (
  `invoiceId` int unsigned NOT NULL,
  `itemId` int unsigned NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(12,2) NOT NULL,
  KEY `invoiceId` (`invoiceId`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `invoice_items_ibfk_1` FOREIGN KEY (`invoiceId`) REFERENCES `invoices` (`id`),
  CONSTRAINT `invoice_items_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table capitalhardware.invoice_items: ~14 rows (approximately)
INSERT INTO `invoice_items` (`invoiceId`, `itemId`, `quantity`, `price`) VALUES
	(3, 1, 1, 100.50),
	(3, 4, 2, 75.25),
	(4, 1, 1, 100.50),
	(4, 4, 2, 75.25),
	(5, 1, 1, 100.50),
	(5, 4, 2, 75.25),
	(6, 1, 1, 100.50),
	(6, 4, 2, 75.25),
	(7, 1, 1, 100.50),
	(7, 4, 2, 75.25),
	(8, 1, 1, 100.50),
	(8, 4, 2, 75.25),
	(9, 1, 1, 100.50),
	(9, 4, 1, 75.25);

-- Dumping structure for table capitalhardware.logs
CREATE TABLE IF NOT EXISTS `logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int unsigned DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL,
  `targetId` int DEFAULT NULL,
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_logs_users` (`userId`),
  CONSTRAINT `FK_logs_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table capitalhardware.logs: ~5 rows (approximately)
INSERT INTO `logs` (`id`, `userId`, `action`, `targetId`, `description`, `timestamp`) VALUES
	(1, 1, 'update', 36, 'Customer updated: city, creditLimit', '2025-06-27 06:35:19'),
	(2, 1, 'update', 36, 'Customer updated: city, creditLimit', '2025-06-27 06:37:12'),
	(3, 1, 'update', 36, 'Customer updated: city, creditLimit', '2025-06-27 06:37:43'),
	(4, 1, 'delete', 168, 'User with ID 168 deleted successfully.', '2025-06-27 06:43:19'),
	(5, 1, 'delete', 34, 'Customer with ID 34 deleted.', '2025-06-27 06:43:19');

-- Dumping structure for table capitalhardware.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customerId` int unsigned NOT NULL,
  `orderDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(12,2) NOT NULL,
  `status` enum('pending','completed','cancelled','on_hold') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
  `remarks` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdUserId` int unsigned NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedUserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table capitalhardware.orders: ~1 rows (approximately)
INSERT INTO `orders` (`id`, `customerId`, `orderDate`, `total`, `status`, `remarks`, `isActive`, `createdAt`, `createdUserId`, `updatedAt`, `updatedUserId`) VALUES
	(12, 2, '2024-06-01 08:00:00', 275.75, 'pending', 'Thank you for your business.', 1, '2025-06-24 21:30:44', 95, '2025-06-24 21:30:44', 95);

-- Dumping structure for table capitalhardware.order_items
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `orderId` int unsigned NOT NULL,
  `itemId` int unsigned NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(12,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table capitalhardware.order_items: ~2 rows (approximately)
INSERT INTO `order_items` (`id`, `orderId`, `itemId`, `quantity`, `price`) VALUES
	(23, 12, 1, 1, 200.50),
	(24, 12, 4, 1, 75.25);

-- Dumping structure for table capitalhardware.payments
CREATE TABLE IF NOT EXISTS `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `custId` int NOT NULL,
  `paymentDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cash` double DEFAULT NULL,
  `type` enum('cash','cheque','bank_transfer','cash_and_cheque','cash_and_bank_transfer') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `remarks` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `createdUserId` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedUserId` int NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table capitalhardware.payments: ~0 rows (approximately)

-- Dumping structure for table capitalhardware.products
CREATE TABLE IF NOT EXISTS `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `description` varchar(255) NOT NULL,
  `info` text NOT NULL,
  `categoryId` int unsigned NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `brandId` int unsigned NOT NULL,
  `unit` varchar(50) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `oldPrice` decimal(12,2) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdUserId` int unsigned NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedUserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `description` (`description`),
  KEY `idx_category` (`categoryId`),
  KEY `idx_brand` (`brandId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brandId`) REFERENCES `brands` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table capitalhardware.products: ~9 rows (approximately)
INSERT INTO `products` (`id`, `isActive`, `description`, `info`, `categoryId`, `price`, `brandId`, `unit`, `image`, `oldPrice`, `createdAt`, `createdUserId`, `updatedAt`, `updatedUserId`) VALUES
	(1, 1, 'this is a test description item', 'this is a test information', 2, 3000.00, 1, 'Nos', '', 900.00, '2025-06-21 06:26:06', 100, '2025-06-21 06:26:06', 100),
	(4, 0, 'this is a test description item 4', 'this is a test information', 2, 3050.00, 1, 'Doz', '', 900.00, '2025-06-21 06:28:09', 100, '2025-06-24 22:30:56', 100),
	(6, 1, 'this is a test description item 5', 'this is a test information', 2, 3050.00, 1, 'Doz', '', 900.00, '2025-06-24 14:50:05', 1, '2025-06-24 14:50:05', 1),
	(7, 1, 'this is a product description', 'this is a info of the product being added', 2, 150.00, 1, 'Pkt', NULL, NULL, '2025-06-24 17:16:35', 100, '2025-06-24 17:16:35', 100),
	(9, 1, 'this is a product description 2', 'this is a info of the product being added', 2, 150.00, 1, 'Pkt', NULL, NULL, '2025-06-24 17:17:24', 100, '2025-06-24 17:17:24', 100),
	(10, 1, 'this is a product description 4', 'this is a info of the product being added', 2, 150.00, 1, 'Pkt', NULL, NULL, '2025-06-24 17:23:15', 100, '2025-06-24 17:23:15', 100),
	(11, 1, 'this is a product description 5', 'this is a info of the product being added', 2, 150.00, 1, 'Pkt', NULL, NULL, '2025-06-24 17:33:04', 100, '2025-06-24 17:33:04', 100),
	(15, 1, 'this is a product description 6', 'this is a info of the product being added', 2, 150.00, 1, 'Pkt', 'uploads/products/15-1750799830479.jpg', NULL, '2025-06-24 21:17:08', 1, '2025-06-24 21:17:10', 1),
	(19, 1, 'this is a product description 7', 'this is a info of the product being added', 2, 150.00, 1, 'Box', 'uploads/products/19-1750804231231.jpg', NULL, '2025-06-24 21:48:47', 1, '2025-06-24 22:30:31', 100);

-- Dumping structure for table capitalhardware.sales_return
CREATE TABLE IF NOT EXISTS `sales_return` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customerId` int unsigned NOT NULL,
  `returnDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `remarks` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdUserId` int unsigned NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedUserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `sales_return_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table capitalhardware.sales_return: ~0 rows (approximately)

-- Dumping structure for table capitalhardware.sales_return_items
CREATE TABLE IF NOT EXISTS `sales_return_items` (
  `salesReturnId` int unsigned NOT NULL,
  `itemId` int unsigned NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(12,2) NOT NULL,
  KEY `salesReturnId` (`salesReturnId`),
  KEY `itemId` (`itemId`),
  CONSTRAINT `sales_return_items_ibfk_1` FOREIGN KEY (`salesReturnId`) REFERENCES `sales_return` (`id`),
  CONSTRAINT `sales_return_items_ibfk_2` FOREIGN KEY (`itemId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table capitalhardware.sales_return_items: ~0 rows (approximately)

-- Dumping structure for table capitalhardware.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `nic` varchar(50) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `role` enum('admin','staff','customer','manager') NOT NULL,
  `password` varchar(255) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdUserId` int unsigned NOT NULL,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedUserId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`),
  KEY `idx_nic` (`nic`),
  KEY `idx_mobile` (`mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table capitalhardware.users: ~36 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `telephone`, `address`, `address2`, `city`, `nic`, `mobile`, `photo`, `role`, `password`, `isActive`, `createdAt`, `createdUserId`, `updatedAt`, `updatedUserId`) VALUES
	(1, 'Alice Admin', 'alice.admin@example.com', '0111234567', '123 Admin St', NULL, 'Metropolis', '900000000V', '0771234567', NULL, 'admin', '$2a$12$iS.7oNdD81amlv0JlJpdA.uIedCS4u7wvmGuXbFZjI0KxU.poPCnm', 1, '2025-06-17 16:16:25', 1, '2025-06-18 18:37:25', 1),
	(95, 'John Customer', 'user8@example.com', '0772175588', '123 Main St', 'Apt 4B', 'New York', '123456789v', '0772175588', 'https://example.com/profile.jpg', 'customer', '$2b$06$POyMuoq4RfOqobx2gQEBXeJxRDo7GsBLHR4t/gEHBts1gk2ZDhgK6', 1, '2025-06-18 20:01:00', 1, '2025-06-23 18:46:42', 1),
	(100, 'John Manager', 'user4@example.com', '0772175588', '123 Main St', 'Apt 4B', 'New York', '123456789v', '0772175588', 'https://example.com/profile.jpg', 'manager', '$2b$06$nNJq.MOJcHPCtYjFG4sbS.6wr5VOWqbdR6FqBJhPGhRqLCId1luKS', 1, '2025-06-18 20:10:04', 1, '2025-06-23 18:46:50', 1),
	(108, 'John Customer 2', 'custome2r@example.com', '0772175588', '234 Main St', 'Apt 4B', 'New York', '123456789v', '0772175588', 'https://example.com/profile.jpg', 'customer', '$2b$06$59p9kxLE8wR/zCXFH9ewd.15vmxgQDsiYZeni72U96M/l0r215dGi', 0, '2025-06-19 00:16:33', 1, '2025-06-23 18:46:59', 1),
	(109, 'staff david', 'staff@email.com', '0111288992', '12 main street', NULL, 'colombo', '123456789v', '0772175588', '109-1750739011091.jpg', 'staff', '$2b$06$Ty6RYuTQ/Sfj5lEEP9QnM.V5P0BaBxIgcC4tY/MKgb.H3GQ.Dv1Ny', 1, '2025-06-24 00:23:31', 100, '2025-06-24 00:23:31', 100),
	(110, 'staff 2 david', 'staff2@email.com', '0111288992', '12 main street', NULL, 'colombo', '123456789v', '0772175588', '110-1750740874461.jpg', 'staff', '$2b$06$Us.49nacfOlKelLGdK9juuWBp8NPUyJTWBgpLPsBfB8VI1ZA1RpHK', 1, '2025-06-24 00:27:23', 100, '2025-06-24 00:54:37', 100),
	(111, 'staff 3 david', 'staff3@email.com', '0111288992', '12 main street', NULL, 'colombo', '123456789v', '0772175588', NULL, 'staff', '$2b$06$49PCB2pd1JxEXrv3vJUwDeYTsVTVmh0xbxM9XBBeKGLOY5DyYDJ9.', 1, '2025-06-24 00:46:46', 100, '2025-06-24 00:46:46', 100),
	(112, 'staff 4 david', 'staff4@email.com', '0111288992', '12 main street', NULL, 'colombo', '123456789v', '0772175588', '112-1750740446840.jpg', 'staff', '$2b$06$7HxWYjOGgiBuBARtrlTnSOAAOFAwHRxJ5F9Q.oTH0wXlnI6.7nNra', 1, '2025-06-24 00:47:26', 100, '2025-06-24 00:47:28', 100),
	(114, 'customer azad', 'customer@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', './uploads/users/114-1750742111759.png', 'customer', '$2b$06$6FIUz5UDlE2hVUlIvSZDR.aLf75mKMv52rtU8BlUpHLiQYh7dkBbu', 1, '2025-06-24 01:15:11', 100, '2025-06-24 01:15:11', 100),
	(117, 'customer azad', 'customer3@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', './uploads/users/117-1750742207954.png', 'customer', '$2b$06$WFFpY7/DI84Qj0/La.VTlubaYneZ.1TUw9WfS.JXMNusTptBxANxS', 1, '2025-06-24 01:16:47', 100, '2025-06-24 01:16:47', 100),
	(120, 'customer azad', 'customer4@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', './uploads/users/120-1750742384168.png', 'customer', '$2b$06$xHrCT237C.tA3.1i/t2dDOpwTBXzdPChu6Yksme7rN.Xr536BK1ay', 1, '2025-06-24 01:19:44', 100, '2025-06-24 01:19:44', 100),
	(122, 'customer azad', 'customer5@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', './uploads/users/122-1750742566200.png', 'customer', '$2b$06$W2F88YAc1DUsVo35GmYnd..Fz/r2NIyCKxd/Lh9/rlTCQ9mR5W42W', 1, '2025-06-24 01:22:46', 100, '2025-06-24 01:22:46', 100),
	(124, 'customer azad', 'customer6@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', './uploads/users/124-1750742871953.png', 'customer', '$2b$06$UOXNCr2p5WeGcNxgyYlcnu7Yk7TraQIsYLtuDIIChZLGnOMvI92hW', 1, '2025-06-24 01:27:51', 1, '2025-06-24 01:27:51', 1),
	(125, 'customer azad', 'customer7@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', './uploads/users/125-1750744187446.jpg', 'customer', '$2b$06$u23DBHwDao.5eN93.sW/Ge2uLWk7VP8S8Wr.NAIfNrs.e.koE2id6', 1, '2025-06-24 01:29:00', 1, '2025-06-24 01:49:47', 1),
	(127, 'staff 4 david', 'manager3@email.com', '0111288992', '12 main street', NULL, 'colombo', '123456789v', '0772175588', '', 'manager', '$2b$06$LbnKWrx.E3dMFrsDPDtJGu6IqR95kLky3iGsOzRRdnzL3QIRur.BK', 1, '2025-06-25 19:05:44', 1, '2025-06-25 19:05:44', 1),
	(128, 'staff 5 david', 'manager5@email.com', '0111288992', '12 main street', NULL, 'colombo', '123456789v', '0772175588', '', 'manager', '$2b$06$GBzUPZZX/dH.hApOqIVSIuE9lLyYNhz6gzQpqJL1oaTqqEP8j20jq', 1, '2025-06-25 19:18:46', 1, '2025-06-25 19:18:46', 1),
	(130, 'staff 6 david', 'manager6@email.com', '0111288992', '12 main street', NULL, 'colombo', '123456789v', '0772175588', 'uploads/users/undefined-1750893617609.jpg', 'manager', '$2b$06$ntUpxx8YaOvxNAGhmViHn.nCX6qalaUBkiBL6siqrPJzuX0lqx9lG', 1, '2025-06-25 19:20:17', 1, '2025-06-25 19:20:17', 1),
	(131, 'staff 7 david', 'manager7@email.com', '0111288992', '12 main street', NULL, 'colombo', '123456789v', '0772175588', 'uploads/users/131-1750898851693.jpg', 'manager', '$2b$06$PU4h7Rxp/sPtLMuzqsl03ucNrpAacgI6OXheIR9FUTQJgXlJPBEp2', 1, '2025-06-25 20:47:31', 100, '2025-06-25 20:47:31', 100),
	(132, 'staff 7 david', 'manager9@email.com', '0111288992', '12 main street', NULL, 'colombo', '123456789v', '0772175588', 'uploads/users/132-1750899775371.jpg', 'manager', '$2b$06$b/tumBaF8XUZ0hFa9kEK8ujSrI5QDmkKf3.zdvOQAmOnqaUDauepG', 1, '2025-06-25 21:02:28', 100, '2025-06-25 21:02:56', 100),
	(133, 'staff 7 david', 'manager8@email.com', '0111288992', '12 main street', NULL, 'colombo', '123456789v', '0772175588', 'uploads/users/133-1750910634191.jpg', 'manager', '$2b$06$t6g2kaZVxnehB4rBpZDmtu9qIslIy0Na3m0g7GPQcwWuMaSH2Yy66', 1, '2025-06-26 00:03:54', 100, '2025-06-26 00:03:54', 100),
	(135, 'staff 9 david', 'manager10@email.com', '0111288992', '12 main street', NULL, 'colombo', '123456789v', '0772175588', 'uploads/users/135-1750912603022.jpg', 'manager', '$2b$06$3nJ13G4tSMQK8iGltPsSquu8EZKfyiVprPBjBJoT56bGPbdeBpZtm', 1, '2025-06-26 00:36:43', 100, '2025-06-26 00:36:43', 100),
	(136, 'staff 11 david', 'manager11@email.com', '0111288992', '12 main street', NULL, 'Kurunegala', '123456789v', '0772175588', 'uploads/users/136-1750999394564.jpg', 'staff', '$2b$06$4YTDdC9A35YmtdImmsjRDOm1ahECDtGXRnn0VOE13RNWH7BNDwFOW', 1, '2025-06-26 00:37:39', 100, '2025-06-27 00:43:14', 1),
	(137, 'customer azad 32', 'customer8@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', 'uploads/users/137-1750922102633.jpg', 'customer', '$2b$06$VQbHYzjUNioGiE40u1aHtO1RWchBBjdOUZnreXZX9EZFS2bEIJhuG', 1, '2025-06-26 03:15:02', 1, '2025-06-26 03:15:02', 1),
	(140, 'staff 11 david', 'manager90@email.com', '0111288992', '12 main street', NULL, 'colombo', '123456789v', '0772175588', 'uploads/users/140-1750999324670.jpg', 'staff', '$2b$06$wGUrjafexdJRdpr3JoCQtepcnlSUHUwtQfENUR4xDZ2mNNJbdTvI2', 1, '2025-06-27 00:42:04', 1, '2025-06-27 00:42:04', 1),
	(144, 'customer azad 3', 'customer9@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', NULL, 'customer', '$2b$06$RQ.99nFI4sPoZoV9acrWZuuSTPuh2hM96mU6cmbJgtrodAMUCaAfK', 1, '2025-06-27 00:55:47', 1, '2025-06-27 00:55:47', 1),
	(146, 'customer azad 3', 'customer10@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', NULL, 'customer', '$2b$06$Jxk6HtmRIPcEEdxevzkcguqBLXdnMw2hI9zD2UGmx3jETtzaofP.q', 1, '2025-06-27 00:57:31', 1, '2025-06-27 00:57:31', 1),
	(147, 'customer azad 3', 'customer11@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', NULL, 'customer', '$2b$06$MGcmms.ZOQQL5rusImFrsuI3uUTLUvbt6fM2cYduoQLVBGqH3.oG.', 1, '2025-06-27 00:58:10', 1, '2025-06-27 00:58:10', 1),
	(149, 'customer azad 3', 'customer12@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', NULL, 'customer', '$2b$06$gacGh326NOF93GA08p6RO.dZ8l4BpJbW5QvEEGzxVy4L8uojsaGue', 1, '2025-06-27 01:02:41', 1, '2025-06-27 01:02:41', 1),
	(150, 'customer azad 3', 'customer13@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', NULL, 'customer', '$2b$06$UpEsH/UoKu3TldhWjMJQiumlL9gos66e0Gr6yThwMmOtMHnmS9rme', 1, '2025-06-27 01:22:54', 1, '2025-06-27 01:22:54', 1),
	(152, 'customer azad 3', 'customer14@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', NULL, 'customer', '$2b$06$iaxD8HVzEFenPRaba3foNunyr59T1ToDHHwEECERyR7nX9Uv6iv4S', 1, '2025-06-27 01:24:58', 1, '2025-06-27 01:24:58', 1),
	(153, 'customer azad 3', 'customer15@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', NULL, 'customer', '$2b$06$a5hMlCMvsxM5uCaoqbnoXOzxIJy3yxkE8h6fS8tZ9SSlnOOBQuiFS', 1, '2025-06-27 01:28:48', 1, '2025-06-27 01:28:48', 1),
	(156, 'customer azad 3', 'customer16@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', NULL, 'customer', '$2b$06$OgzwFGonnLeE67U81LhZBexhr4iUNGybjIz1TDl8YsAnGtvMkTTFe', 1, '2025-06-27 01:31:14', 1, '2025-06-27 01:31:14', 1),
	(164, 'customer azad 3', 'customer18@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', NULL, 'customer', '$2b$06$yok3krucuqTJABcq81cY6.Z2x3gFl8GHCcCT79S.nEg1l45VcTUya', 1, '2025-06-27 01:43:07', 1, '2025-06-27 01:43:07', 1),
	(165, 'customer azad 3', 'customer19@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', NULL, 'customer', '$2b$06$9KF7Yw/rCXLkT65bmej3Y.8hDdKyXm2EoLhZHzwb86pvraTcHIj.e', 1, '2025-06-27 01:45:04', 1, '2025-06-27 01:45:04', 1),
	(168, 'customer azad 3', 'customer20@email.com', '0112323232', '123 main street', NULL, 'kandy', '886676662v', '0772175588', 'uploads/users/168-1751003162081.jpg', 'customer', '$2b$06$5IPERY2CYdnDIsZUBlcMieq6tfx2a08uocBFRh6VxRECnWx.izdAi', 0, '2025-06-27 01:46:02', 100, '2025-06-27 06:43:18', 1),
	(171, 'customer azad 3', 'customer21@email.com', '0112323232', '123 main street', NULL, 'Akurana', '886676662v', '0772175588', 'uploads/users/171-1751020397758.jpg', 'customer', '$2b$06$FI1TEgTyYaqmF9zTnAreOuYvUhcCGCPoiMWmz3i0eu1k9pdaV1o4O', 1, '2025-06-27 01:51:06', 100, '2025-06-27 06:35:19', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

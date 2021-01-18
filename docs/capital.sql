-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Jan 18, 2021 at 03:16 AM
-- Server version: 8.0.18
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capital`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `City` varchar(20) NOT NULL,
  `Telephone` varchar(10) NOT NULL,
  `NIC` varchar(12) NOT NULL,
  `Mobile` varchar(10) NOT NULL,
  `CreditLimit` double NOT NULL,
  `Photo` text,
  `Status` tinyint(4) NOT NULL DEFAULT '1',
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) NOT NULL,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`Id`, `Name`, `Address`, `City`, `Telephone`, `NIC`, `Mobile`, `CreditLimit`, `Photo`, `Status`, `CreatedBy`, `CreatedAt`, `UpdatedBy`) VALUES
(1, 'azad', '320 perecy ro', 'Matale', '', '', '', 0, NULL, 0, 0, '2021-01-09 15:05:40', 0),
(5, 'test 3', '', 'Colombo 12', '', '', '', 0, NULL, 1, 0, '2021-01-10 04:48:50', 0),
(6, 'azad', '', '', '', '', '', 0, NULL, 1, 0, '2021-01-10 05:44:15', 0);

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
CREATE TABLE IF NOT EXISTS `invoice` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CustId` int(11) NOT NULL,
  `InoviceDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Discount` double NOT NULL DEFAULT '0',
  `Remark` text NOT NULL,
  `Status` tinyint(4) NOT NULL DEFAULT '0',
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) NOT NULL,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`Id`, `CustId`, `InoviceDate`, `Discount`, `Remark`, `Status`, `CreatedBy`, `CreatedAt`, `UpdatedBy`) VALUES
(4, 3, '2021-01-10 17:19:29', 10, '', 0, 2, '2021-01-10 17:19:29', 2),
(5, 3, '2021-01-15 17:06:01', 10, '', 0, 2, '2021-01-15 17:06:01', 2),
(6, 3, '2021-01-15 17:08:30', 10, '', 0, 2, '2021-01-15 17:08:30', 2),
(7, 3, '2021-01-15 17:13:23', 10, '', 0, 2, '2021-01-15 17:13:23', 2),
(8, 3, '2021-01-15 17:30:27', 10, '', 0, 2, '2021-01-15 17:30:27', 2),
(9, 3, '2021-01-15 17:32:06', 10, '', 0, 2, '2021-01-15 17:32:06', 2),
(10, 3, '2021-01-15 17:34:18', 10, '', 0, 2, '2021-01-15 17:34:18', 2),
(11, 3, '2021-01-15 17:34:50', 10, '', 0, 2, '2021-01-15 17:34:50', 2),
(12, 3, '2021-01-15 17:36:20', 10, '', 2, 2, '2021-01-15 17:36:20', 2),
(14, 3, '2021-01-17 17:21:00', 10, '', 0, 2, '2021-01-17 17:21:00', 2);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_items`
--

DROP TABLE IF EXISTS `invoice_items`;
CREATE TABLE IF NOT EXISTS `invoice_items` (
  `InvoiceId` int(11) NOT NULL,
  `ItemId` int(11) NOT NULL,
  `Price` double NOT NULL,
  `Quantity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `invoice_items`
--

INSERT INTO `invoice_items` (`InvoiceId`, `ItemId`, `Price`, `Quantity`) VALUES
(3, 3, 3, 3),
(14, 2, 100, 2),
(14, 4, 10, 20),
(0, 2, 100, 2),
(0, 4, 10, 20),
(0, 2, 100, 2),
(0, 4, 10, 20),
(0, 2, 999, 2),
(0, 4, 9, 20),
(0, 2, 999, 2),
(0, 4, 9, 20),
(4, 2, 999, 2),
(4, 4, 9, 20);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
CREATE TABLE IF NOT EXISTS `item` (
  `Id` int(11) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `Info` text NOT NULL,
  `Category` varchar(50) NOT NULL,
  `Price` double NOT NULL,
  `Brand` varchar(50) NOT NULL,
  `Unit` varchar(10) NOT NULL DEFAULT 'Nos',
  `Status` tinyint(4) NOT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) NOT NULL,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CustId` int(11) NOT NULL,
  `OrderDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Remark` text NOT NULL,
  `Status` tinyint(4) NOT NULL DEFAULT '0',
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) NOT NULL,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`Id`, `CustId`, `OrderDate`, `Remark`, `Status`, `CreatedBy`, `CreatedAt`, `UpdatedBy`) VALUES
(14, 3, '2021-01-17 17:32:36', '', 0, 2, '2021-01-17 17:32:36', 2),
(15, 3, '2021-01-17 17:48:37', '', 0, 2, '2021-01-17 17:48:37', 2);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `OrderId` int(11) NOT NULL,
  `ItemId` int(11) NOT NULL,
  `Price` double NOT NULL,
  `Quantity` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`OrderId`, `ItemId`, `Price`, `Quantity`) VALUES
(0, 2, 999, 2),
(0, 4, 10, 20),
(15, 2, 999, 2),
(15, 4, 10, 20),
(0, 2, 88, 2),
(0, 4, 10, 20),
(0, 2, 88, 2),
(0, 4, 10, 20),
(0, 2, 88, 2),
(0, 4, 10, 20);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
CREATE TABLE IF NOT EXISTS `payments` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CustId` int(11) NOT NULL,
  `PaymentDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Cash` double NOT NULL DEFAULT '0',
  `Remark` text NOT NULL,
  `Type` tinyint(4) NOT NULL DEFAULT '0',
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) NOT NULL,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `system_user`
--

DROP TABLE IF EXISTS `system_user`;
CREATE TABLE IF NOT EXISTS `system_user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Address` varchar(100) NOT NULL,
  `Role` tinyint(4) NOT NULL,
  `Mobile` varchar(10) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `Status` tinyint(4) NOT NULL DEFAULT '1',
  `CreatedBy` int(11) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedBy` int(11) NOT NULL,
  `UpdatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `system_user`
--

INSERT INTO `system_user` (`Id`, `Name`, `Address`, `Role`, `Mobile`, `Email`, `password`, `Status`, `CreatedBy`, `CreatedAt`, `UpdatedBy`) VALUES
(1, 'Azad', '', 0, '', 'test', '', 0, 0, '2021-01-10 13:58:18', 0),
(2, 'Azad', '', 0, '', 'test@test.com', '', 1, 1, '2021-01-10 14:15:17', 1),
(3, 'Azad', '', 0, '', 'azad@test.com', '', 1, 2, '2021-01-10 16:29:21', 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_credential`
--

DROP TABLE IF EXISTS `user_credential`;
CREATE TABLE IF NOT EXISTS `user_credential` (
  `UserId` int(11) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `UserRole` tinyint(4) NOT NULL,
  KEY `UserId` (`UserId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

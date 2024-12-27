-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2024 at 07:27 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `equip9_db`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_user` (IN `firstName` VARCHAR(50), IN `lastName` VARCHAR(50), IN `mobileNumber` VARCHAR(10), IN `hashedPassword` TEXT, IN `createdBy` VARCHAR(50))   BEGIN
    INSERT INTO users (
        first_name, 
        last_name, 
        mobile_number, 
        password, 
        created_date, 
        created_by
    ) 
    VALUES (
        firstName, 
        lastName, 
        mobileNumber, 
        hashedPassword, 
        UTC_TIMESTAMP(), 
        createdBy
    );
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `mobile_number` varchar(10) NOT NULL,
  `password` text NOT NULL,
  `created_date` datetime DEFAULT current_timestamp(),
  `created_by` varchar(50) DEFAULT NULL,
  `updated_date` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_by` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `mobile_number`, `password`, `created_date`, `created_by`, `updated_date`, `updated_by`) VALUES
(1, 'John', 'Doe', '1234567890', '$2a$10$QNG.z19n.RFgJ1FFcG0mCeU0IAAtQO8yBCsoL4sxy1jS0Zi1inB7C', '2024-12-26 17:44:57', 'admin', '2024-12-26 23:14:57', NULL),
(2, 'Pratik', 'V', '7892505936', '$2a$10$A4uSVFWN/qZqwUZAlcN2ZOyHnPl/YTSRbtb0EeeZ6KUhj53wdnuNO', '2024-12-26 18:03:50', 'admin', '2024-12-26 23:33:50', NULL),
(3, 'Arjun', 'Kapoor', '9876543210', '$2a$10$OfN1XIscJXuOjhJmaRc/LuPtB0fpP0n28Rp.4yuBHijE8NTSwdC.K', '2024-12-26 18:26:40', 'Password', '2024-12-26 23:56:40', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile_number` (`mobile_number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

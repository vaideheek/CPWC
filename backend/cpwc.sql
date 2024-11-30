-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2024 at 01:23 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cpwc`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `BookingID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ServiceID` int(11) DEFAULT NULL,
  `BookingDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `ScheduledDate` date DEFAULT NULL,
  `ScheduledTime` time DEFAULT NULL,
  `Status` enum('Pending','Confirmed','Cancelled','Completed') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`BookingID`, `UserID`, `ServiceID`, `BookingDate`, `ScheduledDate`, `ScheduledTime`, `Status`) VALUES
(1, 1, 1, '2024-11-29 12:12:17', '2024-12-01', '10:00:00', 'Confirmed'),
(2, 2, 2, '2024-11-29 12:12:17', '2024-12-03', '14:00:00', 'Pending'),
(3, 3, 3, '2024-11-29 12:12:17', '2024-12-05', '09:00:00', 'Confirmed'),
(4, 4, 4, '2024-11-29 12:12:17', '2024-12-07', '16:00:00', 'Confirmed'),
(5, 5, 5, '2024-11-29 12:12:17', '2024-12-10', '12:00:00', 'Pending'),
(6, 6, 6, '2024-11-29 12:12:17', '2024-12-12', '08:00:00', 'Confirmed'),
(7, 7, 7, '2024-11-29 12:12:17', '2024-12-15', '18:00:00', 'Pending'),
(8, 8, 8, '2024-11-29 12:12:17', '2024-12-17', '13:00:00', 'Confirmed'),
(9, 9, 9, '2024-11-29 12:12:17', '2024-12-20', '10:00:00', 'Pending'),
(10, 10, 10, '2024-11-29 12:12:17', '2024-12-22', '14:00:00', 'Confirmed');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `CategoryID` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`CategoryID`, `Name`, `Description`) VALUES
(1, 'Moving', 'Residential and commercial moving services.'),
(2, 'Carpentry', 'Woodworking, furniture design, and repairs.'),
(3, 'Cleaning', 'Cleaning services for homes and offices.'),
(4, 'Plumbing', 'Plumbing installation and repair services.'),
(5, 'Electrical', 'Electrical installation, repairs, and maintenance.'),
(6, 'Landscaping', 'Lawn care and landscaping services.'),
(7, 'Event Planning', 'Planning and organizing various events.'),
(8, 'Cooking', 'Meal preparation and catering services.'),
(9, 'Photography', 'Photography services for events and portraits.'),
(10, 'Home Improvement', 'Renovation and improvement services for homes.');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `PaymentID` int(11) NOT NULL,
  `BookingID` int(11) DEFAULT NULL,
  `Amount` decimal(10,2) DEFAULT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `Status` enum('Pending','Completed','Failed') DEFAULT NULL,
  `PaymentMethod` enum('CreditCard','DebitCard','PayPal','BankTransfer') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`PaymentID`, `BookingID`, `Amount`, `Date`, `Status`, `PaymentMethod`) VALUES
(1, 1, '200.00', '2024-11-29 12:14:30', 'Completed', 'CreditCard'),
(2, 2, '500.00', '2024-11-29 12:14:30', 'Pending', 'DebitCard'),
(3, 3, '100.00', '2024-11-29 12:14:30', 'Completed', 'PayPal'),
(4, 4, '150.00', '2024-11-29 12:14:30', 'Completed', 'BankTransfer'),
(5, 5, '250.00', '2024-11-29 12:14:30', 'Pending', 'CreditCard'),
(6, 6, '120.00', '2024-11-29 12:14:30', 'Completed', 'DebitCard'),
(7, 7, '1500.00', '2024-11-29 12:14:30', 'Completed', 'PayPal'),
(8, 8, '200.00', '2024-11-29 12:14:30', 'Pending', 'BankTransfer'),
(9, 9, '1000.00', '2024-11-29 12:14:30', 'Completed', 'CreditCard'),
(10, 10, '3000.00', '2024-11-29 12:14:30', 'Completed', 'DebitCard');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `RatingID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ServiceID` int(11) DEFAULT NULL,
  `RatingScore` decimal(2,1) DEFAULT NULL,
  `Feedback` text DEFAULT NULL,
  `RatingDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `rating`
--

INSERT INTO `rating` (`RatingID`, `UserID`, `ServiceID`, `RatingScore`, `Feedback`, `RatingDate`) VALUES
(1, 1, 1, '4.5', 'Very good moving service, would recommend!', '2024-11-29 12:12:56'),
(2, 2, 2, '4.8', 'The carpentry was excellent, the furniture fits perfectly!', '2024-11-29 12:12:56'),
(3, 3, 3, '4.7', 'Great home cleaning service, very thorough.', '2024-11-29 12:12:56'),
(4, 4, 4, '4.2', 'Plumbing was fixed, but took a bit longer than expected.', '2024-11-29 12:12:56'),
(5, 5, 5, '5.0', 'Excellent electrical work, very professional!', '2024-11-29 12:12:56'),
(6, 6, 6, '4.3', 'Good landscaping, but could have done better with the garden design.', '2024-11-29 12:12:56'),
(7, 7, 7, '4.9', 'Amazing event planning, everything went smoothly.', '2024-11-29 12:12:56'),
(8, 8, 8, '4.6', 'Food was great, but delivery was slightly delayed.', '2024-11-29 12:12:56'),
(9, 9, 9, '5.0', 'Perfect wedding photography, captured all the moments beautifully!', '2024-11-29 12:12:56'),
(10, 10, 10, '4.8', 'Home renovation was great, but a little over budget.', '2024-11-29 12:12:56');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `ServiceID` int(11) NOT NULL,
  `ProviderID` int(11) DEFAULT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `Duration` int(11) DEFAULT NULL,
  `Status` enum('Active','Inactive') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`ServiceID`, `ProviderID`, `CategoryID`, `Title`, `Description`, `Price`, `Duration`, `Status`) VALUES
(1, 1, 1, 'Moving Services', 'Complete moving service including packing and transportation.', '200.00', 180, 'Active'),
(2, 2, 2, 'Furniture Carpentry', 'Custom furniture design and construction.', '500.00', 240, 'Active'),
(3, 3, 3, 'House Cleaning', 'Comprehensive house cleaning services, including deep cleaning.', '100.00', 120, 'Active'),
(4, 4, 4, 'Plumbing Services', 'Plumbing installation and repairs for homes and businesses.', '150.00', 90, 'Active'),
(5, 5, 5, 'Electrical Services', 'Electrical wiring and installation for residential and commercial buildings.', '250.00', 180, 'Active'),
(6, 6, 6, 'Landscaping', 'Lawn care, garden maintenance, and landscaping services.', '120.00', 120, 'Active'),
(7, 7, 7, 'Event Planning', 'Complete event planning and coordination services.', '1500.00', 480, 'Active'),
(8, 8, 8, 'Catering Services', 'Catering services for small and large events.', '200.00', 240, 'Active'),
(9, 9, 9, 'Wedding Photography', 'Professional wedding photography services.', '1000.00', 300, 'Active'),
(10, 10, 10, 'Home Renovation', 'Home renovation and improvement services for kitchens, bathrooms, and more.', '3000.00', 720, 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `serviceprovider`
--

CREATE TABLE `serviceprovider` (
  `ProviderID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ServiceType` varchar(100) DEFAULT NULL,
  `Rating` decimal(2,1) DEFAULT NULL,
  `Location` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `serviceprovider`
--

INSERT INTO `serviceprovider` (`ProviderID`, `UserID`, `ServiceType`, `Rating`, `Location`) VALUES
(1, 3, 'Moving', '4.5', 'Budapest'),
(2, 5, 'Carpentry', '4.8', 'Szeged'),
(3, 6, 'Cleaning', '4.7', 'Debrecen'),
(4, 8, 'Plumbing', '4.2', 'Miskolc'),
(5, 10, 'Electrical', '5.0', 'Pécs'),
(6, 4, 'Moving', '4.6', 'Budapest'),
(7, 7, 'Cleaning', '4.4', 'Szeged'),
(8, 1, 'Moving', '4.0', 'Debrecen'),
(9, 9, 'Carpentry', '4.3', 'Miskolc'),
(10, 2, 'Plumbing', '3.9', 'Pécs');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Address` text DEFAULT NULL,
  `Role` enum('Customer','Provider') DEFAULT NULL,
  `RegistrationDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `TaxID` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `Name`, `Email`, `Phone`, `Password`, `Address`, `Role`, `RegistrationDate`, `TaxID`) VALUES
(1, 'Alice Smith', 'alice@example.com', '555-1234', '$2y$10$NYqvPYeUuFZLW4m7v.iX3OyKN2X4uZ/GHvP69wQddZLCyn0W724mK', 'Budapest', 'Customer', '2024-11-29 12:06:49', NULL),
(2, 'Bob Johnson', 'bob@example.com', '555-2345', '$2y$10$Zkc15HUAO1Ur8/FGjCohseHTXVbTozIDh.vP9PVHb.vIwt2thYIU6', 'Szeged', 'Customer', '2024-11-29 12:06:49', NULL),
(3, 'Charlie Brown', 'charlie@example.com', '555-3456', '$2y$10$D44saPS9kOxUOtfvKdMKqeyzIRL4frQORXnvI3JIbJYzV9Lahmz5O', 'Budapest', 'Provider', '2024-11-29 12:06:49', 'C789'),
(4, 'David Lee', 'david@example.com', '555-4567', '$2y$10$y/A6N71.zw8OKBwMQaSpZ.A97ztgTOlLmXcyGxKdjoPuDiZb3cQfm', 'Miskolc', 'Customer', '2024-11-29 12:06:49', NULL),
(5, 'Eva Green', 'eva@example.com', '555-5678', '$2y$10$MF46NILEpa.Eqfh30XO9DeO1ISoMIfBrinRGxDHh8EaBgcB4oqCeO', 'Pécs', 'Provider', '2024-11-29 12:06:49', 'E654'),
(6, 'Frank White', 'frank@example.com', '555-6789', '$2y$10$tSpGhiuwM.HnRkUOoT0TieFLO50XYa7emb/aWytO2O7zCw2JszpTK', 'Budapest', 'Provider', '2024-11-29 12:06:49', 'F987'),
(7, 'Grace Lee', 'grace@example.com', '555-7890', '$2y$10$XzERu3Iv/alFCKtmk7kgXOmMTijIwI645tfbrIGYeML3L9lT18Ud.', 'Szeged', 'Customer', '2024-11-29 12:06:49', NULL),
(8, 'Hank Black', 'hank@example.com', '555-8901', '$2y$10$3uAxoSiTljwS01AwJJxW3.i/HuoeL01eH2c85/5fQcXsQs3DzxT2y', 'Debrecen', 'Customer', '2024-11-29 12:06:49', NULL),
(9, 'Ivy Clark', 'ivy@example.com', '555-9012', '$2y$10$3T0A/EIZrkyUe3aN8bK/Le2wQYZFYYv3e17vH1nqNvjY3lFbRWBpG', 'Miskolc', 'Provider', '2024-11-29 12:06:49', 'I2022'),
(10, 'Jack Harris', 'jack@example.com', '555-0123', '$2y$10$27P9QdoP6uWX.qCR6j6ld./Ipx/y2QEMP8YYd9qSQ8GEgdxbU/nTC', 'Pécs', 'Customer', '2024-11-29 12:06:49', NULL),
(11, NULL, 'v@gmail.com', NULL, '$2y$10$ZVniQ.JYRaF47E3l6uAc2uiXPRQwHw52WVM9s1rMm4bxNJv8EvHmK', NULL, 'Provider', '2024-11-29 13:49:21', '12345'),
(12, 'Vaidehee', 'vk@gmail.com', '123456', '$2y$10$YjORKm.VavFIFWQYHmEa5en7F130SzoJW8IHXXJj7VqUowTrnMExW', 'Debrecen', 'Provider', '2024-11-29 13:50:04', '12345');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`BookingID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `ServiceID` (`ServiceID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryID`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`PaymentID`),
  ADD UNIQUE KEY `BookingID` (`BookingID`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`RatingID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `ServiceID` (`ServiceID`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`ServiceID`),
  ADD KEY `ProviderID` (`ProviderID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- Indexes for table `serviceprovider`
--
ALTER TABLE `serviceprovider`
  ADD PRIMARY KEY (`ProviderID`),
  ADD UNIQUE KEY `UserID` (`UserID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `BookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `PaymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `RatingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `ServiceID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `serviceprovider`
--
ALTER TABLE `serviceprovider`
  MODIFY `ProviderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`ServiceID`) REFERENCES `service` (`ServiceID`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`BookingID`) REFERENCES `booking` (`BookingID`);

--
-- Constraints for table `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`),
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`ServiceID`) REFERENCES `service` (`ServiceID`);

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`ProviderID`) REFERENCES `serviceprovider` (`ProviderID`),
  ADD CONSTRAINT `service_ibfk_2` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`);

--
-- Constraints for table `serviceprovider`
--
ALTER TABLE `serviceprovider`
  ADD CONSTRAINT `serviceprovider_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

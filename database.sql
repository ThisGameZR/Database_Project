-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: plasticshop
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `CID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(45) NOT NULL,
  `MiddleName` varchar(10) DEFAULT NULL,
  `LastName` varchar(45) NOT NULL,
  `Contact` varchar(45) NOT NULL,
  `Points` int NOT NULL,
  PRIMARY KEY (`CID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Jaylen','S.','Ponce','+1-202-555-0194',0),(2,'Toby','E.','Newton','+1-202-555-0153',0),(3,'Asma','J.','Goulding','+1-202-555-0103',0),(4,'Pamela','','Pearson','+1-202-555-0143',0),(5,'Caio','','Newton','+66-955-567-724',0);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_addr`
--

DROP TABLE IF EXISTS `customer_addr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_addr` (
  `CAddrID` int NOT NULL AUTO_INCREMENT,
  `CID` int DEFAULT NULL,
  `Address` varchar(255) NOT NULL,
  `City` varchar(45) NOT NULL,
  `Province` varchar(45) NOT NULL,
  `PostalCode` varchar(45) NOT NULL,
  `Country` varchar(45) NOT NULL,
  `condition` tinyint DEFAULT '1',
  PRIMARY KEY (`CAddrID`),
  KEY `fk_CUSTOMER_ADDR_CUSTOMER1_idx` (`CID`),
  CONSTRAINT `fk_CUSTOMER_ADDR_CUSTOMER1` FOREIGN KEY (`CID`) REFERENCES `customer` (`CID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_addr`
--

LOCK TABLES `customer_addr` WRITE;
/*!40000 ALTER TABLE `customer_addr` DISABLE KEYS */;
INSERT INTO `customer_addr` VALUES (1,1,'2156 Cook Hill Road , Hartford','Hartford','Connecticut','06103','United States',1),(2,2,'367  Emeral Dreams Drive','Streator','Illinois','61364','United States',1),(3,3,'588  Spring Haven Trail','Montclair','New Jersey','07042','United States',1),(4,4,'3242  Jarvisville Road','Freeport','New York','11520','United States',1),(5,5,'586  Spring Haven Trail','Montclair','New Jersey','07042','United States',1),(16,1,'3456  Straford Park','Harlan','Kentucky','40831','United States',1),(20,4,'2534  Johnny Lane','Milwaukee','Wisconsin','53202','United States',0),(23,2,'3708  Fire Access Road','LINCOLN','Nebraska','68506','United States',0);
/*!40000 ALTER TABLE `customer_addr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `Dno` int NOT NULL AUTO_INCREMENT,
  `DeptMgr` int DEFAULT NULL,
  `DeptName` varchar(45) NOT NULL,
  PRIMARY KEY (`Dno`),
  KEY `fk_DEPARTMENT_EMPLOYEE1_idx` (`DeptMgr`),
  CONSTRAINT `fk_DEPARTMENT_EMPLOYEE1` FOREIGN KEY (`DeptMgr`) REFERENCES `employee` (`EID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (100,1000003,'Marketing'),(200,2000001,'Business and Financial');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department_position`
--

DROP TABLE IF EXISTS `department_position`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department_position` (
  `Dno` int NOT NULL,
  `Position` varchar(255) NOT NULL,
  PRIMARY KEY (`Position`),
  KEY `fk_department_position_dno1_idx` (`Dno`),
  CONSTRAINT `fk_department_position_dno1` FOREIGN KEY (`Dno`) REFERENCES `department` (`Dno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_position`
--

LOCK TABLES `department_position` WRITE;
/*!40000 ALTER TABLE `department_position` DISABLE KEYS */;
INSERT INTO `department_position` VALUES (100,'Sale Manager'),(100,'Sale Officer'),(100,'Warehouse Officer'),(200,'Financial Manager'),(200,'Financial Secretary');
/*!40000 ALTER TABLE `department_position` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dept_location`
--

DROP TABLE IF EXISTS `dept_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dept_location` (
  `Dno` int NOT NULL,
  `Address` varchar(255) NOT NULL,
  KEY `fk_DEPT_LOCATION_DEPARTMENT1_idx` (`Dno`),
  CONSTRAINT `fk_DEPT_LOCATION_DEPARTMENT1` FOREIGN KEY (`Dno`) REFERENCES `department` (`Dno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dept_location`
--

LOCK TABLES `dept_location` WRITE;
/*!40000 ALTER TABLE `dept_location` DISABLE KEYS */;
/*!40000 ALTER TABLE `dept_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `EID` int NOT NULL,
  `FirstName` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `MiddleName` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `LastName` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Position` varchar(255) NOT NULL,
  `Salary` int NOT NULL,
  `Dno` int DEFAULT NULL,
  `condition` tinyint DEFAULT '1',
  PRIMARY KEY (`EID`),
  KEY `fk_EMPLOYEE_DEPARTMENT1_idx` (`Dno`),
  KEY `fk_EMPLOYEE_POSITION1_idx` (`Position`),
  CONSTRAINT `fk_EMPLOYEE_DEPARTMENT1` FOREIGN KEY (`Dno`) REFERENCES `department` (`Dno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_EMPLOYEE_POSITION1` FOREIGN KEY (`Position`) REFERENCES `department_position` (`Position`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1000001,'John','','Smith','Sale Officer',20000,100,1),(1000002,'Berry','','Barton','Sale Officer',20000,100,1),(1000003,'Albert','','Wesker','Sale Manager',50000,100,1),(2000001,'Anthony','M','Smith','Financial Manager',50000,200,1),(2000002,'Melvin','M','Fitzgerald','Financial Secretary',35000,200,1);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_account`
--

DROP TABLE IF EXISTS `employee_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_account` (
  `EID` int NOT NULL,
  `Password` varchar(255) NOT NULL,
  KEY `fk_EMPLOYEE_ACCOUNT_EMPLOYEE_idx` (`EID`),
  CONSTRAINT `fk_EMPLOYEE_ACCOUNT_EMPLOYEE` FOREIGN KEY (`EID`) REFERENCES `employee` (`EID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_account`
--

LOCK TABLES `employee_account` WRITE;
/*!40000 ALTER TABLE `employee_account` DISABLE KEYS */;
INSERT INTO `employee_account` VALUES (1000001,'$2b$10$7QVsn26bkc59OAFGWrhQ3eQq0j5OSgj83.yQnVURIL7K0UJv4H0Q.'),(1000002,'$2b$10$IYd3SdG/Riw37L/EBWqTFefuzvRBrWK67/UIlBJD.ii6i4mIyqdQ.'),(1000003,'$2b$10$Bz/u.gbVdvyx/T9g4BSEse9kmjA59CX640Gbpf6PjWH72nOZp.pjy'),(2000001,'$2b$10$dsLoRVQWjxHP6hV2fjHEKuLhYYXI1ifpu7TUbmBDs3pc5A47yZVde'),(2000002,'$2b$10$.KrtJGVoLcea95bFI6D44ewtyXhXWntZJvNOdLLB4Q1cN8BXlFPiu');
/*!40000 ALTER TABLE `employee_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `OrderID` int NOT NULL AUTO_INCREMENT,
  `EID` int DEFAULT NULL,
  `CID` int DEFAULT NULL,
  `CAddrID` int DEFAULT NULL,
  `PaymentID` int DEFAULT NULL,
  `TotalPrice` decimal(8,2) NOT NULL,
  `TotalPoints` int NOT NULL,
  `PromoCode` varchar(20) DEFAULT NULL,
  `OrderDate` datetime NOT NULL,
  `RequiredDate` datetime DEFAULT NULL,
  `Comment` text,
  `StatusID` int DEFAULT NULL,
  PRIMARY KEY (`OrderID`),
  KEY `fk_ORDER_EMPLOYEE1_idx` (`EID`),
  KEY `fk_ORDER_CUSTOMER1_idx` (`CID`),
  KEY `fk_ORDER_CUSTOMER_ADDR1_idx` (`CAddrID`),
  KEY `fk_ORDER_STATUS1` (`StatusID`),
  KEY `fk_PAYMENT_ID1` (`PaymentID`),
  CONSTRAINT `fk_ORDER_CUSTOMER1` FOREIGN KEY (`CID`) REFERENCES `customer` (`CID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ORDER_CUSTOMER_ADDR1` FOREIGN KEY (`CAddrID`) REFERENCES `customer_addr` (`CAddrID`) ON UPDATE CASCADE,
  CONSTRAINT `fk_ORDER_EMPLOYEE1` FOREIGN KEY (`EID`) REFERENCES `employee` (`EID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ORDER_STATUS1` FOREIGN KEY (`StatusID`) REFERENCES `order_status` (`StatusID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_PAYMENT_ID1` FOREIGN KEY (`PaymentID`) REFERENCES `payment` (`PaymentID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (21,1000003,1,16,3,254.81,7,NULL,'2021-04-04 20:47:00','2021-04-06 00:00:00',NULL,5),(22,1000003,4,4,4,394.06,11,NULL,'2021-04-04 22:14:22',NULL,NULL,2),(23,1000003,1,16,5,210.02,6,NULL,'2021-04-04 22:27:47','2021-04-21 00:00:00',NULL,2),(24,1000002,3,3,6,137.11,4,NULL,'2021-04-04 22:30:16',NULL,NULL,2),(25,1000001,4,4,7,203.30,6,NULL,'2021-04-04 22:32:10',NULL,NULL,2),(26,1000001,5,5,8,239.95,7,'UgpG4RxS','2021-04-04 22:34:38',NULL,NULL,2),(27,1000001,1,1,9,74.90,2,NULL,'2021-04-04 22:35:25',NULL,NULL,2),(28,1000003,4,4,10,128.40,3,NULL,'2021-04-04 22:53:45',NULL,NULL,6),(29,1000003,3,3,11,1605.00,48,NULL,'2021-04-05 12:55:53','2021-04-30 16:30:00',NULL,4),(30,1000003,5,5,12,268.57,8,NULL,'2021-04-05 13:40:44',NULL,NULL,1),(31,1000002,4,20,13,237.99,7,NULL,'2021-04-05 13:56:28','2021-04-22 00:00:00',NULL,1),(32,1000003,1,1,14,529.65,15,NULL,'2021-04-05 14:31:36','2021-04-22 03:02:20',NULL,1),(33,1000002,2,23,15,1025.06,30,NULL,'2021-04-05 14:35:44',NULL,NULL,2);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `OrderID` int DEFAULT NULL,
  `PID` int DEFAULT NULL,
  `Quantity` int NOT NULL,
  `TotalPrice` decimal(8,2) NOT NULL,
  KEY `fk_ORDER_DETAIL_ORDER1_idx` (`OrderID`),
  KEY `fk_ORDER_DETAIL_PRODUCT1_idx` (`PID`),
  CONSTRAINT `fk_ORDER_DETAIL_ORDER1` FOREIGN KEY (`OrderID`) REFERENCES `order` (`OrderID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ORDER_DETAIL_PRODUCT1` FOREIGN KEY (`PID`) REFERENCES `product` (`PID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (21,4,4,140.00),(21,6,1,48.00),(21,3,1,30.14),(21,2,1,20.00),(22,5,1,50.00),(22,3,2,60.28),(22,13,2,122.00),(22,1,1,10.00),(22,14,1,30.00),(22,6,2,96.00),(23,2,2,40.00),(23,3,2,60.28),(23,6,2,96.00),(24,5,1,50.00),(24,6,1,48.00),(24,3,1,30.14),(25,4,4,140.00),(25,5,1,50.00),(26,5,3,150.00),(26,3,2,54.25),(26,2,1,20.00),(27,4,2,70.00),(28,4,2,70.00),(28,5,1,50.00),(29,23,1,100.00),(29,21,2,1400.00),(30,4,1,35.00),(30,5,2,100.00),(30,6,2,96.00),(30,2,1,20.00),(31,3,3,90.42),(31,13,2,122.00),(31,1,1,10.00),(32,5,4,200.00),(32,2,1,20.00),(32,11,1,275.00),(33,12,1,98.00),(33,16,1,160.00),(33,21,1,700.00);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `StatusID` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) NOT NULL,
  PRIMARY KEY (`StatusID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'In progress'),(2,'Cancel'),(3,'Disputed'),(4,'On hold'),(5,'Resolved'),(6,'Shipped');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `PaymentID` int NOT NULL AUTO_INCREMENT,
  `Payment_StatusID` int NOT NULL,
  `PaymentDate` datetime DEFAULT NULL,
  PRIMARY KEY (`PaymentID`),
  KEY `fk_payment_payment_status1_idx` (`Payment_StatusID`),
  CONSTRAINT `fk_payment_payment_status1` FOREIGN KEY (`Payment_StatusID`) REFERENCES `payment_status` (`Payment_StatusID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (3,3,'2021-04-27 00:00:00'),(4,2,NULL),(5,2,NULL),(6,2,NULL),(7,2,NULL),(8,2,NULL),(9,2,NULL),(10,3,'2021-04-21 07:00:00'),(11,3,'2021-04-23 08:30:20'),(12,1,NULL),(13,1,NULL),(14,1,NULL),(15,2,NULL);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_status`
--

DROP TABLE IF EXISTS `payment_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_status` (
  `Payment_StatusID` int NOT NULL,
  `Payment_Description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Payment_StatusID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_status`
--

LOCK TABLES `payment_status` WRITE;
/*!40000 ALTER TABLE `payment_status` DISABLE KEYS */;
INSERT INTO `payment_status` VALUES (1,'Waiting for payment'),(2,'Cancelled'),(3,'Confirm Payment');
/*!40000 ALTER TABLE `payment_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `PID` int NOT NULL AUTO_INCREMENT,
  `SID` int DEFAULT NULL,
  `ProductName` varchar(100) NOT NULL,
  `UnitPrice` decimal(8,2) DEFAULT NULL,
  `Size` varchar(5) DEFAULT NULL,
  `Stocks` int NOT NULL,
  PRIMARY KEY (`PID`),
  KEY `fk_PRODUCT_SUPPLIER1_idx` (`SID`),
  CONSTRAINT `fk_PRODUCT_SUPPLIER1` FOREIGN KEY (`SID`) REFERENCES `supplier` (`SID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,2,'Soft-Sensu Fork (1 x 12)',10.00,'s',296),(2,3,'Ionic Fork (1 x 24)',20.00,'m',17),(3,3,'Ionic Cake Shovel',30.14,'m',18),(4,1,'Fusion Butter Knife',35.00,'m',40),(5,2,'Soft-Sensu ToothPick ( 1 x 50 )',50.00,'s',65),(6,2,'Soft-Sensu Cutting Board',48.00,'m',0),(7,5,'Corona Plastic Bottle ( 1 x 5 )',86.00,'l',84),(8,6,'Plastivo Chopstick ( 1 x 24 )',30.00,'m',65),(9,7,'Tineric Chopstick ( 1 x 24 )',29.00,'m',38),(10,9,'Acrylicc Chopstick ( 1 x 24 )',50.00,'m',24),(11,8,'Plastific Cutting board ',275.00,'xl',130),(12,10,'Kitta Cutting board ',98.00,'l',16),(13,2,'Soft-Sensu Spatula',61.00,'m',132),(14,1,'Fusion Spatula',30.00,'m',257),(15,5,'Corona Butter Knife ( 1 x 4 )',250.00,'s',55),(16,9,'Acrylicc Butter Knife ( 1 x 3 )',160.00,'s',229),(17,4,'Cutler Butter Knife ( 1 x 3 )',170.00,'s',0),(18,4,'Cutler Scoop',145.00,'l',39),(19,4,'Cutler Broom',133.00,'xl',189),(20,4,'Cutler Spatula',90.00,'l',149),(21,11,'Plastel Bottles ( 1 x 12 )',700.00,'l',475),(23,12,'Lamina Gloves ( 1 x 4 )',100.00,'m',130);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promocode`
--

DROP TABLE IF EXISTS `promocode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promocode` (
  `Code` varchar(20) NOT NULL,
  `PID` int DEFAULT NULL,
  `Discount` int DEFAULT NULL,
  `ExpiredDate` datetime DEFAULT NULL,
  `Available_number` int DEFAULT NULL,
  PRIMARY KEY (`Code`),
  KEY `fk_PROMOCODE_PRODUCT1_idx` (`PID`),
  CONSTRAINT `fk_PROMOCODE_PRODUCT1` FOREIGN KEY (`PID`) REFERENCES `product` (`PID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promocode`
--

LOCK TABLES `promocode` WRITE;
/*!40000 ALTER TABLE `promocode` DISABLE KEYS */;
INSERT INTO `promocode` VALUES ('2FB6RmGf',4,50,'2021-04-29 00:00:00',2),('749cVBnO',2,3,'2021-12-18 13:17:17',4),('Abcef25',12,20,'2021-04-28 00:00:00',11),('Aspwe63',1,10,'2021-04-14 00:00:00',2),('gjhh5N4j',12,12,'2021-07-11 00:00:00',13),('kTdLM27K',1,5,'2021-04-12 00:00:00',10),('Oo4m8eq5',5,20,'2021-04-12 00:00:00',3),('Poreq21',21,10,'2021-04-23 00:00:00',50),('r3mwaqwu',5,10,'2021-05-12 00:00:00',30),('SpOxYUGY',19,10,'2021-12-01 00:00:00',5),('TopEraRSA12',10,40,'2021-04-20 00:00:00',5),('UgpG4RxS',3,10,'2021-04-12 00:00:00',9);
/*!40000 ALTER TABLE `promocode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `SID` int NOT NULL AUTO_INCREMENT,
  `SName` varchar(100) NOT NULL,
  `Contact` varchar(45) NOT NULL,
  `Address` varchar(255) NOT NULL,
  PRIMARY KEY (`SID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'FuseTronic Co., Ltd.','+66 (0) 2 260 7290','28th Floor, CTI Tower 191/16 New Ratchadapisek Road Klongtoey 2 10110 Thailand'),(2,'Softsensu Co., Ltd.','66 0-2883-0994','656/179-180, Charansanitwong Rd., Bang Phat'),(3,'PolyIonic Co., Ltd.','+66 02 651-1000','193/6266 16Th Floor Lake Ratchada Office Complex Ratchadapisek Road'),(4,'Cutlesloft Co., Ltd.','+66 2 312-8409-15','64 MOO 1, BANGNA-TRAD ROAD KM.21 SRISAJORAKAEYAI 2 10540'),(5,'Corational Part., Ltd.','+66 0-2691-3786','Pracharajbamphen Rd., Samsen Nok, Huai Khwang Bangkok 10310'),(6,'Plastivo Pub Co., Ltd.','+66 02 932-6373','66/1 ladprao 80 Wangthonglang 2 10310'),(7,'Tineric Inc.','+66 02 658-4589','460/8-9 Siam Square Soi 8 Rama 1 Road, 2 10330'),(8,'Plastific Co., Ltd.','+66 02 656-8231','88/3-90 Soi Pathumkongka, Trimitr Rd., Samphantawong'),(9,'Acrylicc Pub Co., Ltd.','+66 02 287-0222','246 Unit#10-02C 10Th Floor Time Square Building Sukhumvit Road'),(10,'Kitary Part., Ltd','+66 02 716-1800','2034/72 Itathai Tower New Petchburi Road Bangkapi, Huaykwang 2 10320'),(11,'Plastella Co., LTE.','+66 2 390-0410','87/110 Soi Akekamai Sukhumvit 63 Klongtan-nua, 2 10110'),(12,'Laminatic Pub Co., Ltd.','+66 2 638-2168-70','C.P. Tower Building, 17th Floor 313 Silom Rd 2 10500');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-05 17:26:49

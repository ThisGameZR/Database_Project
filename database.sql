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
-- Table structure for table `cheque`
--

DROP TABLE IF EXISTS `cheque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cheque` (
  `ChequeID` int NOT NULL,
  `Amount` int DEFAULT NULL,
  `Owner_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ChequeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cheque`
--

LOCK TABLES `cheque` WRITE;
/*!40000 ALTER TABLE `cheque` DISABLE KEYS */;
/*!40000 ALTER TABLE `cheque` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`CAddrID`),
  KEY `fk_CUSTOMER_ADDR_CUSTOMER1_idx` (`CID`),
  CONSTRAINT `fk_CUSTOMER_ADDR_CUSTOMER1` FOREIGN KEY (`CID`) REFERENCES `customer` (`CID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_addr`
--

LOCK TABLES `customer_addr` WRITE;
/*!40000 ALTER TABLE `customer_addr` DISABLE KEYS */;
INSERT INTO `customer_addr` VALUES (1,1,'2156 Cook Hill Road , Hartford','Hartford','Connecticut','06103','United States'),(2,2,'367  Emeral Dreams Drive','Streator','Illinois','61364','United States'),(3,3,'588  Spring Haven Trail','Montclair','New Jersey','07042','United States'),(4,4,'3242  Jarvisville Road','Freeport','New York','11520','United States'),(5,5,'586  Spring Haven Trail','Montclair','New Jersey','07042','United States');
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
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (100,1000003,'Marketing');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
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
  `FirstName` varchar(45) NOT NULL,
  `MiddleName` varchar(10) DEFAULT NULL,
  `LastName` varchar(45) NOT NULL,
  `Position` varchar(45) NOT NULL,
  `Salary` int NOT NULL,
  `Dno` int DEFAULT NULL,
  PRIMARY KEY (`EID`),
  KEY `fk_EMPLOYEE_DEPARTMENT1_idx` (`Dno`),
  CONSTRAINT `fk_EMPLOYEE_DEPARTMENT1` FOREIGN KEY (`Dno`) REFERENCES `department` (`Dno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1000001,'John','','Smith','General',20000,100),(1000002,'Berry','','Barton','General',20000,100),(1000003,'Albert','','Wesker','Manager',50000,100);
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
INSERT INTO `employee_account` VALUES (1000001,'$2b$10$7QVsn26bkc59OAFGWrhQ3eQq0j5OSgj83.yQnVURIL7K0UJv4H0Q.'),(1000002,'$2b$10$IYd3SdG/Riw37L/EBWqTFefuzvRBrWK67/UIlBJD.ii6i4mIyqdQ.'),(1000003,'$2b$10$Bz/u.gbVdvyx/T9g4BSEse9kmjA59CX640Gbpf6PjWH72nOZp.pjy');
/*!40000 ALTER TABLE `employee_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `InvoiceID` int NOT NULL AUTO_INCREMENT,
  `CID` int DEFAULT NULL,
  `OrderID` int DEFAULT NULL,
  `StatusID` int DEFAULT NULL,
  PRIMARY KEY (`InvoiceID`),
  KEY `fk_INVOICE_INVOICE_STATUS1_idx` (`StatusID`),
  KEY `fk_INVOICE_CUSTOMER1_idx` (`CID`),
  KEY `fk_INVOICE_ORDER1_idx` (`OrderID`),
  CONSTRAINT `fk_INVOICE_CUSTOMER1` FOREIGN KEY (`CID`) REFERENCES `customer` (`CID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_INVOICE_INVOICE_STATUS1` FOREIGN KEY (`StatusID`) REFERENCES `invoice_status` (`StatusID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_INVOICE_ORDER1` FOREIGN KEY (`OrderID`) REFERENCES `order` (`OrderID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_status`
--

DROP TABLE IF EXISTS `invoice_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_status` (
  `StatusID` int NOT NULL AUTO_INCREMENT,
  `Description` varchar(255) NOT NULL,
  PRIMARY KEY (`StatusID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_status`
--

LOCK TABLES `invoice_status` WRITE;
/*!40000 ALTER TABLE `invoice_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice_status` ENABLE KEYS */;
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
  `TotalPrice` float NOT NULL,
  `TotalPoints` int NOT NULL,
  `PromoCode` varchar(20) DEFAULT NULL,
  `OrderDate` datetime NOT NULL,
  `RequiredDate` datetime DEFAULT NULL,
  `PaymentDate` datetime NOT NULL,
  `Comment` text,
  PRIMARY KEY (`OrderID`),
  KEY `fk_ORDER_EMPLOYEE1_idx` (`EID`),
  KEY `fk_ORDER_CUSTOMER1_idx` (`CID`),
  KEY `fk_ORDER_CUSTOMER_ADDR1_idx` (`CAddrID`),
  CONSTRAINT `fk_ORDER_CUSTOMER1` FOREIGN KEY (`CID`) REFERENCES `customer` (`CID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ORDER_CUSTOMER_ADDR1` FOREIGN KEY (`CAddrID`) REFERENCES `customer_addr` (`CAddrID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ORDER_EMPLOYEE1` FOREIGN KEY (`EID`) REFERENCES `employee` (`EID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
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
  `TotalPrice` float NOT NULL,
  `SubtotalPrice` float NOT NULL,
  `Points` int NOT NULL,
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
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
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
  `UnitPrice` float(8,2) DEFAULT NULL,
  `Size` varchar(5) DEFAULT NULL,
  `Stocks` int NOT NULL,
  PRIMARY KEY (`PID`),
  KEY `fk_PRODUCT_SUPPLIER1_idx` (`SID`),
  CONSTRAINT `fk_PRODUCT_SUPPLIER1` FOREIGN KEY (`SID`) REFERENCES `supplier` (`SID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,2,'Soft-Sensu Fork (1 x 12)',10.00,'s',300),(2,3,'Ionic Fork (1 x 24)',20.00,'m',42),(3,3,'Ionic Cake Shovel',30.14,'m',12),(4,1,'Fusion Butter Knife',35.00,'m',52),(5,2,'Soft-Sensu ToothPick ( 1 x 50 )',50.00,'s',100),(6,2,'Soft-Sensu Cutting Board',48.00,'m',8),(7,5,'Corona Plastic Bottle ( 1 x 5 )',86.00,'l',84),(8,6,'Plastivo Chopstick ( 1 x 24 )',30.00,'m',67),(9,7,'Tineric Chopstick ( 1 x 24 )',29.00,'m',108),(10,9,'Acrylicc Chopstick ( 1 x 24 )',50.00,'m',0),(11,8,'Plastific Cutting board ',275.00,'xl',131),(12,10,'Kitta Cutting board ',98.00,'l',16),(13,2,'Soft-Sensu Spatula',61.00,'m',134),(14,1,'Fusion Spatula',30.00,'m',258),(15,5,'Corona Butter Knife ( 1 x 4 )',250.00,'s',55),(16,9,'Acrylicc Butter Knife ( 1 x 3 )',160.00,'s',229),(17,4,'Cutler Butter Knife ( 1 x 3 )',170.00,'s',2),(18,4,'Cutler Scoop',145.00,'l',39),(19,4,'Cutler Broom',133.00,'xl',189),(20,4,'Cutler Spatula',90.00,'l',149);
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
  `Discount` int NOT NULL,
  `ExpiredDate` datetime NOT NULL,
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
/*!40000 ALTER TABLE `promocode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipment`
--

DROP TABLE IF EXISTS `shipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipment` (
  `OrderID` int DEFAULT NULL,
  `ShippingDate` datetime NOT NULL,
  `Status` varchar(45) NOT NULL,
  KEY `fk_SHIPMENT_ORDER1_idx` (`OrderID`),
  CONSTRAINT `fk_SHIPMENT_ORDER1` FOREIGN KEY (`OrderID`) REFERENCES `order` (`OrderID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment`
--

LOCK TABLES `shipment` WRITE;
/*!40000 ALTER TABLE `shipment` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipment` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'FuseTronic Co., Ltd.','+66 (0) 2 260 7290','28th Floor, CTI Tower 191/16 New Ratchadapisek Road Klongtoey 2 10110 Thailand'),(2,'Softsensu Co., Ltd.','66 0-2883-0994','656/179-180, Charansanitwong Rd., Bang Phat'),(3,'PolyIonic Co., Ltd.','+66 02 651-1000','193/6266 16Th Floor Lake Ratchada Office Complex Ratchadapisek Road'),(4,'Cutlesloft Co., Ltd.','+66 2 312-8409-15','64 MOO 1, BANGNA-TRAD ROAD KM.21 SRISAJORAKAEYAI 2 10540'),(5,'Corational Part., Ltd.','+66 0-2691-3786','Pracharajbamphen Rd., Samsen Nok, Huai Khwang Bangkok 10310'),(6,'Plastivo Pub Co., Ltd.','+66 02 932-6373','66/1 ladprao 80 Wangthonglang 2 10310'),(7,'Tineric Inc.','+66 02 658-4589','460/8-9 Siam Square Soi 8 Rama 1 Road, 2 10330'),(8,'Plastific Co., Ltd.','+66 02 656-8231','88/3-90 Soi Pathumkongka, Trimitr Rd., Samphantawong'),(9,'Acrylicc Pub Co., Ltd.','+66 02 287-0222','246 Unit#10-02C 10Th Floor Time Square Building Sukhumvit Road'),(10,'Kitary Part., Ltd','+66 02 716-1800','2034/72 Itathai Tower New Petchburi Road Bangkapi, Huaykwang 2 10320');
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

-- Dump completed on 2021-03-28  0:19:06

-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: syce1a
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `desc` varchar(10000) NOT NULL,
  `img` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `userid` int NOT NULL,
  `cat` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `userd` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Jainil Patel   First Post','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','https://picsum.photos/800/800','2022-12-04 00:00:00',4,'science'),(2,'Second Post','dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but a','https://picsum.photos/800/800','2023-01-12 00:00:00',3,'art'),(3,'Food Related Post','This is a food related post and i dont know what to write here so Mango is a fruit OKKKKKKKKKK','https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2022/01/mangoes_what_to_know_732x549_thumb-732x549.jpg','2022-04-12 00:00:00',4,'food'),(4,'test title','<p>thsi is test desc not new</p>','','2022-05-22 00:00:00',5,'art'),(5,'test title','<h1>thsi is test desc not new at all afdsaf fdsfasdf asd fas ther is some thing new to edit</h1><ol><li>12</li></ol>','1689496825439blackmetal.png','2023-07-16 13:32:56',4,'art'),(11,'Here is Lorem Ipsum','<p>ALTER TABLE `syce1a`.`posts`</p><p>DROP FOREIGN KEY `userid`,</p><p>ADD CONSTRAINT `userid`</p><p>&nbsp;FOREIGN KEY (`userid`)</p><p>&nbsp;REFERENCES `syce1a`.`userd` (`id`)</p><p>&nbsp;ON DELETE CASCADE</p><p>&nbsp;ON UPDATE CASCADE; this is new</p><p><br></p><h1>HELLO</h1><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><h2><br></h2>','16895153943573d136d33e55fbb1.png','2023-07-16 19:19:37',4,'art');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userd`
--

DROP TABLE IF EXISTS `userd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userd` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userd`
--

LOCK TABLES `userd` WRITE;
/*!40000 ALTER TABLE `userd` DISABLE KEYS */;
INSERT INTO `userd` VALUES (1,'jainilpatel','jainil@gmail.com','$2b$10$2mxcPYvHmiGgTQDY0pBfMeLksTZDge9dioiO7L7IhHsGwEkvES0S.',NULL),(2,'5661c92bf503e2e5','','$2b$10$QTVlG9Km5m3OO6tO9TA0Aek41AqpDLX5NFPNwniQL9Ul47o6KbzCS',NULL),(3,'5661c922bf503e2e5','jaini2l@gmail.com','$2b$10$t7vny7/UTI7LtI5SUO6oh.gtCHOGE/NSPuJctQyUd9yenjMoTO7B.',NULL),(4,'test','test@gmail.com','$2b$10$HkV5FfKzgpiJQ4R29U5iAuBfLFEjQ1hU5EzefQRQklaanJltlS0Aa','https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'),(5,'testcase2','test4@gmail.com','$2b$10$VfoPUMsXGm4cotajpbyefuHgltWjT0FG7/8.NgXjvyFmK3AwgRciC',NULL);
/*!40000 ALTER TABLE `userd` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-25 11:29:59

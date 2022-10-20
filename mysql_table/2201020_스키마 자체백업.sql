-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: notegame_schema
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `leveltable`
--

DROP TABLE IF EXISTS `leveltable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leveltable` (
  `Level` int NOT NULL,
  `NeedExp` int NOT NULL,
  PRIMARY KEY (`Level`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leveltable`
--

LOCK TABLES `leveltable` WRITE;
/*!40000 ALTER TABLE `leveltable` DISABLE KEYS */;
INSERT INTO `leveltable` VALUES (1,3),(2,50),(3,75),(4,113),(5,169),(6,253),(7,380),(8,570),(9,854),(10,1196),(11,1674),(12,2344),(13,3282),(14,4595),(15,6432),(16,9005),(17,12608),(18,17651),(19,24711),(20,34595),(21,41514),(22,49817),(23,59781),(24,71737),(25,86084),(26,103301),(27,123961),(28,148753),(29,178504),(30,0);
/*!40000 ALTER TABLE `leveltable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monstercollection`
--

DROP TABLE IF EXISTS `monstercollection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monstercollection` (
  `Index` int NOT NULL AUTO_INCREMENT,
  `Id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `001` int NOT NULL DEFAULT '0',
  `002` int NOT NULL DEFAULT '0',
  `003` int NOT NULL DEFAULT '0',
  `004` int NOT NULL DEFAULT '0',
  `005` int NOT NULL DEFAULT '0',
  `006` int NOT NULL DEFAULT '0',
  `007` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`Index`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monstercollection`
--

LOCK TABLES `monstercollection` WRITE;
/*!40000 ALTER TABLE `monstercollection` DISABLE KEYS */;
INSERT INTO `monstercollection` VALUES (6,'sott',0,0,0,0,0,0,0),(7,'12',1,1,1,1,1,1,1);
/*!40000 ALTER TABLE `monstercollection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monstercount`
--

DROP TABLE IF EXISTS `monstercount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monstercount` (
  `Index` int NOT NULL AUTO_INCREMENT,
  `Id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `001` int NOT NULL DEFAULT '0',
  `002` int NOT NULL DEFAULT '0',
  `003` int NOT NULL DEFAULT '0',
  `004` int NOT NULL DEFAULT '0',
  `005` int NOT NULL DEFAULT '0',
  `006` int NOT NULL DEFAULT '0',
  `007` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`Index`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monstercount`
--

LOCK TABLES `monstercount` WRITE;
/*!40000 ALTER TABLE `monstercount` DISABLE KEYS */;
INSERT INTO `monstercount` VALUES (5,'sott',0,0,0,0,0,0,0),(6,'12',0,0,0,0,0,1,2);
/*!40000 ALTER TABLE `monstercount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Index` int NOT NULL AUTO_INCREMENT,
  `Id` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Nickname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `Password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Salt` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Level` int NOT NULL DEFAULT '1',
  `BasicDamage` int NOT NULL DEFAULT '100',
  `BasicHp` int NOT NULL DEFAULT '300',
  `WeaponDamage` int NOT NULL DEFAULT '50',
  `WeaponHp` int NOT NULL DEFAULT '500',
  `Gold` bigint NOT NULL DEFAULT '0',
  `PenCount` int NOT NULL DEFAULT '0',
  `DungeonClearCount` int NOT NULL DEFAULT '0',
  `UpWeaponDamage` int NOT NULL DEFAULT '0',
  `UpWeaponHp` int NOT NULL DEFAULT '0',
  `Exp` int NOT NULL DEFAULT '0',
  `DungeonFloor` int NOT NULL DEFAULT '1',
  `StatPoint` int NOT NULL DEFAULT '0',
  `SkillPoint` int NOT NULL DEFAULT '0',
  `EquipBallpen` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'weapon1',
  `BuyBallpenList` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'weapon1',
  `DungeonPenSpeed` int NOT NULL DEFAULT '500',
  `PenGamePenSpeed` int NOT NULL DEFAULT '500',
  `MaxDungeonFloor` int NOT NULL DEFAULT '1',
  `RevivalCount` int NOT NULL DEFAULT '0',
  `UpMaxHp` int NOT NULL DEFAULT '0',
  `UpBasicDamage` int NOT NULL DEFAULT '0',
  `UpGoldPen` int NOT NULL DEFAULT '0',
  `UpGoldHunt` int NOT NULL DEFAULT '0',
  `BetterPen` int NOT NULL DEFAULT '0',
  `UpDoubleAttack` int NOT NULL DEFAULT '0',
  `UpMoreFloor` int NOT NULL DEFAULT '0',
  `UpRevivalStatPoint` int NOT NULL DEFAULT '0',
  `UpMulilpleReward` int NOT NULL DEFAULT '0',
  `RevivalPoint` int NOT NULL DEFAULT '0',
  `EquipPaper` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'paper1',
  `BuyPaperList` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'paper1',
  `IsHelpModal` int DEFAULT '0',
  `BuySkillPointCount` int DEFAULT '0',
  `BasicRevivalPoint` int NOT NULL DEFAULT '30',
  PRIMARY KEY (`Index`)
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='유저 테이블\n유저번호 / 닉네임 / 비밀번호 /레벨 / 기본 공격력 / 기본 체력 / 무기 공격력 / 방어구 체력 / 장착중인 무기 / 장착중인 방어구 / 화폐 / 각 스킬의 레벨 / 가지고 있는 아이템 / 볼펜 돌린 횟수 / 사냥 횟수';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'pki0120','sott','fa0c71dce8b63c3373d268738706a6a511a9dbed0876cbe16bb0af6dfd4723f4','4d4b4aa651fd2f37bb875b8045ccec61',20,3650,3200,5000,50000,52311,85,96,0,0,17710,409,5,1,'weapon5','weapon1,weapon3,weapon4,weapon2,weapon5',500,500,409,1,29,71,1,1,60,1,10,6,1,2,'paper8','paper1,paper8',1,0,30),(248,'12','박','674f89da01898f4bb166a92e884ada857f40c5d8d810f33eb90cb1623ed61b73','23042488cd9825e663d5b84267904e5c',18,100000,10300,2000,500,92192,7,41,0,0,14756,267,1000,978,'weapon3','weapon1,weapon3',500,500,267,2,100,0,0,0,0,1,10,5,1,10,'paper1','paper1',1,1,30);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-20 23:00:28

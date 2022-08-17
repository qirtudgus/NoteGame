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
INSERT INTO `leveltable` VALUES (1,10),(2,50),(3,75),(4,113),(5,169),(6,253),(7,380),(8,570),(9,854),(10,1196),(11,1674),(12,2344),(13,3282),(14,4595),(15,6432),(16,9005),(17,12608),(18,17651),(19,24711),(20,34595),(21,41514),(22,49817),(23,59781),(24,71737),(25,86084),(26,103301),(27,123961),(28,148753),(29,178504),(30,0);
/*!40000 ALTER TABLE `leveltable` ENABLE KEYS */;
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
  `Password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Salt` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `Level` int NOT NULL DEFAULT '1',
  `BasicDamage` int NOT NULL DEFAULT '100',
  `BasicHp` int NOT NULL DEFAULT '100',
  `WeaponDamage` int NOT NULL DEFAULT '5',
  `WeaponHp` int NOT NULL DEFAULT '5',
  `EquipDamage` int NOT NULL DEFAULT '0',
  `EquipHp` int DEFAULT '0',
  `Gold` bigint NOT NULL DEFAULT '0',
  `Inventory` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `PenCount` int NOT NULL DEFAULT '0',
  `HuntingCount` int NOT NULL DEFAULT '0',
  `UpGoldAll` int NOT NULL DEFAULT '0',
  `UpGoldHunt` int NOT NULL DEFAULT '0',
  `UpGoldPen` int NOT NULL DEFAULT '0',
  `UpWeaponDamage` int NOT NULL DEFAULT '0',
  `UpWeaponHp` int NOT NULL DEFAULT '0',
  `DoubleAttack` int NOT NULL DEFAULT '0',
  `Grabber` int NOT NULL DEFAULT '0',
  `Exp` int NOT NULL DEFAULT '0',
  `DungeonFloor` int NOT NULL DEFAULT '1',
  `BetterPen` int NOT NULL DEFAULT '0',
  `SkillPoint` int NOT NULL DEFAULT '20',
  `EquipBallpen` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'weapon1',
  `BuyBallpenList` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'weapon1',
  `UpMaxHp` int DEFAULT '0',
  `DungeonPenSpeed` int DEFAULT '1',
  `PenGamePenSpeed` int DEFAULT '1',
  PRIMARY KEY (`Index`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='유저 테이블\n유저번호 / 닉네임 / 비밀번호 /레벨 / 기본 공격력 / 기본 체력 / 무기 공격력 / 방어구 체력 / 장착중인 무기 / 장착중인 방어구 / 화폐 / 각 스킬의 레벨 / 가지고 있는 아이템 / 볼펜 돌린 횟수 / 사냥 횟수';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (49,'12','7cd88614aada60e6cacd7f51c4ef584e236a78277533e2196060b6ade354a828','206c494338cc438c65785d32c4c6aca1',8,5000,1000500,5,5,0,0,1360527470900,NULL,70,0,0,2,0,0,0,0,0,220,27,20,0,'weapon5','weapon1,weapon2,weapon10,weapon3,weapon5,weapon6,weapon19,weapon4',5,1,1),(50,'qqq','e5d9b48a05694b5c6724abb132b864db82eeb52d9234889eb51bcb66dde2d5cb','b7217e75e1d70df2a05c6a77a898f4cb',4,100000,100,5,5,0,0,620,NULL,0,0,0,0,0,0,0,0,0,67,17,0,23,'weapon1','weapon1',0,1,1),(51,'www','61fccd076b35f4fb3027635eecc522de690773533b02c5edd7a76cda8112799c','f1b97a4e89364e405b558a629a82841a',3,100000,100,5,5,0,0,230,NULL,0,0,0,0,0,0,0,0,0,0,15,0,22,'weapon1','weapon1',0,1,1),(52,'eee','abae6deb0b7db3dfcff324c1e2b9e5251a4bc507563fb06b150e71a4ab276d99','95ae3ea020482d05724f22eb930ba081',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,21,0,20,'weapon1','weapon1',0,1,1),(53,'rrr','bd0e8a62245d74d6e3fe9f53a3af13b6252250a200f7f29c6986b75c7021cb1f','b59c1f208007155dfc4f6fc4015119df',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,144,0,20,'weapon1','weapon1',0,1,1),(54,'ttt','30619f59ba37ee48370e93fe603573478bd9e1366821a85a77aa3d850c3e10ed','8f436ed0ffae71243b5272702c2780c3',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,131,0,20,'weapon1','weapon1',0,1,1),(55,'yyy','fbf24fc600702271800f977800d2b3f10914c6b60fd6c27d447dfb7edee869a7','0d8a9980bdedae357a8bc50cad8cfaa1',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,35,0,20,'weapon1','weapon1',0,1,1),(56,'uuu','36074b96c9683dcfa785c80b788c5d70a81a1ff40c719132a699735a03902af8','a56a924eda14f30a4041e51216c49ba7',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,156,0,20,'weapon1','weapon1',0,1,1),(57,'iii','6dc35f524efd20a257981898d474170c7af45f5c394bac8328ed2bbf46d1101b','b30df5cf4640ea6dff783fafa4595863',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,13,0,20,'weapon1','weapon1',0,1,1),(58,'111','b685c8948a6559239f880168f3f709a13df380a1bbfd9751a9aa9b49faf11ba9','6b2f3ccf0a25eb4c0224e2733d98e2a2',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1555,0,20,'weapon1','weapon1',0,1,1),(59,'112','3334aa6205aba5d7259bebc95e951f68a1b286123364bbd6d9787ed3fe36a275','e2066d3c7e1edf5403f3badb708b6e90',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,12,0,20,'weapon1','weapon1',0,1,1),(60,'4444','55603a2a87d90d52781869e40a6ebaef139f66f14de1a6de9b6d7327c1b07a53','5cefe23bd222f3374ae7088a6ca9aad5',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,56,0,20,'weapon1','weapon1',0,1,1),(61,'555','f58424b70f721654d244a7a13d7a9da7c9874ce42c3324c0f1e6b96df602b173','0d8e506787178f920601ca878394e1bb',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(62,'6666','d06d7105f528dce97a7b1d87cd1f27db8e44d35423df943a0bd6cdd94963102a','de26cd5b80443c535bebfd463f7e82e8',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(63,'777','bf7b7349cf2835bb642a2005b1bfc94ac39ace9bc33a42a08158c6c3f10b779a','52fac1c98c45a3343ec3af81b1ab914b',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(64,'888','8d17f026703d2de9364277af6f90211d5e8afe27bb082891e95429e5bcbff854','351cca4bbbea72994781c49a10058e1c',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(65,'999','d70869fb5e3e815b8eb0a6c68a4bedd89369db235251c2bd993730427c920e9f','839db0fafc7f0c8c8c470dddcb7c4fe6',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(66,'000','c6966df958fc94df3eb2d00742be08d43c15305fd5e882e43300338b891cf208','c106be8e91963b38334ab3b683dec21a',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(67,'1234','dfac2e0092b2bccc685302c1da0813a8b4f5389414c81f7d4a132a1896a2d326','dcbff9c4116d55e362df27113cb68de6',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(68,'gggg','5088df7297e9e09d8a3dbdee3188f1c8a12a5433fadc04ec3649472a923a295f','bd66613c6a5d2eeb1bcff9552f7fbd92',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(69,'asdf','f1cf3180ec42d96d63d54472251d4992dd0b9722d80493991dd905d660a6bf0e','fb778630393b24b4a55f02e7f2ec9efe',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(70,'qwr','6e98df8aaa01444d38b5daa5a32e056435958c4b7d5cbc598459f94a9898fd87','479cd8ccf9232df11e41597103466d95',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(71,'rwere','14dc0cfca4183f46547bb1e00533a8039dcf604906a86c4433a98a027b38264d','43b33ddff7eaa8ed15be358425250cb6',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(72,'rr','37b90c0e6174c3c016b8b812bd1d2f7fa115465732731f59fb375c92586cb497','7f42243e20d9d29c997a33dce104c94b',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(73,'wererw','4978bfe74160e70879579d6e082c1f5001020acfaf3f3f25e3941293ca6f3599','fcfa6c797a720902bb1f3285623f8983',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(74,'frff','865e92556ec64afcdcaf499e04bd5132cc3a6141253a6ab5f588ea94b9fe1813','ba8178cbfc7618116376b06d2520eea9',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(75,'eeeq1','ca2188cde7409dc9791911e53fd4f1ae7a4a5ed0267af040a0bc33f5faed0525','8aca9655aa45fa9bfea70f072e06f599',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(76,'dff','f60266e635242228de30f5e33033203ab3e52f2c28712830dd8e96b9654aea50','fb506e3402e5c296b614c296d4465757',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(77,'qqqqr','cf18550209ed9c355d200b7735c3c17f60e0640ad4fc248a5582fc10e90aa148','5e13b3f1f70e4faa7971bf43575f8b25',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(78,'aaaa1','729c6ad154560a4b4811deae4e5ae6a41e4a68b63436be9329193eabaff04d35','827f7e37ace28d56615238b471c4c66f',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1),(79,'2221','4b86e0b96ffbc96859a1839f9a834dc1ee099153bc421c8a7c00f9e1f65f86a4','d495e4bc3b315ef5de9a94d8966a9336',1,100,100,5,5,0,0,0,NULL,0,0,0,0,0,0,0,0,0,0,1,0,20,'weapon1','weapon1',0,1,1);
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

-- Dump completed on 2022-08-17 10:51:02

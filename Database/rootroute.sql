CREATE DATABASE  IF NOT EXISTS `root-route` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `root-route`;
-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (x86_64)
--
-- Host: 127.0.0.1    Database: root-route
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  PRIMARY KEY (`userId`,`vacationId`),
  KEY `vacationId_idx` (`vacationId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `vacationId` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (6,1),(7,1),(23,1),(22,2),(23,2),(24,2),(7,3),(21,3),(26,3),(7,4),(21,4),(23,4),(24,4),(26,4),(7,5),(21,5),(22,5),(24,5),(26,5),(21,6),(22,6),(23,6),(24,6),(7,7),(22,7),(23,7),(24,7),(26,7),(7,8),(22,8),(24,8),(22,10),(24,10),(21,11),(22,11),(23,11),(24,11),(26,11),(22,12),(24,12),(22,13),(23,13),(24,13),(26,13),(21,14),(23,14),(23,83),(24,83),(7,84),(22,84),(22,85),(23,85),(24,85),(26,85),(21,86),(23,86),(24,86),(21,87),(22,87),(21,88),(22,88),(23,88),(24,88),(21,89),(23,89),(24,89),(21,90),(21,91),(22,91),(23,91),(24,91),(26,91),(21,92),(23,92),(24,92),(21,93),(23,93),(24,93),(26,93),(21,94),(23,94);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(256) NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId_idx` (`roleId`),
  CONSTRAINT `roleId` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (6,'Ruti','Li','rut@gmail.com','5af1252eeaea85cd9568ff90efaa5469160bc247cbc2fddddedc35b19c659a0889e89f166cd8a28db8aa6784dc286d87a11d9968deeae858b8e021b286278abf',1),(7,'user','user','user@gmail.com','5af1252eeaea85cd9568ff90efaa5469160bc247cbc2fddddedc35b19c659a0889e89f166cd8a28db8aa6784dc286d87a11d9968deeae858b8e021b286278abf',2),(21,'user2@gmail.com','i am user','u@gmail.com','5af1252eeaea85cd9568ff90efaa5469160bc247cbc2fddddedc35b19c659a0889e89f166cd8a28db8aa6784dc286d87a11d9968deeae858b8e021b286278abf',2),(22,'John','Smith','j@gmail.com','5af1252eeaea85cd9568ff90efaa5469160bc247cbc2fddddedc35b19c659a0889e89f166cd8a28db8aa6784dc286d87a11d9968deeae858b8e021b286278abf',2),(23,'mary','smith','m@gmail.com','5af1252eeaea85cd9568ff90efaa5469160bc247cbc2fddddedc35b19c659a0889e89f166cd8a28db8aa6784dc286d87a11d9968deeae858b8e021b286278abf',2),(24,'alex','li','a@gmail.com','5af1252eeaea85cd9568ff90efaa5469160bc247cbc2fddddedc35b19c659a0889e89f166cd8a28db8aa6784dc286d87a11d9968deeae858b8e021b286278abf',2),(26,'Daaa','daa','user2@gmail.com','5af1252eeaea85cd9568ff90efaa5469160bc247cbc2fddddedc35b19c659a0889e89f166cd8a28db8aa6784dc286d87a11d9968deeae858b8e021b286278abf',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `imageName` varchar(50) DEFAULT 'null',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Paris, France','Experience the romance and charm of the City of Light. Ascend the iconic Eiffel Tower for breathtaking views, explore world-class art at the Louvre, and stroll along the picturesque Seine River. Indulge in exquisite French cuisine, from fresh croissants to gourmet dishes, and immerse yourself in the citys rich history and culture.','2024-06-15 00:00:00','2024-06-22 00:00:00',1500.00,'b3f7a0f6-a0ad-46d2-ae03-799af496542d.jpg'),(2,'Bali, Indonesia','Discover paradise on earth in Bali. Relax on pristine beaches with crystal-clear waters, explore lush rice terraces, and visit ancient temples steeped in spirituality. Immerse yourself in the islands unique culture, indulge in traditional Balinese spa treatments, and witness stunning sunsets over the Indian Ocean.','2024-07-01 00:00:00','2024-07-10 00:00:00',2000.00,'563be322-b0b1-4aee-8c0b-24893bacd762.jpg'),(3,'New York City, USA','Dive into the energy of the Big Apple. Marvel at the towering skyscrapers, catch a Broadway show, and explore diverse neighborhoods from bustling Manhattan to trendy Brooklyn. Enjoy world-class shopping, visit iconic landmarks like Times Square and Central Park, and savor culinary delights from around the globe.','2024-08-04 21:00:00','2024-08-11 21:00:00',1800.00,'aac3c72b-e94c-444c-af6c-ceda3463fea0.jpg'),(4,'Tokyo, Japan','Immerse yourself in the fascinating blend of ultra-modern and traditional in Tokyo. Experience the citys cutting-edge technology, from robot restaurants to high-speed bullet trains. Explore serene temples and gardens, indulge in exquisite sushi and ramen, and dive into the vibrant pop culture scene of Akihabara and Harajuku.','2024-09-09 21:00:00','2024-09-19 21:00:00',2500.00,'c5094bea-ee29-48bc-9be3-8b299a945e39.jpg'),(5,'Santorini, Greece','Escape to the postcard-perfect island of Santorini. Admire the iconic white-washed buildings with blue domes perched on dramatic cliffs. Watch breathtaking sunsets in Oia, relax on unique black sand beaches, and explore ancient ruins. Indulge in delicious Greek cuisine and world-renowned local wines with stunning Aegean Sea views.','2024-05-19 21:00:00','2024-05-26 21:00:00',1700.00,'e0ed1ffc-9041-4e28-ae77-22185054815b.jpg'),(6,'Machu Picchu, Peru','Embark on a journey to the ancient Incan citadel of Machu Picchu. Trek through the stunning Andes Mountains, marveling at the engineering feat of this 15th-century wonder. Explore the Sacred Valley, learn about Incan history and culture, and experience the vibrant markets and cuisine of nearby Cusco, the former capital of the Incan Empire.','2024-09-30 21:00:00','2024-10-07 21:00:00',2200.00,'a19d99ee-46c0-4fb9-b509-158f5821aa65.jpg'),(7,'Sydney, Australia','Experience the vibrant energy of Sydney. Sail in the iconic harbor, passing the Sydney Opera House and Harbour Bridge. Soak up the sun on world-famous Bondi Beach, explore the historic Rocks district, and get up close with unique wildlife at Taronga Zoo. Enjoy the citys excellent food scene and take day trips to the nearby Blue Mountains.','2024-11-14 22:00:00','2024-11-24 22:00:00',2800.00,'cf7fddec-9390-4250-bc0d-3812681e5b35.jpg'),(8,'Maldives','Indulge in luxury and tranquility in the Maldives. Stay in overwater bungalows with direct access to crystal-clear lagoons teeming with colorful marine life. Enjoy world-class snorkeling and diving, rejuvenate with spa treatments, and savor fresh seafood under starlit skies. Experience the ultimate romantic getaway or peaceful retreat in this tropical paradise.','2024-11-30 22:00:00','2024-12-09 22:00:00',3500.00,'39c9722e-7322-4533-9bd6-b0e081e1f2af.jpg'),(9,'Rome, Italy','Step back in time in the Eternal City. Marvel at ancient wonders like the Colosseum and Roman Forum, toss a coin in the Trevi Fountain, and explore the vastness of St. Peters Basilica. Indulge in authentic Italian cuisine, from perfect pasta to creamy gelato, and wander through charming neighborhoods like Trastevere. Experience la dolce vita in this open-air museum of a city.','2025-03-04 22:00:00','2025-03-11 22:00:00',1600.00,'cc9b46e6-96ec-4dd1-a887-9146a9358a59.jpg'),(10,'Queenstown, New Zealand','Embark on an adventure in the adrenaline capital of the world. Surrounded by majestic mountains and set on the shores of crystal clear Lake Wakatipu, Queenstown offers a paradise for thrill-seekers and nature lovers alike. Enjoy skiing, bungee jumping, skydiving, and jet boating, or take scenic hikes and relax in world-class spas. Dont miss a trip to nearby Milford Sound, one of the most beautiful fjords in the world.','2025-01-09 22:00:00','2025-01-19 22:00:00',2300.00,'da5fe558-7cd5-4130-ac82-6f107bd04e20.jpg'),(11,'Reykjavik, Iceland','Discover the land of fire and ice from Reykjavik. Witness the ethereal Northern Lights, relax in geothermal hot springs like the Blue Lagoon, and explore otherworldly landscapes of volcanoes, glaciers, and black sand beaches. Take a Golden Circle tour to see stunning waterfalls and geysers, and experience the quirky, creative culture of the worlds northernmost capital city.','2025-03-31 21:00:00','2025-04-07 21:00:00',2100.00,'bbc1f3af-4301-4aa1-b73d-1ef2012a87a5.jpg'),(12,'Rio de Janeiro, Brazil','Revel in the rhythm of Rio de Janeiro. Soak up the sun on famous Copacabana and Ipanema beaches, take in panoramic views from Christ the Redeemer atop Corcovado Mountain, and ride a cable car to Sugarloaf Mountain. Experience the vibrant nightlife, dance to samba beats, and indulge in Brazilian barbecue. If youre lucky, witness the spectacular Carnival celebrations that set the city alight with color and music.','2025-05-09 21:00:00','2025-05-19 21:00:00',2400.00,'b4c7a985-f6a2-475c-b214-0a07d8048b57.jpg'),(13,'Kyoto, Japan','Step into the heart of traditional Japan in Kyoto. Explore serene Zen gardens, visit ancient temples and shrines like the golden Kinkaku-ji and the torii gates of Fushimi Inari-taisha. Witness the grace of geishas in the historic Gion district, participate in a traditional tea ceremony, and stroll through the enchanting Arashiyama Bamboo Grove. Experience the citys refined cuisine, from kaiseki ryori to matcha-flavored sweets.','2025-06-14 21:00:00','2025-06-21 21:00:00',2000.00,'b1e7959d-506a-425b-859c-465ecc5a5991.jpg'),(14,'Barcelona, Spain','Immerse yourself in the vibrant culture of Barcelona. Marvel at Antoni Gaudís surreal architecture, including the awe-inspiring Sagrada Familia and whimsical Park Güell. Stroll down Las Ramblas, explore the Gothic Quarter, and relax on Barceloneta Beach. Indulge in delicious Catalan cuisine, from tapas to paella, in busy markets and cozy restaurants. Experience the citys passionate football culture and lively nightlife scene.','2025-06-30 21:00:00','2025-07-09 21:00:00',1800.00,'337088bf-b06e-4d7b-be4c-a096f1cc6984.jpg'),(83,'Santorini, Greece','Experience the magic of this iconic Greek island. Wander through white-washed villages, watch legendary sunsets in Oia, and swim in volcanic hot springs. Enjoy fresh Mediterranean cuisine at cliff-side restaurants, visit local wineries, and relax on unique red and black sand beaches.','2024-11-10 10:00:00','2025-01-15 10:00:00',2100.00,'bdc73dc6-7b13-47f5-acbe-068c90888e3d.jpg'),(84,'Dubai, UAE','Experience the city of superlatives. Ascend the Burj Khalifa, shop in the world\'s largest mall, and ski indoor while in the desert. Take a desert safari, dine at world-class restaurants, and marvel at the dancing Dubai Fountain.','2024-11-12 10:00:00','2025-02-20 10:00:00',2600.00,'90de4e14-1d7a-4405-abc1-7ba9ba4b4c8a.jpg'),(85,'Vietnam','Journey through stunning landscapes and rich culture. Cruise through Ha Long Bay\'s limestone islands, explore ancient Hoi An\'s lantern-lit streets, and experience the bustling energy of Hanoi. Sample amazing street food, visit floating markets, and trek through rice terraces.','2024-11-13 10:00:00','2025-03-15 10:00:00',1700.00,'95279f05-f195-458f-b28e-7928ade0d729.jpg'),(86,'Cape Town, South Africa','Discover where mountains meet the ocean. Hike Table Mountain, visit historic Robben Island, and explore the vibrant V&A Waterfront. Go wine tasting in Stellenbosch, watch penguins at Boulders Beach, and take a scenic drive along Chapman\'s Peak.','2024-11-20 10:00:00','2024-11-27 10:00:00',1800.00,'7050c47d-a807-45f4-9609-fddbd4ed21eb.jpg'),(87,'Marrakech, Morocco','Immerse yourself in the exotic charm of North Africa. Navigate the bustling souks, visit ornate palaces, and relax in traditional riads. Experience a hammam spa, dine on tagines under the stars, and take a hot air balloon ride over the Atlas Mountains.','2024-11-25 10:00:00','2024-12-02 10:00:00',1500.00,'64da3415-8e79-4bea-949c-11f3d7e92950.jpg'),(88,'Prague, Czech Republic','Step into a fairy-tale medieval city. Cross the Charles Bridge at dawn, explore Prague Castle, and watch the Astronomical Clock come to life. Enjoy world-famous Czech beer, attend classical concerts, and wander through hidden courtyards.','2024-12-01 10:00:00','2024-12-08 10:00:00',1400.00,'dd29601c-515a-4c9f-b540-59327ad0781d.jpg'),(89,'Scottish Highlands','Explore the rugged beauty of Scotland. Visit mysterious castles, search for Nessie at Loch Ness, and hike through dramatic glens. Taste single malt whisky at historic distilleries, experience traditional Highland games, and learn about clan history.','2024-12-05 10:00:00','2024-12-12 10:00:00',2200.00,'a9119af2-214a-415a-a7f8-f28a06c543f1.jpg'),(90,'Jordan','Uncover ancient wonders in the desert. Explore the rose-red city of Petra, float in the Dead Sea, and camp under stars in Wadi Rum. Experience Bedouin hospitality, visit crusader castles, and enjoy traditional Middle Eastern cuisine.','2024-12-10 10:00:00','2024-12-17 10:00:00',2300.00,'3f2abef9-3bd6-41ef-974b-0db0c18662cd.jpg'),(91,'Swiss Alps','Experience alpine paradise in any season. Ski world-class slopes, hike flowering meadows, and ride scenic train routes. Stay in charming mountain villages, enjoy Swiss chocolate and cheese, and take cable cars to stunning viewpoints.','2024-12-15 10:00:00','2024-12-22 10:00:00',2800.00,'bc3be3ef-a1e3-4abe-abc0-5211527a4691.jpg'),(92,'Costa Rica','Adventure through tropical paradise. Zip-line through rainforest canopies, relax on pristine beaches, and watch active volcanoes. Spot exotic wildlife, surf perfect waves, and experience the pure life (pura vida) philosophy.','2024-12-20 10:00:00','2024-12-27 10:00:00',1900.00,'2eb72109-fd29-42c9-8c62-e91bab39e8d2.jpg'),(93,'Malta','Discover this Mediterranean jewel. Explore medieval streets, swim in crystal-clear lagoons, and visit ancient temples. Experience local festivals, taste fresh seafood, and learn about the islands\' rich history of knights and conquests.','2024-12-23 10:00:00','2024-12-30 10:00:00',1600.00,'bf697331-b4a1-4e5e-8210-c51d8fd99ec4.jpg'),(94,'Bhutan','Visit the last Shangri-La. Trek to the Tiger\'s Nest Monastery, experience traditional festivals, and learn about Gross National Happiness. Visit ancient dzongs, try archery, and immerse yourself in Buddhist culture.','2024-12-28 10:00:00','2025-01-04 10:00:00',3200.00,'e18e1b15-1c27-458c-a413-3a84b4602fb7.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-17 12:31:43

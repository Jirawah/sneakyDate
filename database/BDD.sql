-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : lun. 23 oct. 2023 à 09:46
-- Version du serveur : 8.0.30
-- Version de PHP : 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sneakydate`
--

DELIMITER $$
--
-- Procédures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `FillCardboxDates` ()   BEGIN
  DECLARE i INT DEFAULT 1;
  DECLARE target_date DATE DEFAULT '2023-01-01';

  WHILE i <= 365 DO
    INSERT INTO cardbox(cardbox_id, date) VALUES (i, target_date);
    SET i = i + 1;
    SET target_date = DATE_ADD(target_date, INTERVAL 1 DAY);
  END WHILE;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `cardbox`
--

CREATE TABLE `cardbox` (
  `date` date NOT NULL,
  `cardbox_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `cardbox`
--

INSERT INTO `cardbox` (`date`, `cardbox_id`) VALUES
('2023-01-01', 1),
('2023-01-02', 2),
('2023-01-03', 3),
('2023-01-04', 4),
('2023-01-05', 5),
('2023-01-06', 6),
('2023-01-07', 7),
('2023-01-08', 8),
('2023-01-09', 9),
('2023-01-10', 10),
('2023-01-11', 11),
('2023-01-12', 12),
('2023-01-13', 13),
('2023-01-14', 14),
('2023-01-15', 15),
('2023-01-16', 16),
('2023-01-17', 17),
('2023-01-18', 18),
('2023-01-19', 19),
('2023-01-20', 20),
('2023-01-21', 21),
('2023-01-22', 22),
('2023-01-23', 23),
('2023-01-24', 24),
('2023-01-25', 25),
('2023-01-26', 26),
('2023-01-27', 27),
('2023-01-28', 28),
('2023-01-29', 29),
('2023-01-30', 30),
('2023-01-31', 31),
('2023-02-01', 32),
('2023-02-02', 33),
('2023-02-03', 34),
('2023-02-04', 35),
('2023-02-05', 36),
('2023-02-06', 37),
('2023-02-07', 38),
('2023-02-08', 39),
('2023-02-09', 40),
('2023-02-10', 41),
('2023-02-11', 42),
('2023-02-12', 43),
('2023-02-13', 44),
('2023-02-14', 45),
('2023-02-15', 46),
('2023-02-16', 47),
('2023-02-17', 48),
('2023-02-18', 49),
('2023-02-19', 50),
('2023-02-20', 51),
('2023-02-21', 52),
('2023-02-22', 53),
('2023-02-23', 54),
('2023-02-24', 55),
('2023-02-25', 56),
('2023-02-26', 57),
('2023-02-27', 58),
('2023-02-28', 59),
('2023-03-01', 60),
('2023-03-02', 61),
('2023-03-03', 62),
('2023-03-04', 63),
('2023-03-05', 64),
('2023-03-06', 65),
('2023-03-07', 66),
('2023-03-08', 67),
('2023-03-09', 68),
('2023-03-10', 69),
('2023-03-11', 70),
('2023-03-12', 71),
('2023-03-13', 72),
('2023-03-14', 73),
('2023-03-15', 74),
('2023-03-16', 75),
('2023-03-17', 76),
('2023-03-18', 77),
('2023-03-19', 78),
('2023-03-20', 79),
('2023-03-21', 80),
('2023-03-22', 81),
('2023-03-23', 82),
('2023-03-24', 83),
('2023-03-25', 84),
('2023-03-26', 85),
('2023-03-27', 86),
('2023-03-28', 87),
('2023-03-29', 88),
('2023-03-30', 89),
('2023-03-31', 90),
('2023-04-01', 91),
('2023-04-02', 92),
('2023-04-03', 93),
('2023-04-04', 94),
('2023-04-05', 95),
('2023-04-06', 96),
('2023-04-07', 97),
('2023-04-08', 98),
('2023-04-09', 99),
('2023-04-10', 100),
('2023-04-11', 101),
('2023-04-12', 102),
('2023-04-13', 103),
('2023-04-14', 104),
('2023-04-15', 105),
('2023-04-16', 106),
('2023-04-17', 107),
('2023-04-18', 108),
('2023-04-19', 109),
('2023-04-20', 110),
('2023-04-21', 111),
('2023-04-22', 112),
('2023-04-23', 113),
('2023-04-24', 114),
('2023-04-25', 115),
('2023-04-26', 116),
('2023-04-27', 117),
('2023-04-28', 118),
('2023-04-29', 119),
('2023-04-30', 120),
('2023-05-01', 121),
('2023-05-02', 122),
('2023-05-03', 123),
('2023-05-04', 124),
('2023-05-05', 125),
('2023-05-06', 126),
('2023-05-07', 127),
('2023-05-08', 128),
('2023-05-09', 129),
('2023-05-10', 130),
('2023-05-11', 131),
('2023-05-12', 132),
('2023-05-13', 133),
('2023-05-14', 134),
('2023-05-15', 135),
('2023-05-16', 136),
('2023-05-17', 137),
('2023-05-18', 138),
('2023-05-19', 139),
('2023-05-20', 140),
('2023-05-21', 141),
('2023-05-22', 142),
('2023-05-23', 143),
('2023-05-24', 144),
('2023-05-25', 145),
('2023-05-26', 146),
('2023-05-27', 147),
('2023-05-28', 148),
('2023-05-29', 149),
('2023-05-30', 150),
('2023-05-31', 151),
('2023-06-01', 152),
('2023-06-02', 153),
('2023-06-03', 154),
('2023-06-04', 155),
('2023-06-05', 156),
('2023-06-06', 157),
('2023-06-07', 158),
('2023-06-08', 159),
('2023-06-09', 160),
('2023-06-10', 161),
('2023-06-11', 162),
('2023-06-12', 163),
('2023-06-13', 164),
('2023-06-14', 165),
('2023-06-15', 166),
('2023-06-16', 167),
('2023-06-17', 168),
('2023-06-18', 169),
('2023-06-19', 170),
('2023-06-20', 171),
('2023-06-21', 172),
('2023-06-22', 173),
('2023-06-23', 174),
('2023-06-24', 175),
('2023-06-25', 176),
('2023-06-26', 177),
('2023-06-27', 178),
('2023-06-28', 179),
('2023-06-29', 180),
('2023-06-30', 181),
('2023-07-01', 182),
('2023-07-02', 183),
('2023-07-03', 184),
('2023-07-04', 185),
('2023-07-05', 186),
('2023-07-06', 187),
('2023-07-07', 188),
('2023-07-08', 189),
('2023-07-09', 190),
('2023-07-10', 191),
('2023-07-11', 192),
('2023-07-12', 193),
('2023-07-13', 194),
('2023-07-14', 195),
('2023-07-15', 196),
('2023-07-16', 197),
('2023-07-17', 198),
('2023-07-18', 199),
('2023-07-19', 200),
('2023-07-20', 201),
('2023-07-21', 202),
('2023-07-22', 203),
('2023-07-23', 204),
('2023-07-24', 205),
('2023-07-25', 206),
('2023-07-26', 207),
('2023-07-27', 208),
('2023-07-28', 209),
('2023-07-29', 210),
('2023-07-30', 211),
('2023-07-31', 212),
('2023-08-01', 213),
('2023-08-02', 214),
('2023-08-03', 215),
('2023-08-04', 216),
('2023-08-05', 217),
('2023-08-06', 218),
('2023-08-07', 219),
('2023-08-08', 220),
('2023-08-09', 221),
('2023-08-10', 222),
('2023-08-11', 223),
('2023-08-12', 224),
('2023-08-13', 225),
('2023-08-14', 226),
('2023-08-15', 227),
('2023-08-16', 228),
('2023-08-17', 229),
('2023-08-18', 230),
('2023-08-19', 231),
('2023-08-20', 232),
('2023-08-21', 233),
('2023-08-22', 234),
('2023-08-23', 235),
('2023-08-24', 236),
('2023-08-25', 237),
('2023-08-26', 238),
('2023-08-27', 239),
('2023-08-28', 240),
('2023-08-29', 241),
('2023-08-30', 242),
('2023-08-31', 243),
('2023-09-01', 244),
('2023-09-02', 245),
('2023-09-03', 246),
('2023-09-04', 247),
('2023-09-05', 248),
('2023-09-06', 249),
('2023-09-07', 250),
('2023-09-08', 251),
('2023-09-09', 252),
('2023-09-10', 253),
('2023-09-11', 254),
('2023-09-12', 255),
('2023-09-13', 256),
('2023-09-14', 257),
('2023-09-15', 258),
('2023-09-16', 259),
('2023-09-17', 260),
('2023-09-18', 261),
('2023-09-19', 262),
('2023-09-20', 263),
('2023-09-21', 264),
('2023-09-22', 265),
('2023-09-23', 266),
('2023-09-24', 267),
('2023-09-25', 268),
('2023-09-26', 269),
('2023-09-27', 270),
('2023-09-28', 271),
('2023-09-29', 272),
('2023-09-30', 273),
('2023-10-01', 274),
('2023-10-02', 275),
('2023-10-03', 276),
('2023-10-04', 277),
('2023-10-05', 278),
('2023-10-06', 279),
('2023-10-07', 280),
('2023-10-08', 281),
('2023-10-09', 282),
('2023-10-10', 283),
('2023-10-11', 284),
('2023-10-12', 285),
('2023-10-13', 286),
('2023-10-14', 287),
('2023-10-15', 288),
('2023-10-16', 289),
('2023-10-17', 290),
('2023-10-18', 291),
('2023-10-19', 292),
('2023-10-20', 293),
('2023-10-21', 294),
('2023-10-22', 295),
('2023-10-23', 296),
('2023-10-24', 297),
('2023-10-25', 298),
('2023-10-26', 299),
('2023-10-27', 300),
('2023-10-28', 301),
('2023-10-29', 302),
('2023-10-30', 303),
('2023-10-31', 304),
('2023-11-01', 305),
('2023-11-02', 306),
('2023-11-03', 307),
('2023-11-04', 308),
('2023-11-05', 309),
('2023-11-06', 310),
('2023-11-07', 311),
('2023-11-08', 312),
('2023-11-09', 313),
('2023-11-10', 314),
('2023-11-11', 315),
('2023-11-12', 316),
('2023-11-13', 317),
('2023-11-14', 318),
('2023-11-15', 319),
('2023-11-16', 320),
('2023-11-17', 321),
('2023-11-18', 322),
('2023-11-19', 323),
('2023-11-20', 324),
('2023-11-21', 325),
('2023-11-22', 326),
('2023-11-23', 327),
('2023-11-24', 328),
('2023-11-25', 329),
('2023-11-26', 330),
('2023-11-27', 331),
('2023-11-28', 332),
('2023-11-29', 333),
('2023-11-30', 334),
('2023-12-01', 335),
('2023-12-02', 336),
('2023-12-03', 337),
('2023-12-04', 338),
('2023-12-05', 339),
('2023-12-06', 340),
('2023-12-07', 341),
('2023-12-08', 342),
('2023-12-09', 343),
('2023-12-10', 344),
('2023-12-11', 345),
('2023-12-12', 346),
('2023-12-13', 347),
('2023-12-14', 348),
('2023-12-15', 349),
('2023-12-16', 350),
('2023-12-17', 351),
('2023-12-18', 352),
('2023-12-19', 353),
('2023-12-20', 354),
('2023-12-21', 355),
('2023-12-22', 356),
('2023-12-23', 357),
('2023-12-24', 358),
('2023-12-25', 359),
('2023-12-26', 360),
('2023-12-27', 361),
('2023-12-28', 362),
('2023-12-29', 363),
('2023-12-30', 364),
('2023-12-31', 365);

-- --------------------------------------------------------

--
-- Structure de la table `etreinvite`
--

CREATE TABLE `etreinvite` (
  `member_id` bigint NOT NULL,
  `rdv_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `friendship`
--

CREATE TABLE `friendship` (
  `member_id1` bigint NOT NULL,
  `member_id2` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `invitation`
--

CREATE TABLE `invitation` (
  `MemberInvite_id` bigint NOT NULL,
  `invitation_id` bigint NOT NULL,
  `rdv_id` bigint NOT NULL,
  `I_R_rdv_id` bigint NOT NULL,
  `member_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `member`
--

CREATE TABLE `member` (
  `member_id` bigint NOT NULL,
  `memberName` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `friendList` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `participer`
--

CREATE TABLE `participer` (
  `member_id` bigint NOT NULL,
  `rdv_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `rdv`
--

CREATE TABLE `rdv` (
  `orga` varchar(100) NOT NULL,
  `statut` char(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `rdvName` varchar(100) NOT NULL,
  `rdv_id` bigint NOT NULL,
  `member_id` bigint NOT NULL,
  `cardbox_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `voir`
--

CREATE TABLE `voir` (
  `cardbox_id` bigint NOT NULL,
  `member_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cardbox`
--
ALTER TABLE `cardbox`
  ADD PRIMARY KEY (`cardbox_id`),
  ADD UNIQUE KEY `ID_Cardbox_IND` (`cardbox_id`);

--
-- Index pour la table `etreinvite`
--
ALTER TABLE `etreinvite`
  ADD PRIMARY KEY (`rdv_id`,`member_id`),
  ADD UNIQUE KEY `ID_EtreInvite_IND` (`rdv_id`,`member_id`),
  ADD KEY `FKEtr_Mem_IND` (`member_id`);

--
-- Index pour la table `friendship`
--
ALTER TABLE `friendship`
  ADD PRIMARY KEY (`member_id1`,`member_id2`),
  ADD KEY `member_id2` (`member_id2`);

--
-- Index pour la table `invitation`
--
ALTER TABLE `invitation`
  ADD PRIMARY KEY (`invitation_id`),
  ADD UNIQUE KEY `SID_Invitation_1_ID` (`rdv_id`),
  ADD UNIQUE KEY `SID_Invitation_ID` (`MemberInvite_id`),
  ADD UNIQUE KEY `ID_Invitation_IND` (`invitation_id`),
  ADD UNIQUE KEY `SID_Invitation_1_IND` (`rdv_id`),
  ADD UNIQUE KEY `SID_Invitation_IND` (`MemberInvite_id`),
  ADD KEY `FKInv_RDV_IND` (`I_R_rdv_id`),
  ADD KEY `FKInv_Mem_IND` (`member_id`);

--
-- Index pour la table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`member_id`),
  ADD UNIQUE KEY `memberName` (`memberName`),
  ADD UNIQUE KEY `ID_Member_IND` (`member_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `participer`
--
ALTER TABLE `participer`
  ADD PRIMARY KEY (`rdv_id`,`member_id`),
  ADD UNIQUE KEY `ID_participer_IND` (`rdv_id`,`member_id`),
  ADD KEY `FKpar_Mem_IND` (`member_id`);

--
-- Index pour la table `rdv`
--
ALTER TABLE `rdv`
  ADD PRIMARY KEY (`rdv_id`),
  ADD UNIQUE KEY `ID_RDV_IND` (`rdv_id`),
  ADD KEY `FKInv_Car_FK` (`cardbox_id`),
  ADD KEY `FKorganiser_IND` (`member_id`);

--
-- Index pour la table `voir`
--
ALTER TABLE `voir`
  ADD PRIMARY KEY (`cardbox_id`,`member_id`),
  ADD UNIQUE KEY `ID_voir_IND` (`cardbox_id`,`member_id`),
  ADD KEY `FKvoi_Mem_IND` (`member_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `member`
--
ALTER TABLE `member`
  MODIFY `member_id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `rdv`
--
ALTER TABLE `rdv`
  MODIFY `rdv_id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `etreinvite`
--
ALTER TABLE `etreinvite`
  ADD CONSTRAINT `FKEtr_Mem_FK` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `FKEtr_RDV` FOREIGN KEY (`rdv_id`) REFERENCES `rdv` (`rdv_id`);

--
-- Contraintes pour la table `friendship`
--
ALTER TABLE `friendship`
  ADD CONSTRAINT `friendship_ibfk_1` FOREIGN KEY (`member_id1`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `friendship_ibfk_2` FOREIGN KEY (`member_id2`) REFERENCES `member` (`member_id`);

--
-- Contraintes pour la table `invitation`
--
ALTER TABLE `invitation`
  ADD CONSTRAINT `FKInv_Mem_FK` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `FKInv_RDV_FK` FOREIGN KEY (`I_R_rdv_id`) REFERENCES `rdv` (`rdv_id`);

--
-- Contraintes pour la table `participer`
--
ALTER TABLE `participer`
  ADD CONSTRAINT `FKpar_Mem_FK` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `FKpar_RDV` FOREIGN KEY (`rdv_id`) REFERENCES `rdv` (`rdv_id`);

--
-- Contraintes pour la table `rdv`
--
ALTER TABLE `rdv`
  ADD CONSTRAINT `FKInv_Car_FK` FOREIGN KEY (`cardbox_id`) REFERENCES `cardbox` (`cardbox_id`),
  ADD CONSTRAINT `FKorganiser_FK` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `rdv_ibfk_1` FOREIGN KEY (`cardbox_id`) REFERENCES `cardbox` (`cardbox_id`);

--
-- Contraintes pour la table `voir`
--
ALTER TABLE `voir`
  ADD CONSTRAINT `FKvoi_Car` FOREIGN KEY (`cardbox_id`) REFERENCES `cardbox` (`cardbox_id`),
  ADD CONSTRAINT `FKvoi_Mem_FK` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


















-- -- phpMyAdmin SQL Dump
-- -- version 5.2.1
-- -- https://www.phpmyadmin.net/
-- --
-- -- Hôte : localhost:3306
-- -- Généré le : lun. 16 oct. 2023 à 08:25
-- -- Version du serveur : 8.0.30
-- -- Version de PHP : 8.1.10

-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- START TRANSACTION;
-- SET time_zone = "+00:00";


-- /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
-- /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
-- /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
-- /*!40101 SET NAMES utf8mb4 */;

-- --
-- -- Base de données : `sneakydate`
-- --

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `cardbox`
-- --

-- CREATE TABLE `cardbox` (
--   `date` date NOT NULL,
--   `cardbox_id` bigint NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `etreinvite`
-- --

-- CREATE TABLE `etreinvite` (
--   `member_id` bigint NOT NULL,
--   `rdv_id` bigint NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `friendship`
-- --

-- CREATE TABLE `friendship` (
--   `member_id1` bigint NOT NULL,
--   `member_id2` bigint NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `invitation`
-- --

-- CREATE TABLE `invitation` (
--   `MemberInvite_id` bigint NOT NULL,
--   `invitation_id` bigint NOT NULL,
--   `rdv_id` bigint NOT NULL,
--   `I_R_rdv_id` bigint NOT NULL,
--   `member_id` bigint NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `member`
-- --

-- CREATE TABLE `member` (
--   `member_id` bigint NOT NULL,
--   `memberName` varchar(100) NOT NULL,
--   `password` varchar(255) NOT NULL,
--   `email` varchar(255) DEFAULT NULL,
--   `friendList` varchar(255) DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --
-- -- Déchargement des données de la table `member`
-- --

-- INSERT INTO `member` (`member_id`, `memberName`, `password`, `email`, `friendList`) VALUES
-- (1, 'test2', '$2b$10$ByehWQTw85o5dNGy0FLz6.meuTJR6kmUYvmRXqC.bnQ2ttsQsXq4m', 'test@gmail.fr', NULL),
-- (4, 'test5', '$2b$10$besgPb1UhxUu7qEdImm9ROVpfbY4rIgxOHFtzNuXDH08LXVG0Zpim', 'test5@gmail.fr', NULL),
-- (5, 'test6', '$2b$10$Emtuu20oAOdRMOlPqX7cJ.SuOXjj/Yq0/d3DedfZkJn5iiIiK3Dmi', 'test4@gmail.fr', NULL),
-- (6, 'test3', '$2b$10$wJB.R1Bucqth8C0gQTpLjuQbW4azbJbzYS5Tea8/.2dOcCOKTrGHC', 'test3@gmail.fr', NULL),
-- (7, 'pooo', '$2b$10$dZp/lbkGL9LHm6rBqGJLEeguMLMHmyU1naeeGggXwznvvJ4Dto4Y2', 'kikooo@gmail.fr', NULL);

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `participer`
-- --

-- CREATE TABLE `participer` (
--   `member_id` bigint NOT NULL,
--   `rdv_id` bigint NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `rdv`
-- --

-- CREATE TABLE `rdv` (
--   `orga` varchar(100) NOT NULL,
--   `statut` char(1) NOT NULL,
--   `rdvName` varchar(100) NOT NULL,
--   `rdv_id` bigint NOT NULL,
--   `member_id` bigint NOT NULL,
--   `cardbox_id` bigint NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -- --------------------------------------------------------

-- --
-- -- Structure de la table `voir`
-- --

-- CREATE TABLE `voir` (
--   `cardbox_id` bigint NOT NULL,
--   `member_id` bigint NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --
-- -- Index pour les tables déchargées
-- --

-- --
-- -- Index pour la table `cardbox`
-- --
-- ALTER TABLE `cardbox`
--   ADD PRIMARY KEY (`cardbox_id`),
--   ADD UNIQUE KEY `ID_Cardbox_IND` (`cardbox_id`);

-- --
-- -- Index pour la table `etreinvite`
-- --
-- ALTER TABLE `etreinvite`
--   ADD PRIMARY KEY (`rdv_id`,`member_id`),
--   ADD UNIQUE KEY `ID_EtreInvite_IND` (`rdv_id`,`member_id`),
--   ADD KEY `FKEtr_Mem_IND` (`member_id`);

-- --
-- -- Index pour la table `friendship`
-- --
-- ALTER TABLE `friendship`
--   ADD PRIMARY KEY (`member_id1`,`member_id2`),
--   ADD KEY `member_id2` (`member_id2`);

-- --
-- -- Index pour la table `invitation`
-- --
-- ALTER TABLE `invitation`
--   ADD PRIMARY KEY (`invitation_id`),
--   ADD UNIQUE KEY `SID_Invitation_1_ID` (`rdv_id`),
--   ADD UNIQUE KEY `SID_Invitation_ID` (`MemberInvite_id`),
--   ADD UNIQUE KEY `ID_Invitation_IND` (`invitation_id`),
--   ADD UNIQUE KEY `SID_Invitation_1_IND` (`rdv_id`),
--   ADD UNIQUE KEY `SID_Invitation_IND` (`MemberInvite_id`),
--   ADD KEY `FKInv_RDV_IND` (`I_R_rdv_id`),
--   ADD KEY `FKInv_Mem_IND` (`member_id`);

-- --
-- -- Index pour la table `member`
-- --
-- ALTER TABLE `member`
--   ADD PRIMARY KEY (`member_id`),
--   ADD UNIQUE KEY `memberName` (`memberName`),
--   ADD UNIQUE KEY `ID_Member_IND` (`member_id`),
--   ADD UNIQUE KEY `email` (`email`);

-- --
-- -- Index pour la table `participer`
-- --
-- ALTER TABLE `participer`
--   ADD PRIMARY KEY (`rdv_id`,`member_id`),
--   ADD UNIQUE KEY `ID_participer_IND` (`rdv_id`,`member_id`),
--   ADD KEY `FKpar_Mem_IND` (`member_id`);

-- --
-- -- Index pour la table `rdv`
-- --
-- ALTER TABLE `rdv`
--   ADD PRIMARY KEY (`rdv_id`),
--   ADD UNIQUE KEY `ID_RDV_IND` (`rdv_id`),
--   ADD KEY `FKInv_Car_FK` (`cardbox_id`),
--   ADD KEY `FKorganiser_IND` (`member_id`);

-- --
-- -- Index pour la table `voir`
-- --
-- ALTER TABLE `voir`
--   ADD PRIMARY KEY (`cardbox_id`,`member_id`),
--   ADD UNIQUE KEY `ID_voir_IND` (`cardbox_id`,`member_id`),
--   ADD KEY `FKvoi_Mem_IND` (`member_id`);

-- --
-- -- AUTO_INCREMENT pour les tables déchargées
-- --

-- --
-- -- AUTO_INCREMENT pour la table `member`
-- --
-- ALTER TABLE `member`
--   MODIFY `member_id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

-- --
-- -- Contraintes pour les tables déchargées
-- --

-- --
-- -- Contraintes pour la table `etreinvite`
-- --
-- ALTER TABLE `etreinvite`
--   ADD CONSTRAINT `FKEtr_Mem_FK` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
--   ADD CONSTRAINT `FKEtr_RDV` FOREIGN KEY (`rdv_id`) REFERENCES `rdv` (`rdv_id`);

-- --
-- -- Contraintes pour la table `friendship`
-- --
-- ALTER TABLE `friendship`
--   ADD CONSTRAINT `friendship_ibfk_1` FOREIGN KEY (`member_id1`) REFERENCES `member` (`member_id`),
--   ADD CONSTRAINT `friendship_ibfk_2` FOREIGN KEY (`member_id2`) REFERENCES `member` (`member_id`);

-- --
-- -- Contraintes pour la table `invitation`
-- --
-- ALTER TABLE `invitation`
--   ADD CONSTRAINT `FKInv_Mem_FK` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
--   ADD CONSTRAINT `FKInv_RDV_FK` FOREIGN KEY (`I_R_rdv_id`) REFERENCES `rdv` (`rdv_id`);

-- --
-- -- Contraintes pour la table `participer`
-- --
-- ALTER TABLE `participer`
--   ADD CONSTRAINT `FKpar_Mem_FK` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
--   ADD CONSTRAINT `FKpar_RDV` FOREIGN KEY (`rdv_id`) REFERENCES `rdv` (`rdv_id`);

-- --
-- -- Contraintes pour la table `rdv`
-- --
-- ALTER TABLE `rdv`
--   ADD CONSTRAINT `FKInv_Car_FK` FOREIGN KEY (`cardbox_id`) REFERENCES `cardbox` (`cardbox_id`),
--   ADD CONSTRAINT `FKorganiser_FK` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
--   ADD CONSTRAINT `rdv_ibfk_1` FOREIGN KEY (`cardbox_id`) REFERENCES `cardbox` (`cardbox_id`);

-- --
-- -- Contraintes pour la table `voir`
-- --
-- ALTER TABLE `voir`
--   ADD CONSTRAINT `FKvoi_Car` FOREIGN KEY (`cardbox_id`) REFERENCES `cardbox` (`cardbox_id`),
--   ADD CONSTRAINT `FKvoi_Mem_FK` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`);
-- COMMIT;

-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;










-- -- *********************************************
-- -- * SQL MySQL generation                      
-- -- *--------------------------------------------
-- -- * DB-MAIN version: 11.0.2              
-- -- * Generator date: Sep 14 2021              
-- -- * Generation date: Wed Oct 11 08:17:11 2023 
-- -- * LUN file: C:\Users\Antoine\Desktop\Rapport de stage\sneakyDateBDDtest2.lun 
-- -- * Schema: SCHEMA/1 
-- -- ********************************************* 
-- -- Database Section
-- -- ________________ 
-- -- create database sneakydate;
-- -- use sneakydate;
-- -- -- Tables Section
-- -- -- _____________ 
-- -- create table Cardbox (
-- --     date date not null,
-- --     cardbox_id bigint not null,
-- --     constraint ID_Cardbox_ID primary key (cardbox_id)
-- -- );
-- -- create table EtreInvite (
-- --     member_id bigint not null,
-- --     rdv_id bigint not null,
-- --     constraint ID_EtreInvite_ID primary key (rdv_id, member_id)
-- -- );
-- -- create table Invitation (
-- --     MemberInvite_id bigint not null,
-- --     invitation_id bigint not null,
-- --     rdv_id bigint not null,
-- --     I_R_rdv_id bigint not null,
-- --     member_id bigint not null,
-- --     constraint ID_Invitation_ID primary key (invitation_id),
-- --     constraint SID_Invitation_1_ID unique (rdv_id),
-- --     constraint SID_Invitation_ID unique (MemberInvite_id)
-- -- );
-- -- create table Member (
-- --     member_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- --     memberName VARCHAR(100) NOT NULL UNIQUE,
-- --     password VARCHAR(255) NOT NULL, -- Stocké sous forme de hash
-- --     email VARCHAR(255) UNIQUE,
-- --     friendList VARCHAR(1400) NOT NULL
-- -- );
-- -- create table participer (
-- --     member_id bigint not null,
-- --     rdv_id bigint not null,
-- --     constraint ID_participer_ID primary key (rdv_id, member_id)
-- -- );
-- -- create table RDV (
-- --     orga varchar(100) not null,
-- --     statut char not null,
-- --     rdvName varchar(100) not null,
-- --     rdv_id bigint not null,
-- --     member_id bigint not null,
-- --     cardbox_id BIGINT not null,
-- --     constraint ID_RDV_ID primary key (rdv_id),
-- --     FOREIGN KEY (cardbox_id) REFERENCES Cardbox(cardbox_id)
-- -- );
-- -- create table voir (
-- --     cardbox_id bigint not null,
-- --     member_id bigint not null,
-- --     constraint ID_voir_ID primary key (cardbox_id, member_id)
-- -- );
-- -- create table Friendship (
-- --     member_id1 BIGINT NOT NULL,
-- --     member_id2 BIGINT NOT NULL,
-- --     PRIMARY KEY (member_id1, member_id2),
-- --     FOREIGN KEY (member_id1) REFERENCES Member(member_id),
-- --     FOREIGN KEY (member_id2) REFERENCES Member(member_id)
-- -- );
-- -- -- Constraints Section
-- -- -- ___________________ 
-- -- -- Not implemented
-- -- -- alter table Cardbox add constraint ID_Cardbox_CHK
-- -- --     check(exists(select * from voir
-- -- --                  where voir.cardbox_id = cardbox_id)); 
-- -- alter table EtreInvite
-- -- add constraint FKEtr_RDV foreign key (rdv_id) references RDV (rdv_id);
-- -- alter table EtreInvite
-- -- add constraint FKEtr_Mem_FK foreign key (member_id) references Member (member_id);
-- -- alter table Invitation
-- -- add constraint FKInv_RDV_FK foreign key (I_R_rdv_id) references RDV (rdv_id);
-- -- alter table Invitation
-- -- add constraint FKInv_Mem_FK foreign key (member_id) references Member (member_id);
-- -- alter table RDV
-- -- add constraint FKInv_Car_FK foreign key (cardbox_id) references Cardbox (cardbox_id);
-- -- -- Not implemented
-- -- -- alter table Member add constraint ID_Member_CHK
-- -- --     check(exists(select * from EtreInvite
-- -- --                  where EtreInvite.member_id = member_id)); 
-- -- -- Not implemented
-- -- -- alter table Member add constraint ID_Member_CHK
-- -- --     check(exists(select * from Invitation
-- -- --                  where Invitation.member_id = member_id)); 
-- -- -- Not implemented
-- -- -- alter table Member add constraint ID_Member_CHK
-- -- --     check(exists(select * from RDV
-- -- --                  where RDV.member_id = member_id)); 
-- -- -- Not implemented
-- -- -- alter table Member add constraint ID_Member_CHK
-- -- --     check(exists(select * from participer
-- -- --                  where participer.member_id = member_id)); 
-- -- -- Not implemented
-- -- -- alter table Member add constraint ID_Member_CHK
-- -- --     check(exists(select * from voir
-- -- --                  where voir.member_id = member_id)); 
-- -- alter table participer
-- -- add constraint FKpar_RDV foreign key (rdv_id) references RDV (rdv_id);
-- -- alter table participer
-- -- add constraint FKpar_Mem_FK foreign key (member_id) references Member (member_id);
-- -- -- Not implemented
-- -- -- alter table RDV add constraint ID_RDV_CHK
-- -- --     check(exists(select * from EtreInvite
-- -- --                  where EtreInvite.rdv_id = rdv_id)); 
-- -- -- Not implemented
-- -- -- alter table RDV add constraint ID_RDV_CHK
-- -- --     check(exists(select * from Invitation
-- -- --                  where Invitation.I_R_rdv_id = rdv_id)); 
-- -- -- Not implemented
-- -- -- alter table RDV add constraint ID_RDV_CHK
-- -- --     check(exists(select * from participer
-- -- --                  where participer.rdv_id = rdv_id)); 
-- -- alter table RDV
-- -- add constraint FKorganiser_FK foreign key (member_id) references Member (member_id);
-- -- alter table voir
-- -- add constraint FKvoi_Mem_FK foreign key (member_id) references Member (member_id);
-- -- alter table voir
-- -- add constraint FKvoi_Car foreign key (cardbox_id) references Cardbox (cardbox_id);
-- -- -- Index Section
-- -- -- _____________ 
-- -- create unique index ID_Cardbox_IND on Cardbox (cardbox_id);
-- -- create unique index ID_EtreInvite_IND on EtreInvite (rdv_id, member_id);
-- -- create index FKEtr_Mem_IND on EtreInvite (member_id);
-- -- create unique index ID_Invitation_IND on Invitation (invitation_id);
-- -- create unique index SID_Invitation_1_IND on Invitation (rdv_id);
-- -- create unique index SID_Invitation_IND on Invitation (MemberInvite_id);
-- -- create index FKInv_RDV_IND on Invitation (I_R_rdv_id);
-- -- create index FKInv_Mem_IND on Invitation (member_id);
-- -- create unique index ID_Member_IND on Member (member_id);
-- -- create unique index ID_participer_IND on participer (rdv_id, member_id);
-- -- create index FKpar_Mem_IND on participer (member_id);
-- -- create unique index ID_RDV_IND on RDV (rdv_id);
-- -- create index FKorganiser_IND on RDV (member_id);
-- -- create unique index ID_voir_IND on voir (cardbox_id, member_id);
-- -- create index FKvoi_Mem_IND on voir (member_id);
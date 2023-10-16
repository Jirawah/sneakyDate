-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : lun. 16 oct. 2023 à 08:25
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

-- --------------------------------------------------------

--
-- Structure de la table `cardbox`
--

CREATE TABLE `cardbox` (
  `date` date NOT NULL,
  `cardbox_id` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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

--
-- Déchargement des données de la table `member`
--

INSERT INTO `member` (`member_id`, `memberName`, `password`, `email`, `friendList`) VALUES
(1, 'test2', '$2b$10$ByehWQTw85o5dNGy0FLz6.meuTJR6kmUYvmRXqC.bnQ2ttsQsXq4m', 'test@gmail.fr', NULL),
(4, 'test5', '$2b$10$besgPb1UhxUu7qEdImm9ROVpfbY4rIgxOHFtzNuXDH08LXVG0Zpim', 'test5@gmail.fr', NULL),
(5, 'test6', '$2b$10$Emtuu20oAOdRMOlPqX7cJ.SuOXjj/Yq0/d3DedfZkJn5iiIiK3Dmi', 'test4@gmail.fr', NULL),
(6, 'test3', '$2b$10$wJB.R1Bucqth8C0gQTpLjuQbW4azbJbzYS5Tea8/.2dOcCOKTrGHC', 'test3@gmail.fr', NULL),
(7, 'pooo', '$2b$10$dZp/lbkGL9LHm6rBqGJLEeguMLMHmyU1naeeGggXwznvvJ4Dto4Y2', 'kikooo@gmail.fr', NULL);

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
  `statut` char(1) NOT NULL,
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
  MODIFY `member_id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
-- create database sneakydate;
-- use sneakydate;
-- -- Tables Section
-- -- _____________ 
-- create table Cardbox (
--     date date not null,
--     cardbox_id bigint not null,
--     constraint ID_Cardbox_ID primary key (cardbox_id)
-- );
-- create table EtreInvite (
--     member_id bigint not null,
--     rdv_id bigint not null,
--     constraint ID_EtreInvite_ID primary key (rdv_id, member_id)
-- );
-- create table Invitation (
--     MemberInvite_id bigint not null,
--     invitation_id bigint not null,
--     rdv_id bigint not null,
--     I_R_rdv_id bigint not null,
--     member_id bigint not null,
--     constraint ID_Invitation_ID primary key (invitation_id),
--     constraint SID_Invitation_1_ID unique (rdv_id),
--     constraint SID_Invitation_ID unique (MemberInvite_id)
-- );
-- create table Member (
--     member_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     memberName VARCHAR(100) NOT NULL UNIQUE,
--     password VARCHAR(255) NOT NULL, -- Stocké sous forme de hash
--     email VARCHAR(255) UNIQUE,
--     friendList VARCHAR(1400) NOT NULL
-- );
-- create table participer (
--     member_id bigint not null,
--     rdv_id bigint not null,
--     constraint ID_participer_ID primary key (rdv_id, member_id)
-- );
-- create table RDV (
--     orga varchar(100) not null,
--     statut char not null,
--     rdvName varchar(100) not null,
--     rdv_id bigint not null,
--     member_id bigint not null,
--     cardbox_id BIGINT not null,
--     constraint ID_RDV_ID primary key (rdv_id),
--     FOREIGN KEY (cardbox_id) REFERENCES Cardbox(cardbox_id)
-- );
-- create table voir (
--     cardbox_id bigint not null,
--     member_id bigint not null,
--     constraint ID_voir_ID primary key (cardbox_id, member_id)
-- );
-- create table Friendship (
--     member_id1 BIGINT NOT NULL,
--     member_id2 BIGINT NOT NULL,
--     PRIMARY KEY (member_id1, member_id2),
--     FOREIGN KEY (member_id1) REFERENCES Member(member_id),
--     FOREIGN KEY (member_id2) REFERENCES Member(member_id)
-- );
-- -- Constraints Section
-- -- ___________________ 
-- -- Not implemented
-- -- alter table Cardbox add constraint ID_Cardbox_CHK
-- --     check(exists(select * from voir
-- --                  where voir.cardbox_id = cardbox_id)); 
-- alter table EtreInvite
-- add constraint FKEtr_RDV foreign key (rdv_id) references RDV (rdv_id);
-- alter table EtreInvite
-- add constraint FKEtr_Mem_FK foreign key (member_id) references Member (member_id);
-- alter table Invitation
-- add constraint FKInv_RDV_FK foreign key (I_R_rdv_id) references RDV (rdv_id);
-- alter table Invitation
-- add constraint FKInv_Mem_FK foreign key (member_id) references Member (member_id);
-- alter table RDV
-- add constraint FKInv_Car_FK foreign key (cardbox_id) references Cardbox (cardbox_id);
-- -- Not implemented
-- -- alter table Member add constraint ID_Member_CHK
-- --     check(exists(select * from EtreInvite
-- --                  where EtreInvite.member_id = member_id)); 
-- -- Not implemented
-- -- alter table Member add constraint ID_Member_CHK
-- --     check(exists(select * from Invitation
-- --                  where Invitation.member_id = member_id)); 
-- -- Not implemented
-- -- alter table Member add constraint ID_Member_CHK
-- --     check(exists(select * from RDV
-- --                  where RDV.member_id = member_id)); 
-- -- Not implemented
-- -- alter table Member add constraint ID_Member_CHK
-- --     check(exists(select * from participer
-- --                  where participer.member_id = member_id)); 
-- -- Not implemented
-- -- alter table Member add constraint ID_Member_CHK
-- --     check(exists(select * from voir
-- --                  where voir.member_id = member_id)); 
-- alter table participer
-- add constraint FKpar_RDV foreign key (rdv_id) references RDV (rdv_id);
-- alter table participer
-- add constraint FKpar_Mem_FK foreign key (member_id) references Member (member_id);
-- -- Not implemented
-- -- alter table RDV add constraint ID_RDV_CHK
-- --     check(exists(select * from EtreInvite
-- --                  where EtreInvite.rdv_id = rdv_id)); 
-- -- Not implemented
-- -- alter table RDV add constraint ID_RDV_CHK
-- --     check(exists(select * from Invitation
-- --                  where Invitation.I_R_rdv_id = rdv_id)); 
-- -- Not implemented
-- -- alter table RDV add constraint ID_RDV_CHK
-- --     check(exists(select * from participer
-- --                  where participer.rdv_id = rdv_id)); 
-- alter table RDV
-- add constraint FKorganiser_FK foreign key (member_id) references Member (member_id);
-- alter table voir
-- add constraint FKvoi_Mem_FK foreign key (member_id) references Member (member_id);
-- alter table voir
-- add constraint FKvoi_Car foreign key (cardbox_id) references Cardbox (cardbox_id);
-- -- Index Section
-- -- _____________ 
-- create unique index ID_Cardbox_IND on Cardbox (cardbox_id);
-- create unique index ID_EtreInvite_IND on EtreInvite (rdv_id, member_id);
-- create index FKEtr_Mem_IND on EtreInvite (member_id);
-- create unique index ID_Invitation_IND on Invitation (invitation_id);
-- create unique index SID_Invitation_1_IND on Invitation (rdv_id);
-- create unique index SID_Invitation_IND on Invitation (MemberInvite_id);
-- create index FKInv_RDV_IND on Invitation (I_R_rdv_id);
-- create index FKInv_Mem_IND on Invitation (member_id);
-- create unique index ID_Member_IND on Member (member_id);
-- create unique index ID_participer_IND on participer (rdv_id, member_id);
-- create index FKpar_Mem_IND on participer (member_id);
-- create unique index ID_RDV_IND on RDV (rdv_id);
-- create index FKorganiser_IND on RDV (member_id);
-- create unique index ID_voir_IND on voir (cardbox_id, member_id);
-- create index FKvoi_Mem_IND on voir (member_id);
-- *********************************************
-- * SQL MySQL generation                      
-- *--------------------------------------------
-- * DB-MAIN version: 11.0.2              
-- * Generator date: Sep 14 2021              
-- * Generation date: Wed Oct 11 08:17:11 2023 
-- * LUN file: C:\Users\Antoine\Desktop\Rapport de stage\sneakyDateBDDtest2.lun 
-- * Schema: SCHEMA/1 
-- ********************************************* 
-- Database Section
-- ________________ 
create database sneakydate;
use sneakydate;
-- Tables Section
-- _____________ 
create table Cardbox (
    date date not null,
    cardbox_id bigint not null,
    constraint ID_Cardbox_ID primary key (cardbox_id)
);
create table EtreInvite (
    member_id bigint not null,
    rdv_id bigint not null,
    constraint ID_EtreInvite_ID primary key (rdv_id, member_id)
);
create table Invitation (
    MemberInvite_id bigint not null,
    invitation_id bigint not null,
    rdv_id bigint not null,
    I_R_rdv_id bigint not null,
    member_id bigint not null,
    constraint ID_Invitation_ID primary key (invitation_id),
    constraint SID_Invitation_1_ID unique (rdv_id),
    constraint SID_Invitation_ID unique (MemberInvite_id)
);
create table Member (
    member_id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    memberName VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Stocké sous forme de hash
    email VARCHAR(255) UNIQUE,
    friendList VARCHAR(1400) NOT NULL
);
create table participer (
    member_id bigint not null,
    rdv_id bigint not null,
    constraint ID_participer_ID primary key (rdv_id, member_id)
);
create table RDV (
    orga varchar(100) not null,
    statut char not null,
    rdvName varchar(100) not null,
    rdv_id bigint not null,
    member_id bigint not null,
    cardbox_id BIGINT not null,
    constraint ID_RDV_ID primary key (rdv_id),
    FOREIGN KEY (cardbox_id) REFERENCES Cardbox(cardbox_id)
);
create table voir (
    cardbox_id bigint not null,
    member_id bigint not null,
    constraint ID_voir_ID primary key (cardbox_id, member_id)
);
create table Friendship (
    member_id1 BIGINT NOT NULL,
    member_id2 BIGINT NOT NULL,
    PRIMARY KEY (member_id1, member_id2),
    FOREIGN KEY (member_id1) REFERENCES Member(member_id),
    FOREIGN KEY (member_id2) REFERENCES Member(member_id)
);
-- Constraints Section
-- ___________________ 
-- Not implemented
-- alter table Cardbox add constraint ID_Cardbox_CHK
--     check(exists(select * from voir
--                  where voir.cardbox_id = cardbox_id)); 
alter table EtreInvite
add constraint FKEtr_RDV foreign key (rdv_id) references RDV (rdv_id);
alter table EtreInvite
add constraint FKEtr_Mem_FK foreign key (member_id) references Member (member_id);
alter table Invitation
add constraint FKInv_RDV_FK foreign key (I_R_rdv_id) references RDV (rdv_id);
alter table Invitation
add constraint FKInv_Mem_FK foreign key (member_id) references Member (member_id);
alter table RDV
add constraint FKInv_Car_FK foreign key (cardbox_id) references Cardbox (cardbox_id);
-- Not implemented
-- alter table Member add constraint ID_Member_CHK
--     check(exists(select * from EtreInvite
--                  where EtreInvite.member_id = member_id)); 
-- Not implemented
-- alter table Member add constraint ID_Member_CHK
--     check(exists(select * from Invitation
--                  where Invitation.member_id = member_id)); 
-- Not implemented
-- alter table Member add constraint ID_Member_CHK
--     check(exists(select * from RDV
--                  where RDV.member_id = member_id)); 
-- Not implemented
-- alter table Member add constraint ID_Member_CHK
--     check(exists(select * from participer
--                  where participer.member_id = member_id)); 
-- Not implemented
-- alter table Member add constraint ID_Member_CHK
--     check(exists(select * from voir
--                  where voir.member_id = member_id)); 
alter table participer
add constraint FKpar_RDV foreign key (rdv_id) references RDV (rdv_id);
alter table participer
add constraint FKpar_Mem_FK foreign key (member_id) references Member (member_id);
-- Not implemented
-- alter table RDV add constraint ID_RDV_CHK
--     check(exists(select * from EtreInvite
--                  where EtreInvite.rdv_id = rdv_id)); 
-- Not implemented
-- alter table RDV add constraint ID_RDV_CHK
--     check(exists(select * from Invitation
--                  where Invitation.I_R_rdv_id = rdv_id)); 
-- Not implemented
-- alter table RDV add constraint ID_RDV_CHK
--     check(exists(select * from participer
--                  where participer.rdv_id = rdv_id)); 
alter table RDV
add constraint FKorganiser_FK foreign key (member_id) references Member (member_id);
alter table voir
add constraint FKvoi_Mem_FK foreign key (member_id) references Member (member_id);
alter table voir
add constraint FKvoi_Car foreign key (cardbox_id) references Cardbox (cardbox_id);
-- Index Section
-- _____________ 
create unique index ID_Cardbox_IND on Cardbox (cardbox_id);
create unique index ID_EtreInvite_IND on EtreInvite (rdv_id, member_id);
create index FKEtr_Mem_IND on EtreInvite (member_id);
create unique index ID_Invitation_IND on Invitation (invitation_id);
create unique index SID_Invitation_1_IND on Invitation (rdv_id);
create unique index SID_Invitation_IND on Invitation (MemberInvite_id);
create index FKInv_RDV_IND on Invitation (I_R_rdv_id);
create index FKInv_Mem_IND on Invitation (member_id);
create unique index ID_Member_IND on Member (member_id);
create unique index ID_participer_IND on participer (rdv_id, member_id);
create index FKpar_Mem_IND on participer (member_id);
create unique index ID_RDV_IND on RDV (rdv_id);
create index FKorganiser_IND on RDV (member_id);
create unique index ID_voir_IND on voir (cardbox_id, member_id);
create index FKvoi_Mem_IND on voir (member_id);
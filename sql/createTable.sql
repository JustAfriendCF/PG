#ALTER USER 'root'@'localhost' IDENTIFIED BY '1234'; 
#ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';

create database pg_MySQL;
use pg_MySQL;

# users
CREATE TABLE user (
idSubscription Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
password_ VARCHAR(45) ,
firstName VARCHAR(45) DEFAULT '',
lastName varchar(45) default '',
statusReceivingAdvertisements boolean default false,
credits int default 0
);

# product
CREATE TABLE product (
id Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
name_ VARCHAR(45) DEFAULT '',
description_  VARCHAR(200) DEFAULT '',
category VARCHAR(45) DEFAULT '',
qryInStock int default 0,
status_ boolean default false,
price double default 0,
QuantityOfPurchasesFromAProduct int default 0

);

#productToUser
create table productToUser(
id Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
userId int,CONSTRAINT fk_user1 FOREIGN KEY (userId) REFERENCES user(idSubscription),
productId int,CONSTRAINT fk_product1 FOREIGN KEY (productId) REFERENCES product(id),
status int default 0
);
# productInOrder
CREATE TABLE productInOrder (
idProductInOrder Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
idUser Int ,CONSTRAINT fk_user2 FOREIGN KEY (idUser) REFERENCES user(idSubscription),
idProduct Int,CONSTRAINT fk_product2 FOREIGN KEY (idProduct) REFERENCES product(id),
qry Int default 1,
date_ date,
status_ VARCHAR(45) DEFAULT ''
);
ALTER TABLE productInOrder
ADD CONSTRAINT FK_productInOrder
FOREIGN KEY (idOrder) REFERENCES order_(idOrder);
# order_
CREATE TABLE order_ (
idOrder Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
idUser Int ,CONSTRAINT fk_user6 FOREIGN KEY (idUser) REFERENCES user(idSubscription),
date_ date,
status_ VARCHAR(45) DEFAULT ''
);
# BuyingAProduct
CREATE TABLE BuyingAProduct (
id Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
idProduct Int,CONSTRAINT fk_product3 FOREIGN KEY (idProduct) REFERENCES product(id),
idSubscription Int default 0,CONSTRAINT fk_user3 FOREIGN KEY (idSubscription) REFERENCES user(idSubscription),
date_ date 
);

# competition
CREATE TABLE competition (
idSCompetition Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
date_ date,
description_  VARCHAR(200) DEFAULT ''
);

#imageForTheCompetition
CREATE TABLE imageForTheCompetition (
idImageForTheCompetition Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
idSCompetition Int,CONSTRAINT fk_competition1 FOREIGN KEY (idSCompetition) REFERENCES competition(idSCompetition),
status_ int default 0,
idSubscription Int,CONSTRAINT fk_user4 FOREIGN KEY (idSubscription) REFERENCES user(idSubscription),
idChecker int default 0,CONSTRAINT fk_checker1 FOREIGN KEY (idChecker) REFERENCES checker(idChecker),
likesNum int default 0
);
#imageOrComment
CREATE TABLE imageOrComment(
idImageOrComment Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
idImageForTheCompetition Int,CONSTRAINT fk_imageForTheCompetition1 FOREIGN KEY (idImageForTheCompetition) REFERENCES imageForTheCompetition(idImageForTheCompetition),
idComment Int,CONSTRAINT fk_userAnswer1 FOREIGN KEY (idComment) REFERENCES userAnswer(idUserAnswer)
);
# complaints
CREATE TABLE complaints (
idSComplaints Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
idImageOrComment Int,CONSTRAINT fk_imageOrComment1 FOREIGN KEY (idImageOrComment) REFERENCES imageOrComment(idImageOrComment),
typeOfComplaint VARCHAR(45),
description_  VARCHAR(200) DEFAULT '',
idUser Int,CONSTRAINT fk_user5 FOREIGN KEY (idUser) REFERENCES user(idSubscription),
idChecker int default 0,CONSTRAINT fk_checker2 FOREIGN KEY (idChecker) REFERENCES checker(idChecker)
);

#activity
CREATE TABLE activity (
idActivity Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
typeOfActivity VARCHAR(45)
);

#activityOfChecker
CREATE TABLE activityOfChecker (
idActivityOfChecker Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
idChecker int default 0,CONSTRAINT fk_checker3 FOREIGN KEY (idChecker) REFERENCES checker(idChecker),
idActivity int default 0, CONSTRAINT fk_activity1 FOREIGN KEY (idActivity) REFERENCES activity(idActivity),
date_ date 
);

#blackList
CREATE TABLE blackList (
idWord Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
word VARCHAR(45) 
);

#artistQuestion
CREATE TABLE artistquestion (
idArtistQuestion Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
question VARCHAR(300) ,
dateStart date ,
dateEnd date
);

#userQuestion
CREATE TABLE userQuestion (
idUserQuestion Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
question VARCHAR(300) ,
answer VARCHAR(300),
status_ VARCHAR(45) 
);

# checker
CREATE TABLE checker (
idChecker Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
password_ VARCHAR(45),
firstName VARCHAR(45) DEFAULT '',
lastName varchar(45) default '',
status_ boolean default 0
);

#userAnswer
CREATE TABLE userAnswer (
idUserAnswer Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
idArtistQuestion int,CONSTRAINT fk_artistQuestion1 FOREIGN KEY (idArtistQuestion) REFERENCES artistQuestion(idArtistQuestion),
answer VARCHAR(300) 
);

#artistAnswer
CREATE TABLE artistAnswer (
idArtistAnswer Int  PRIMARY KEY AUTO_INCREMENT   NOT NULL,
idUserQuestion int,CONSTRAINT fk_userQuestion1 FOREIGN KEY (idUserQuestion) REFERENCES userQuestion(idUserQuestion),
answer VARCHAR(300)
);


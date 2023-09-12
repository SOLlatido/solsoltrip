-- 데이터베이스 / 테이블 생성
CREATE DATABASE  IF NOT EXISTS `solsoltrip`;
USE `solsoltrip`;

CREATE TABLE `member` (
	`member_seq` BIGINT	NOT NULL AUTO_INCREMENT,
	`id` VARCHAR(20) NOT NULL,
	`password` VARCHAR(64) NOT NULL,
	`name` VARCHAR(4) NOT NULL,
	`point` INT NOT NULL,
	`phone` VARCHAR(11) NOT NULL,
	`role` VARCHAR(5) NOT NULL DEFAULT 'USER',
	`kakao_email` VARCHAR(255) NULL,
	`kakao_refresh_token` VARCHAR(255) NULL,
    PRIMARY KEY (`member_seq`)
);

CREATE TABLE `accompany` (
	`accompany_seq`	BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
	`account` VARCHAR(20) NULL,
	`start_datetime` DATETIME NOT NULL,
	`end_datetime` DATETIME NOT NULL,
	`available_amount` INT NOT NULL,
	`leftover` INT NOT NULL,
	`get_method` VARCHAR(6) NOT NULL,
	`is_checked` BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (`accompany_seq`)
);

CREATE TABLE `accompany_content` (
	`accompany_content_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`accompany_seq` BIGINT NOT NULL,
	`store` VARCHAR(20) NOT NULL,
	`cost` INT NOT NULL,
	`accepted_date` DATE NOT NULL,
	`category` VARCHAR(2) NULL,
	`accepted_datetime` DATETIME NOT NULL,
    PRIMARY KEY (`accompany_content_seq`),
    KEY `fk_accompany_seq_ac_idx` (`accompany_seq`),
    CONSTRAINT `accompany_seq_ac` FOREIGN KEY (`accompany_seq`) REFERENCES `accompany` (`accompany_seq`)
);

CREATE TABLE `member_accompany_content` (
	`member_accompany_content_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`member_seq` BIGINT NOT NULL,
	`accompany_content_seq` BIGINT NOT NULL,
	`memo` VARCHAR(50) NULL,
	`picture` VARCHAR(255) NULL,
	`created_date` DATETIME NOT NULL DEFAULT NOW(),
	`individual` INT NOT NULL,
    PRIMARY KEY (`member_accompany_content_seq`),
    KEY `fk_member_seq_mac_idx` (`member_seq`),
    CONSTRAINT `member_seq_mac` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`),
    KEY `fk_accompany_content_seq_mac_idx` (`accompany_content_seq`),
    CONSTRAINT `accompany_content_seq_mac` FOREIGN KEY (`accompany_content_seq`) REFERENCES `accompany_content` (`accompany_content_seq`)
);

CREATE TABLE `event` (
	`event_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(20) NOT NULL,
	`x` DOUBLE NOT NULL,
	`y` DOUBLE NOT NULL,
    PRIMARY KEY (`event_seq`)
);

CREATE TABLE `member_event` (
	`member_event_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`member_seq` BIGINT NOT NULL,
	`event_seq` BIGINT NOT NULL,
	`isDone` BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (`member_event_seq`),
    KEY `fk_member_seq_me_idx` (`member_seq`),
    CONSTRAINT `member_seq_me` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`),
    KEY `fk_event_seq_me_idx` (`event_seq`),
    CONSTRAINT `event_seq_me` FOREIGN KEY (`event_seq`) REFERENCES `event` (`event_seq`)
);

CREATE TABLE `member_accompany` (
	`member_accompany_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`accompany_seq` BIGINT NOT NULL,
	`member_seq` BIGINT NOT NULL,
	`isManager` BOOLEAN NOT NULL DEFAULT false,
	`isPaid` BOOLEAN NOT NULL DEFAULT false,
	`settlement` INT NOT NULL DEFAULT 0,
	`expenditure` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`member_accompany_seq`),
    KEY `fk_accompany_seq_ma_idx` (`accompany_seq`),
    CONSTRAINT `accompany_seq_ma` FOREIGN KEY (`accompany_seq`) REFERENCES `accompany` (`accompany_seq`),
    KEY `fk_member_seq_ma_idx` (`member_seq`),
    CONSTRAINT `member_seq_ma` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`)
);

CREATE TABLE `registed_account` (
	`register_account_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`member_seq` BIGINT NOT NULL,
	`type` VARCHAR(20) NOT NULL,
	`account` VARCHAR(20) NOT NULL,
	`name` VARCHAR(30) NOT NULL,
	`balance` INT NOT NULL,
    PRIMARY KEY (`register_account_seq`),
    KEY `fk_member_seq_ra_idx` (`member_seq`),
    CONSTRAINT `member_seq_ra` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`)
);

-- 데이터베이스 / 테이블 삭제
-- DROP DATABASE IF EXISTS `solsoltrip`;
-- DROP TABLE IF EXISTS `member`;
-- DROP TABLE IF EXISTS `accompany`;
-- DROP TABLE IF EXISTS `accompany_content`;
-- DROP TABLE IF EXISTS `member_accompany_content`;
-- DROP TABLE IF EXISTS `event`;
-- DROP TABLE IF EXISTS `member_event`;
-- DROP TABLE IF EXISTS `member_accompany`;
-- DROP TABLE IF EXISTS `registed_account`;

-- 테이블 조회
SELECT * FROM `member`;
SELECT * FROM `accompany`;
SELECT * FROM `accompany_content`;
SELECT * FROM `member_accompany_content`;
SELECT * FROM `event`;
SELECT * FROM `member_event`;
SELECT * FROM `member_accompany`;
SELECT * FROM `registed_account`;
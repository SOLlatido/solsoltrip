-- 데이터베이스 / 테이블 생성
DROP DATABASE IF EXISTS `solsoltrip`;
CREATE DATABASE  IF NOT EXISTS `solsoltrip`;
USE `solsoltrip`;

CREATE TABLE `member` (
	`member_seq` BIGINT  NOT NULL AUTO_INCREMENT,
	`uuid` VARCHAR(9) NOT NULL,
	`name` VARCHAR(4) NOT NULL,
	`profile_image` VARCHAR(255) NULL,
	`point` INT NOT NULL DEFAULT 0,
	`role` VARCHAR(5) NOT NULL DEFAULT 'USER',
	`kakao_email` VARCHAR(255) NULL,
	`kakao_refresh_token` VARCHAR(255) NULL,
    PRIMARY KEY (`member_seq`)
);

CREATE TABLE `accompany` (
	`accompany_seq`	BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
	`account` VARCHAR(20) NULL,
	`start_date` DATE NOT NULL,
	`end_date` DATE NOT NULL,
	`individual` INT NOT NULL,
	`total_deposit` INT NOT NULL DEFAULT 0,
	`total_withdraw` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`accompany_seq`)
);

CREATE TABLE `accompany_member_deposit` (
	`accompany_member_deposit_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`member_seq` BIGINT NOT NULL,
	`accompany_seq` BIGINT NOT NULL,
	`name` VARCHAR(20) NOT NULL,
	`cost` INT NOT NULL,
	`accepted_date` DATE NOT NULL,
	`category` VARCHAR(1) NULL,
	`accepted_date_time` DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (`accompany_member_deposit_seq`),
    KEY `fk_member_seq_amd_idx` (`member_seq`),
    CONSTRAINT `member_seq_amd` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`),
    KEY `fk_accompany_seq_amd_idx` (`accompany_seq`),
    CONSTRAINT `accompany_seq_amd` FOREIGN KEY (`accompany_seq`) REFERENCES `accompany` (`accompany_seq`)
);

CREATE TABLE `accompany_member_withdraw` (
	`accompany_member_withdraw_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`accompany_seq` BIGINT NOT NULL,
	`store` VARCHAR(20) NOT NULL,
	`cost` INT NOT NULL,
	`accepted_date` DATE NOT NULL,
	`category` VARCHAR(1) NULL,
	`accepted_date_time` DATETIME NOT NULL DEFAULT NOW(),
	`memo` VARCHAR(255) NULL,
	`picture` VARCHAR(255) NULL,
	`memo_date_time` DATETIME NULL,
    PRIMARY KEY (`accompany_member_withdraw_seq`),
    KEY `fk_accompany_seq_amw_idx` (`accompany_seq`),
    CONSTRAINT `accompany_seq_amw` FOREIGN KEY (`accompany_seq`) REFERENCES `accompany` (`accompany_seq`)
);

CREATE TABLE `event` (
	`event_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(20) NOT NULL,
	`description` VARCHAR(255) NULL,
	`x` DOUBLE NOT NULL,
	`y` DOUBLE NOT NULL,
    PRIMARY KEY (`event_seq`)
);

CREATE TABLE `event_point` (
	`event_point_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`member_seq` BIGINT NOT NULL,
	`name` VARCHAR(20) NOT NULL,
	`point` INT NOT NULL,
	`accepted_date_time` DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (`event_point_seq`),
    KEY `fk_member_seq_ep_idx` (`member_seq`),
    CONSTRAINT `member_seq_ep` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`)
);

CREATE TABLE `individual_withdraw` (
	`individual_withdraw_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`member_seq` BIGINT NOT NULL,
	`accompany_member_withdraw_seq` BIGINT NOT NULL,
	`individual` DOUBLE NOT NULL,
    `is_included` BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (`individual_withdraw_seq`),
    KEY `fk_member_seq_iw_idx` (`member_seq`),
    CONSTRAINT `member_seq_iw` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`),
    KEY `fk_accompany_content_seq_iw_idx` (`accompany_member_withdraw_seq`),
    CONSTRAINT `accompany_member_withdraw_seq_iw` FOREIGN KEY (`accompany_member_withdraw_seq`) REFERENCES `accompany_member_withdraw` (`accompany_member_withdraw_seq`)
);

CREATE TABLE `member_accompany` (
	`member_accompany_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`member_seq` BIGINT NOT NULL,
	`accompany_seq` BIGINT NOT NULL,
	`is_manager` BOOLEAN NOT NULL DEFAULT false,
	`is_paid` BOOLEAN NOT NULL DEFAULT false,
	`settlement` INT NOT NULL DEFAULT 0,
	`individual_deposit` INT NOT NULL DEFAULT 0,
	`individual_withdraw` INT NOT NULL DEFAULT 0,
	`is_checked` BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (`member_accompany_seq`),
    KEY `fk_member_seq_ma_idx` (`member_seq`),
    CONSTRAINT `member_seq_ma` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`),
    KEY `fk_accompany_seq_ma_idx` (`accompany_seq`),
    CONSTRAINT `accompany_seq_ma` FOREIGN KEY (`accompany_seq`) REFERENCES `accompany` (`accompany_seq`)
);

CREATE TABLE `member_event` (
	`member_event_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`member_seq` BIGINT NOT NULL,
	`event_seq` BIGINT NOT NULL,
	`is_done` BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (`member_event_seq`),
    KEY `fk_member_seq_me_idx` (`member_seq`),
    CONSTRAINT `member_seq_me` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`),
    KEY `fk_event_seq_me_idx` (`event_seq`),
    CONSTRAINT `event_seq_me` FOREIGN KEY (`event_seq`) REFERENCES `event` (`event_seq`)
);

CREATE TABLE `registed_account` (
	`registed_account_seq` BIGINT NOT NULL AUTO_INCREMENT,
	`member_seq` BIGINT NOT NULL,
	`type` VARCHAR(20) NOT NULL,
	`account` VARCHAR(20) NOT NULL,
	`name` VARCHAR(30) NOT NULL,
	`balance` INT NOT NULL,
	`is_accompany_account` BOOLEAN NOT NULL,
    PRIMARY KEY (`registed_account_seq`),
    KEY `fk_member_seq_ra_idx` (`member_seq`),
    CONSTRAINT `member_seq_ra` FOREIGN KEY (`member_seq`) REFERENCES `member` (`member_seq`)
);
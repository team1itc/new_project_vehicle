/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50621
Source Host           : localhost:3306
Source Database       : project_vehicle

Target Server Type    : MYSQL
Target Server Version : 50621
File Encoding         : 65001

Date: 2018-10-17 20:59:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for pk_comment_feed
-- ----------------------------
DROP TABLE IF EXISTS `pk_comment_feed`;
CREATE TABLE `pk_comment_feed` (
  `cf_id` int(10) NOT NULL AUTO_INCREMENT,
  `cf_comment` text COLLATE utf8mb4_unicode_ci,
  `f_id` int(10) NOT NULL,
  `u_table` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u_id` int(5) NOT NULL,
  PRIMARY KEY (`cf_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for pk_department
-- ----------------------------
DROP TABLE IF EXISTS `pk_department`;
CREATE TABLE `pk_department` (
  `d_id` int(5) NOT NULL AUTO_INCREMENT,
  `d_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `d_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`d_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for pk_department_log
-- ----------------------------
DROP TABLE IF EXISTS `pk_department_log`;
CREATE TABLE `pk_department_log` (
  `run_id` int(5) NOT NULL AUTO_INCREMENT,
  `d_id` int(5) NOT NULL,
  `d_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `d_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `d_log_work` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'เพิ่ม ลบ หรือแก้ไข',
  `d_log_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`run_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for pk_feed
-- ----------------------------
DROP TABLE IF EXISTS `pk_feed`;
CREATE TABLE `pk_feed` (
  `f_id` int(10) NOT NULL AUTO_INCREMENT,
  `f_txt` text COLLATE utf8mb4_unicode_ci,
  `u_table` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u_id` int(5) NOT NULL,
  PRIMARY KEY (`f_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for pk_group
-- ----------------------------
DROP TABLE IF EXISTS `pk_group`;
CREATE TABLE `pk_group` (
  `g_id` int(5) NOT NULL AUTO_INCREMENT,
  `g_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `d_code` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`g_id`)
) ENGINE=InnoDB AUTO_INCREMENT=298 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for pk_group_log
-- ----------------------------
DROP TABLE IF EXISTS `pk_group_log`;
CREATE TABLE `pk_group_log` (
  `run_id` int(5) NOT NULL AUTO_INCREMENT,
  `g_id` int(5) NOT NULL,
  `g_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `d_code` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `u_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_log_work` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_log_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`run_id`)
) ENGINE=InnoDB AUTO_INCREMENT=303 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for pk_like_feed
-- ----------------------------
DROP TABLE IF EXISTS `pk_like_feed`;
CREATE TABLE `pk_like_feed` (
  `lf_id` int(10) NOT NULL AUTO_INCREMENT,
  `f_id` int(10) NOT NULL,
  `u_table` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `u_id` int(11) NOT NULL,
  PRIMARY KEY (`lf_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for pk_machine
-- ----------------------------
DROP TABLE IF EXISTS `pk_machine`;
CREATE TABLE `pk_machine` (
  `mc_id` int(5) NOT NULL AUTO_INCREMENT,
  `mc_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mc_brand` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mc_series` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `std_id` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`mc_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for pk_machine_log
-- ----------------------------
DROP TABLE IF EXISTS `pk_machine_log`;
CREATE TABLE `pk_machine_log` (
  `run_id` int(5) NOT NULL AUTO_INCREMENT,
  `mc_id` int(5) NOT NULL,
  `mc_code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mc_brand` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mc_series` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `std_id` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mc_log_work` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mc_log_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `u_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`run_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for pk_match_std_tch
-- ----------------------------
DROP TABLE IF EXISTS `pk_match_std_tch`;
CREATE TABLE `pk_match_std_tch` (
  `mst_id` int(5) NOT NULL AUTO_INCREMENT,
  `t_id` int(5) NOT NULL,
  `g_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`mst_id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for pk_student
-- ----------------------------
DROP TABLE IF EXISTS `pk_student`;
CREATE TABLE `pk_student` (
  `std_id` int(5) NOT NULL AUTO_INCREMENT,
  `std_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `std_gender` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `std_prename` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `std_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `std_lname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `std_pin_id` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `std_birthday` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `std_username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `std_password` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_code` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `std_blood` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`std_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4393 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for pk_student_log
-- ----------------------------
DROP TABLE IF EXISTS `pk_student_log`;
CREATE TABLE `pk_student_log` (
  `run_id` int(5) NOT NULL AUTO_INCREMENT,
  `std_id` int(5) NOT NULL,
  `std_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `std_gender` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `std_prename` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `std_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `std_lname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `std_pin_id` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `std_birthday` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `std_username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `std_password` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `g_code` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `std_blood` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `std_log_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `u_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `std_log_work` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`run_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4395 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for pk_teacher
-- ----------------------------
DROP TABLE IF EXISTS `pk_teacher`;
CREATE TABLE `pk_teacher` (
  `t_id` int(5) NOT NULL AUTO_INCREMENT,
  `t_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `t_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `t_dep` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `t_tel` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `t_username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `t_password` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for pk_teacher_log
-- ----------------------------
DROP TABLE IF EXISTS `pk_teacher_log`;
CREATE TABLE `pk_teacher_log` (
  `run_id` int(5) NOT NULL AUTO_INCREMENT,
  `t_id` int(5) DEFAULT NULL,
  `t_code` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `t_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `t_dep` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `t_tel` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `t_username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `t_password` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `t_log_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `t_log_work` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `u_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`run_id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
SET FOREIGN_KEY_CHECKS=1;

/*
 Navicat SQLite Data Transfer

 Source Server         : gogo
 Source Server Type    : SQLite
 Source Server Version : 3012001
 Source Schema         : main

 Target Server Type    : SQLite
 Target Server Version : 3012001
 File Encoding         : 65001

 Date: 23/04/2023 09:23:17
*/

PRAGMA foreign_keys = false;

-- ----------------------------
-- Table structure for apps
-- ----------------------------
DROP TABLE IF EXISTS "apps";
CREATE TABLE 'apps'
(
    'id'      INTEGER PRIMARY KEY AUTOINCREMENT,
    'name'    VARCHAR UNIQUE,
    'uri'     VARCHAR,
    'seq'     integer,
    'updated' DATETIME DEFAULT CURRENT_TIMESTAMP,
    'show'    integer check (show in (0,1)
) default 1, icon_img varchar);

-- ----------------------------
-- Table structure for functions
-- ----------------------------
DROP TABLE IF EXISTS "functions";
CREATE TABLE 'functions'
(
    'id'      INTEGER PRIMARY KEY AUTOINCREMENT,
    'name'    VARCHAR UNIQUE,
    uri       varchar UNIQUE,
    'code'    TEXT,
    'updated' DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------
-- Table structure for pages
-- ----------------------------
DROP TABLE IF EXISTS "pages";
CREATE TABLE "pages"
(
    'id'         INTEGER PRIMARY KEY AUTOINCREMENT,
    'name'       VARCHAR UNIQUE,
    'uri'        VARCHAR UNIQUE,
    'html'       TEXT,
    'updated'    DATETIME                               DEFAULT CURRENT_TIMESTAMP,
    use_template integer check (use_template in (0, 1)) default 1
);

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS "permission";
CREATE TABLE 'permission'
(
    'id'      INTEGER PRIMARY KEY AUTOINCREMENT,
    'role'    VARCHAR UNIQUE NOT NULL,
    'urls'    TEXT,
    'enable'  INTEGER,
    'updated' DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ----------------------------
-- Table structure for settings
-- ----------------------------
DROP TABLE IF EXISTS "settings";
CREATE TABLE 'settings'
(
    'id'      INTEGER PRIMARY KEY AUTOINCREMENT,
    'name'    VARCHAR UNIQUE,
    'value'   TEXT,
    'updated' DATETIME DEFAULT CURRENT_TIMESTAMP,
    info      varchar
);

-- ----------------------------
-- Table structure for sqlite_sequence
-- ----------------------------
DROP TABLE IF EXISTS "sqlite_sequence";
CREATE TABLE sqlite_sequence
(
    name,
    seq
);

-- ----------------------------
-- Table structure for static
-- ----------------------------
DROP TABLE IF EXISTS "static";
CREATE TABLE "static"
(
    'id'            INTEGER PRIMARY KEY AUTOINCREMENT,
    'name'          VARCHAR,
    'uri'           VARCHAR UNIQUE,
    'content'       BLOB,
    raw_size        integer,
    compressed_size integer,
    use_compress    integer default 1 check (use_compress in (0, 1))
);

-- ----------------------------
-- Table structure for tables
-- ----------------------------
DROP TABLE IF EXISTS "tables";
CREATE TABLE "tables"
(
    'id'         INTEGER PRIMARY KEY AUTOINCREMENT,
    'table_name' VARCHAR,
    'operation'  VARCHAR,
    'is_query'   integer check (is_query in (0, 1)),
    'sql_tmpl'   VARCHAR,
    'uri'        varchar unique,
    'updated'    DATETIME DEFAULT CURRENT_TIMESTAMP,
    db           varchar  default 'gogo.db',
    unique (table_name, operation)
);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "user";
CREATE TABLE "user"
(
    'id'      INTEGER PRIMARY KEY AUTOINCREMENT,
    'name'    VARCHAR UNIQUE NOT NULL,
    'email'   VARCHAR UNIQUE,
    'pwd'     VARCHAR        NOT NULL,
    'role'    VARCHAR,
    'updated' DATETIME DEFAULT CURRENT_TIMESTAMP,
    enable    integer check (enable in (0, 1))
);

-- ----------------------------
-- View structure for user_permission
-- ----------------------------
DROP VIEW IF EXISTS "user_permission";
CREATE VIEW user_permission as
select user.id, user.name, user.email, user.pwd, user.role, permission.urls
from user,
     permission
where user.role = permission.role
  and user.enable = 1
  and permission.enable = 1;


PRAGMA foreign_keys = true;

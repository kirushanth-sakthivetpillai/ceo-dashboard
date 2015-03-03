CREATE TABLE `article` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `country_code` varchar(255) DEFAULT NULL,
  `domain` varchar(510) DEFAULT NULL,
  `fair_hair_id` varchar(255) DEFAULT NULL,
  `language_code` varchar(255) DEFAULT NULL,
  `publish_date` datetime DEFAULT NULL,
  `sentiment` double DEFAULT NULL,
  `source_id` varchar(255) DEFAULT NULL,
  `url` varchar(510) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59311 DEFAULT CHARSET=latin1;

/*
(1,'us','selectism.com','
2w2k3CfWOa6JjYeQaG7hCb5ls5E','en','2014-02-28 23:00:37',
0.000004458784179061155,'134866',
'http://www.selectism.com/2014/02/28/frank-oak-black-series-capsule-collection/'),

(2,'us','mobilecommercedaily.com','a7F8foOhjAQN5pX6sJApggssLG0',
'en','2014-02-27 20:03:13',2.6103434027966353e-234,'150201',
'http://www.mobilecommercedaily.com/mcommerce-summit-2014-new-york-may-1-walgreens-sephora-wendy%E2%80%99s-marriott-staples-gilt-forrester'),
*/

CREATE TABLE `author` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(510) DEFAULT NULL,
  `article_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKAC2D218BE6DB3015` (`article_id`),
  CONSTRAINT `FKAC2D218BE6DB3015` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24347 DEFAULT CHARSET=latin1;

# (1,'Elaine YJ Lee',1)

CREATE TABLE `company` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `company` varchar(1020) DEFAULT NULL,
  `occurrences_num` int(11) DEFAULT NULL,
  `sentiment` double DEFAULT NULL,
  `article_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK38A73C7DE6DB3015` (`article_id`),
  CONSTRAINT `FK38A73C7DE6DB3015` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=898691 DEFAULT CHARSET=latin1;

# (1,'Black Series Capsule Collection',2,0,1)

CREATE TABLE `concept` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `concept` varchar(510) DEFAULT NULL,
  `article_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK38AF7A68E6DB3015` (`article_id`),
  CONSTRAINT `FK38AF7A68E6DB3015` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1683050 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

# (1,'Zipper',1),(2,'Franks',1),(3,'Capsule (band)',1),

CREATE TABLE `phrase` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `phrase` varchar(510) DEFAULT NULL,
  `article_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKC50D9EB9E6DB3015` (`article_id`),
  CONSTRAINT `FKC50D9EB9E6DB3015` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1733003 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

# (1,'accessories',1),(2,'Shop',1),(3,'weekender',1),(4,'messenger',1),

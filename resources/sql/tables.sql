CREATE TABLE `users` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `oauth_provider` enum('','facebook','google','twitter') COLLATE utf8_unicode_ci NOT NULL,
 `oauth_uid` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `first_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
 `last_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
 `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
 `gender` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
 `locale` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
 `picture` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `link` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `created` datetime NOT NULL,
 `modified` datetime NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `messages` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `user_id` int(11) NOT NULL,
 `text` text COLLATE utf8_unicode_ci NOT NULL,
 `created` datetime NOT NULL,
 `approved` boolean NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

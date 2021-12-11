-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-12-2020 a las 19:24:54
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_status`
--

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL,
  `order_status` varchar(50) NOT NULL DEFAULT 'new'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `order_status`
--

INSERT INTO `order_status` (`id`, `order_status`) VALUES
(1, 'new'),
(2, 'confirmed'),
(3, 'preparing'),
(4, 'shipping'),
(5, 'cancelled'),
(6, 'delivered');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment_method`
--

CREATE TABLE `payment_method` (
  `id` int(11) NOT NULL,
  `payment_method` varchar(50) NOT NULL DEFAULT 'cash'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `payment_method`
--

INSERT INTO `payment_method` (`id`, `payment_method`) VALUES
(1, 'cash'),
(2, 'debit card'),
(3, 'credit card');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `image_url` varchar(250) DEFAULT NULL,
  `available` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `image_url`, `available`) VALUES
(1, 'Pizza muzzarella', '350.00', 'Salsa, muzzarella y aceitunas.', 'photo1.jpg', 1),
(2, 'Pizza especial', '370.00', 'Salsa, muzzarella, jamón, morrones y aceitunas.', 'photo2.jpg', 1),
(3, 'Papas fritas', '250.00', 'Papas fritas y sal.', NULL, 1),
(4, 'Pizza calabresa', '420.00', 'Salsa, muzzarella, salame, ajies, morrones y aceitunas', 'photo4.jpg', 0),
(7, 'Hamburguesa cheddar', '350.00', 'Medallon de carne, queso cheddar, cebollas', 'photo5.jpg', 0),
(8, 'Hamburguesa barbacoa', '390.00', 'Medallon de carne, queso cheddar, cebollas caramelizadas, salsa barbacoa', 'photo6.jpg', 1),
(24, 'Papas con cheddar', '310.00', 'Papas fritas con queso cheddar, panceta y cebolla de verdeo', 'photo675.jpg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `store`
--

CREATE TABLE `store` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `order_status_id` int(11) NOT NULL DEFAULT 1,
  `amount` int(11) NOT NULL DEFAULT 1,
  `payment_method_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `store`
--

INSERT INTO `store` (`order_id`, `product_id`, `user_id`, `timestamp`, `order_status_id`, `amount`, `payment_method_id`) VALUES
(4, 3, 38, '2020-12-05 00:07:09', 1, 2, 1),
(5, 1, 38, '2020-12-05 21:32:53', 1, 1, 2),
(6, 4, 38, '2020-12-05 21:33:10', 1, 2, 3),
(7, 8, 42, '2020-12-05 22:04:30', 1, 1, 2),
(8, 3, 42, '2020-12-05 22:04:39', 1, 1, 2),
(9, 3, 42, '2020-12-06 17:09:04', 1, 1, 2),
(13, 7, 42, '2020-12-06 17:50:03', 6, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(60) NOT NULL,
  `fullname` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone` varchar(60) NOT NULL,
  `address` varchar(200) NOT NULL,
  `password` varchar(60) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `fullname`, `email`, `phone`, `address`, `password`, `admin`) VALUES
(27, 'user12', 'user12', 'user12@user.com', '3516500001', 'Calle 894', '$2b$10$NCaxfaGwjhw1MACaU.b70u9OTVs6CYsQCvIUE2YT44FSVIA90RVIW', 0),
(30, 'admin1', 'admin1', 'admin1@admin.com', '3516500001', 'Calle 894', '$2b$10$dPxrYMZ5VHZo2eiAz64FyOnu3VKouNAcb9GYLGcQ/i2KJKEbysQO.', 1),
(38, 'user16', 'user16', 'user16@user.com', '3516500001', 'Calle 894', '$2b$10$WkYFJxquspJ.66UN/pWyWONX7hTjaYRo1fVg7I/PpElPHOBYuQ0NC', 0),
(42, 'user17', 'user17', 'user17@user.com', '3516500001', 'Calle 894', '$2b$10$55lLpFEacDqDnBphNckNXearnU7KXJT/OZMUdrW/3vgnqe/fqWryS', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `store`
--
ALTER TABLE `store`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `store`
--
ALTER TABLE `store`
  ADD CONSTRAINT `store_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `store_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

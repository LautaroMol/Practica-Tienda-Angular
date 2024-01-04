create database DBSuperMercado

use DBSuperMercado
-- Limpiar todos los datos de la tabla Tipo
DELETE FROM Tipo;

-- Limpiar todos los datos de la tabla Producto
DELETE FROM Producto;

Create table Tipo(
IdTipo int primary key identity,
CodTipo int,
Nombre varchar(50),
Descripcion varchar(250)
);

create table Producto(
IdProducto int primary key identity,
Nombre varchar(50),
Precio int,
Stock int,
Descripcion varchar(50),
Ventas int,
CodTipo int,
FOREIGN KEY (CodTipo) REFERENCES Tipo(IdTipo)
)

-- Insertar datos en la tabla Tipo
INSERT INTO Tipo (CodTipo, Nombre, Descripcion) VALUES 
(1, 'Electrodom�sticos', 'Categor�a de electrodom�sticos para el hogar'),
(2, 'Alimentos', 'Categor�a de productos alimenticios'),
(3, 'Electr�nicos', 'Categor�a de dispositivos electr�nicos'),
(4, 'Ropa', 'Categor�a de prendas de vestir'),
(5, 'Muebles', 'Categor�a de mobiliario para el hogar');

-- Insertar datos en la tabla Producto
INSERT INTO Producto (Nombre, Precio, Stock, Descripcion, Ventas, CodTipo) VALUES 
('Lavadora', 599.99, 50, 'Lavadora de carga frontal, capacidad 10 kg', 20, 1),
('Arroz', 9.99, 200, 'Arroz blanco de alta calidad, paquete de 5 kg', 100, 2),
('Smartphone', 799.99, 100, 'Tel�fono inteligente de �ltima generaci�n', 50, 3),
('Camiseta', 19.99, 150, 'Camiseta de algod�n, color negro', 30, 4),
('Sof�', 699.99, 20, 'Sof� moderno de dos plazas', 10, 5),
('Cereal', 3.99, 120, 'Cereal de desayuno, caja de 500g', 80, 2),
('Laptop', 1299.99, 30, 'Laptop ultradelgada con pantalla t�ctil', 15, 3),
('L�mpara de Pie', 49.99, 40, 'L�mpara de pie con luz regulable', 25, 5),
('Manzanas', 1.99, 300, 'Manzanas frescas, unidad', 200, 2),
('Televisor 4K', 899.99, 15, 'Televisor LED de 55 pulgadas', 5, 3);


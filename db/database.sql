/* Este db no tiene ningun uso aqui solo para tenerlo de referencia en como crearlo desde la consola de comandos de mysql */

CREATE DATABASE IF NOT EXISTS companydb;

USE `companydb`;

CREATE TABLE employee (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY (id)
);

DESCRIBE employee;

INSERT INTO employee VALUES 
    (1, 'Joe', 1000),
    (2, 'Jane', 2000),
    (3, 'John', 3000),
    (4, 'Jhonny', 4000),
    (5, 'Janny', 5000),   
    (6, 'Joel', 6000);



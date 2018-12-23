-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema estoque
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema estoque
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `estoque` DEFAULT CHARACTER SET utf8 ;
USE `estoque` ;

-- -----------------------------------------------------
-- Table `estoque`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`usuario` (
  `cd_usuario` INT NOT NULL,
  `nm_usuario` VARCHAR(200) NOT NULL,
  `nm_email` VARCHAR(255) NOT NULL,
  `nm_senha` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`cd_usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`produto` (
  `cd_produto` VARCHAR(10) NOT NULL,
  `cd_ncm` INT NOT NULL,
  `ds_produto` VARCHAR(255) NOT NULL,
  `nm_embalagem` VARCHAR(100) NOT NULL,
  `qt_estoque` INT NOT NULL,
  `vl_unitario` DECIMAL(5,2) NOT NULL,
  `vl_total` DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (`cd_produto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`fornecedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`fornecedor` (
  `cd_fornecedor` INT NOT NULL AUTO_INCREMENT,
  `nm_razao` VARCHAR(255) NOT NULL,
  `nm_fantasia` VARCHAR(255) NOT NULL,
  `cd_cnpj` VARCHAR(18) NOT NULL,
  `cd_ie` VARCHAR(25) NOT NULL,
  `cd_cep` VARCHAR(10) NULL,
  `ds_endereco` VARCHAR(150) NULL,
  `cd_numero` VARCHAR(6) NULL,
  `nm_bairro` VARCHAR(50) NULL,
  `nm_cidade` VARCHAR(50) NULL,
  `nm_estado` VARCHAR(2) NULL,
  `cd_tel1` VARCHAR(15) NULL,
  `cd_tel2` VARCHAR(15) NULL,
  `nm_email` VARCHAR(100) NULL,
  `nm_site` VARCHAR(100) NULL,
  `nm_vendedor` VARCHAR(100) NULL,
  `cd_telvendedor` VARCHAR(15) NULL,
  PRIMARY KEY (`cd_fornecedor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`notafiscal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`notafiscal` (
  `cd_nfe` VARCHAR(100) NOT NULL,
  `dt_emissao` DATE NOT NULL,
  `dt_criacao` DATE NOT NULL,
  `fornecedor_cd_fornecedor` INT NOT NULL,
  PRIMARY KEY (`cd_nfe`),
  INDEX `fk_NotaFiscal_Fornecedor1_idx` (`fornecedor_cd_fornecedor` ASC),
  CONSTRAINT `fk_NotaFiscal_Fornecedor1`
    FOREIGN KEY (`fornecedor_cd_fornecedor`)
    REFERENCES `estoque`.`fornecedor` (`cd_fornecedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`tipo_despesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`tipo_despesa` (
  `cd_despesa` INT NOT NULL,
  `nm_despesa` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cd_despesa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`despesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`despesa` (
  `cd_despesa` INT NOT NULL AUTO_INCREMENT,
  `ds_despesa` VARCHAR(255) NOT NULL,
  `dt_pagamento` DATE NOT NULL,
  `dt_compra` DATE NOT NULL,
  `vl_despesa` DECIMAL(5,2) NOT NULL,
  `tipo_despesa_cd_despesa` INT NOT NULL,
  PRIMARY KEY (`cd_despesa`),
  INDEX `fk_despesa_tipo_despesa2_idx` (`tipo_despesa_cd_despesa` ASC),
  CONSTRAINT `fk_despesa_tipo_despesa2`
    FOREIGN KEY (`tipo_despesa_cd_despesa`)
    REFERENCES `estoque`.`tipo_despesa` (`cd_despesa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`lancamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`lancamento` (
  `cd_lancamento` INT NOT NULL AUTO_INCREMENT,
  `nm_fornecedor` VARCHAR(255) NULL,
  `dt_lancamento` DATE NOT NULL,
  `qt_produto` INT NOT NULL,
  `nm_tipo_lancamento` VARCHAR(255) NOT NULL,
  `cd_nota_fiscal` VARCHAR(255) NULL,
  `produto_cd_produto` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`cd_lancamento`),
  INDEX `fk_lancamento_produto1_idx` (`produto_cd_produto` ASC),
  CONSTRAINT `fk_lancamento_produto1`
    FOREIGN KEY (`produto_cd_produto`)
    REFERENCES `estoque`.`produto` (`cd_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`tipo_despesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`tipo_despesa` (
  `cd_despesa` INT NOT NULL,
  `nm_despesa` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`cd_despesa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`despesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`despesa` (
  `cd_despesa` INT NOT NULL AUTO_INCREMENT,
  `ds_despesa` VARCHAR(255) NOT NULL,
  `dt_pagamento` DATE NOT NULL,
  `dt_compra` DATE NOT NULL,
  `vl_despesa` DECIMAL(5,2) NOT NULL,
  `tipo_despesa_cd_despesa` INT NOT NULL,
  PRIMARY KEY (`cd_despesa`),
  INDEX `fk_despesa_tipo_despesa2_idx` (`tipo_despesa_cd_despesa` ASC),
  CONSTRAINT `fk_despesa_tipo_despesa2`
    FOREIGN KEY (`tipo_despesa_cd_despesa`)
    REFERENCES `estoque`.`tipo_despesa` (`cd_despesa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

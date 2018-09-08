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
-- Table `estoque`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`Usuario` (
  `cd_usuario` INT NOT NULL,
  `nm_usuario` VARCHAR(200) NOT NULL,
  `nm_senha` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`cd_usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`Tipo_Embalagem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`Tipo_Embalagem` (
  `nm_tipo_embalagem` VARCHAR(200) NOT NULL,
  `id_tipo_embalagem` INT NOT NULL,
  PRIMARY KEY (`nm_tipo_embalagem`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`Estoque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`Estoque` (
  `cd_produto` INT NOT NULL,
  `cd_ncm` INT NOT NULL,
  `ds_produto` VARCHAR(200) NOT NULL,
  `qt_produto` INT NOT NULL,
  `vl_unitario` DECIMAL(10,2) NOT NULL,
  `vl_total` DECIMAL(10,2) NOT NULL,
  `Tipo_Embalagem_nm_tipo_embalagem` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`cd_produto`),
  INDEX `fk_Estoque_Tipo_Embalagem_idx` (`Tipo_Embalagem_nm_tipo_embalagem` ASC),
  CONSTRAINT `fk_Estoque_Tipo_Embalagem`
    FOREIGN KEY (`Tipo_Embalagem_nm_tipo_embalagem`)
    REFERENCES `estoque`.`Tipo_Embalagem` (`nm_tipo_embalagem`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`Lucro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`Lucro` (
  `cd_lucro` INT NOT NULL,
  PRIMARY KEY (`cd_lucro`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`Fornecedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`Fornecedor` (
  `cd_fornecedor` INT NOT NULL AUTO_INCREMENT,
  `nm_razao` VARCHAR(200) NOT NULL,
  `nm_fantasia` VARCHAR(200) NOT NULL,
  `cd_cnpj` INT NOT NULL,
  `cd_ie` INT NOT NULL,
  `cd_cep` INT NULL,
  `ds_endereco` VARCHAR(100) NULL,
  `cd_numero` INT(5) NULL,
  `nm_bairro` VARCHAR(45) NULL,
  `nm_cidade` VARCHAR(45) NULL,
  `nm_estado` VARCHAR(2) NULL,
  `cd_tel1` INT NULL,
  `cd_tel2` INT NULL,
  `nm_email` VARCHAR(100) NULL,
  `nm_site` VARCHAR(100) NULL,
  `nm_vendedor` VARCHAR(100) NULL,
  `cd_telvendedor` INT NULL,
  `NotaFiscal_cd_nfe` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`cd_fornecedor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`NotaFiscal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`NotaFiscal` (
  `cd_nfe` VARCHAR(100) NOT NULL,
  `dt_emissao` DATETIME NOT NULL,
  `dt_criacao` DATETIME NOT NULL,
  `Fornecedor_cd_fornecedor` INT NOT NULL,
  PRIMARY KEY (`cd_nfe`),
  INDEX `fk_NotaFiscal_Fornecedor1_idx` (`Fornecedor_cd_fornecedor` ASC),
  CONSTRAINT `fk_NotaFiscal_Fornecedor1`
    FOREIGN KEY (`Fornecedor_cd_fornecedor`)
    REFERENCES `estoque`.`Fornecedor` (`cd_fornecedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`Produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`Produto` (
  `cd_produto` INT NOT NULL,
  `cd_ncm` INT NOT NULL,
  `ds_produto` VARCHAR(200) NOT NULL,
  `qt_produto` INT NOT NULL,
  `vl_unitario` DECIMAL(10,2) NOT NULL,
  `vl_total` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`cd_produto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`Saida_Produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`Saida_Produto` (
  `cd_produto_saida` INT NOT NULL AUTO_INCREMENT,
  `ds_produto` VARCHAR(200) NOT NULL,
  `qt_produto` INT NOT NULL,
  `vl_unitario` DECIMAL(10,2) NOT NULL,
  `dt_saida` DATETIME NOT NULL,
  `Produto_cd_produto` INT NOT NULL,
  PRIMARY KEY (`cd_produto_saida`),
  INDEX `fk_Saida_Produto_Produto1_idx` (`Produto_cd_produto` ASC),
  CONSTRAINT `fk_Saida_Produto_Produto1`
    FOREIGN KEY (`Produto_cd_produto`)
    REFERENCES `estoque`.`Produto` (`cd_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `estoque`.`Entrada_Produto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `estoque`.`Entrada_Produto` (
  `cd_produto_entrada` INT NOT NULL AUTO_INCREMENT,
  `cd_ncm` INT NOT NULL,
  `ds_produto` VARCHAR(200) NOT NULL,
  `qt_produto` INT NOT NULL,
  `vl_unitario` DECIMAL(10,2) NOT NULL,
  `dt_entrada` DATETIME NULL,
  `Produto_cd_produto` INT NOT NULL,
  PRIMARY KEY (`cd_produto_entrada`),
  INDEX `fk_Entrada_Produto_Produto1_idx` (`Produto_cd_produto` ASC),
  CONSTRAINT `fk_Entrada_Produto_Produto1`
    FOREIGN KEY (`Produto_cd_produto`)
    REFERENCES `estoque`.`Produto` (`cd_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

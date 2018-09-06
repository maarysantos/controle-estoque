-- mysql workbench forward engineering

set @old_unique_checks=@@unique_checks, unique_checks=0;
set @old_foreign_key_checks=@@foreign_key_checks, foreign_key_checks=0;
set @old_sql_mode=@@sql_mode, sql_mode='traditional,allow_invalid_dates';

-- -----------------------------------------------------
-- schema estoque
-- -----------------------------------------------------

-- -----------------------------------------------------
-- schema estoque
-- -----------------------------------------------------
create schema if not exists `estoque` default character set utf8 ;
use `estoque` ;

-- -----------------------------------------------------
-- table `estoque`.`usuario`
-- -----------------------------------------------------
create table if not exists `estoque`.`usuario` (
  `cd_usuario` int not null,
  `nm_usuario` varchar(200) not null,
  `nm_senha` varchar(100) not null,
  primary key (`cd_usuario`))
engine = innodb;


-- -----------------------------------------------------
-- table `estoque`.`tipo_embalagem`
-- -----------------------------------------------------
create table if not exists `estoque`.`tipo_embalagem` (
  `nm_tipo_embalagem` varchar(200) not null,
  `id_tipo_embalagem` int not null,
  primary key (`nm_tipo_embalagem`))
engine = innodb;


-- -----------------------------------------------------
-- table `estoque`.`estoque`
-- -----------------------------------------------------
create table if not exists `estoque`.`estoque` (
  `cd_produto` int not null,
  `cd_ncm` int not null,
  `ds_produto` varchar(200) not null,
  `qt_produto` int not null,
  `vl_unitario` decimal(10,2) not null,
  `vl_total` decimal(10,2) not null,
  `tipo_embalagem_nm_tipo_embalagem` varchar(200) not null,
  primary key (`cd_produto`),
  index `fk_estoque_tipo_embalagem_idx` (`tipo_embalagem_nm_tipo_embalagem` asc),
  constraint `fk_estoque_tipo_embalagem`
    foreign key (`tipo_embalagem_nm_tipo_embalagem`)
    references `estoque`.`tipo_embalagem` (`nm_tipo_embalagem`)
    on delete no action
    on update no action)
engine = innodb;


-- -----------------------------------------------------
-- table `estoque`.`lucro`
-- -----------------------------------------------------
create table if not exists `estoque`.`lucro` (
  `cd_lucro` int not null,
  primary key (`cd_lucro`))
engine = innodb;


-- -----------------------------------------------------
-- table `estoque`.`notafiscal`
-- -----------------------------------------------------
create table if not exists `estoque`.`notafiscal` (
  `cd_nfe` varchar(100) not null,
  `dt_emissao` datetime not null,
  `dt_criacao` datetime not null,
  primary key (`cd_nfe`))
engine = innodb;


-- -----------------------------------------------------
-- table `estoque`.`fornecedor`
-- -----------------------------------------------------
create table if not exists `estoque`.`fornecedor` (
  `cd_fornecedor` int not null auto_increment,
  `nm_razao` varchar(200) not null,
  `nm_fantasia` varchar(200) not null,
  `cd_cnpj` int not null,
  `cd_ie` int not null,
  `cd_cep` int null,
  `ds_endereco` varchar(100) null,
  `cd_numero` int(5) null,
  `nm_bairro` varchar(45) null,
  `nm_cidade` varchar(45) null,
  `nm_estado` varchar(2) null,
  `cd_tel1` int null,
  `cd_tel2` int null,
  `nm_vendedor` varchar(100) null,
  `cd_telvendedor` int null,
  `notafiscal_cd_nfe` varchar(100) not null,
  primary key (`cd_fornecedor`),
  index `fk_fornecedor_notafiscal1_idx` (`notafiscal_cd_nfe` asc),
  constraint `fk_fornecedor_notafiscal1`
    foreign key (`notafiscal_cd_nfe`)
    references `estoque`.`notafiscal` (`cd_nfe`)
    on delete no action
    on update no action)
engine = innodb;


-- -----------------------------------------------------
-- table `estoque`.`produto`
-- -----------------------------------------------------
create table if not exists `estoque`.`produto` (
  `cd_produto` int not null,
  `cd_ncm` int not null,
  `ds_produto` varchar(200) not null,
  `qt_produto` int not null,
  `vl_unitario` decimal(10,2) not null,
  `vl_total` decimal(10,2) not null,
  primary key (`cd_produto`))
engine = innodb;


-- -----------------------------------------------------
-- table `estoque`.`saida_produto`
-- -----------------------------------------------------
create table if not exists `estoque`.`saida_produto` (
  `cd_produto_saida` int not null auto_increment,
  `ds_produto` varchar(200) not null,
  `qt_produto` int not null,
  `vl_unitario` decimal(10,2) not null,
  `dt_saida` datetime not null,
  `produto_cd_produto` int not null,
  primary key (`cd_produto_saida`),
  index `fk_saida_produto_produto1_idx` (`produto_cd_produto` asc),
  constraint `fk_saida_produto_produto1`
    foreign key (`produto_cd_produto`)
    references `estoque`.`produto` (`cd_produto`)
    on delete no action
    on update no action)
engine = innodb;


-- -----------------------------------------------------
-- table `estoque`.`entrada_produto`
-- -----------------------------------------------------
create table if not exists `estoque`.`entrada_produto` (
  `cd_produto_entrada` int not null auto_increment,
  `cd_ncm` int not null,
  `ds_produto` varchar(200) not null,
  `qt_produto` int not null,
  `vl_unitario` decimal(10,2) not null,
  `dt_entrada` datetime null,
  `produto_cd_produto` int not null,
  primary key (`cd_produto_entrada`),
  index `fk_entrada_produto_produto1_idx` (`produto_cd_produto` asc),
  constraint `fk_entrada_produto_produto1`
    foreign key (`produto_cd_produto`)
    references `estoque`.`produto` (`cd_produto`)
    on delete no action
    on update no action)
engine = innodb;


set sql_mode=@old_sql_mode;
set foreign_key_checks=@old_foreign_key_checks;
set unique_checks=@old_unique_checks;

insert into tipo_embalagem values ('Unidade' , 01),
('Pacote' , 02),
('Caixa' , 03),
('Metro', 04),
('Rolo', 05),
('Centimetros' ,06)
;

insert into usuario value (4001, 'Mari Santos',123);

ALTER TABLE FORNECEDOR add nm_email varchar(200) AFTER CD_TEL1;
ALTER TABLE FORNECEDOR add nm_site varchar(200) AFTER nm_email;

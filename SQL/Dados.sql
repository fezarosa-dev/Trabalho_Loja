create table cliente (
codigo serial primary key,
nome varchar(50),
login varchar(50) unique,
senha char(32) );

create table departamento(
codigo serial primary key,
nome varchar(50));
create table produto (
codigo serial primary key,
descricao varchar(50),
preco float,
qtde int check(qtde >=0),
imagem varchar(100),
coddep int not null references departamento(codigo) on update cascade);

create table venda(
codigo serial primary key,
total float default 0,
datav timestamp default current_timestamp,
codcli int not null references cliente(codigo) on update cascade);

create table item (
codigo serial primary key,
qtde int check(qtde>0),
precounit float,
codproduto int not null references produto(codigo) on update cascade,
codvenda int not null references venda(codigo) on update cascade);
# Untitled Diagram documentation
## Summary

- [Introduction](#introduction)
- [Database Type](#database-type)
- [Table Structure](#table-structure)
    - [cliente](#cliente)
    - [departamento](#departamento)
    - [produto](#produto)
    - [venda](#venda)
    - [item](#item)
- [Relationships](#relationships)
- [Database Diagram](#database-Diagram)

## Introduction

## Database type

- **Database system:** MySQL
## Table structure

### cliente

| Name        | Type          | Settings                      | References                    | Note                           |
|-------------|---------------|-------------------------------|-------------------------------|--------------------------------|
| **codigo** | INTEGER | 🔑 PK, not null , autoincrement |  | |
| **nome** | VARCHAR(50) | not null  |  | |
| **login** | VARCHAR(50) | not null , unique |  | |
| **senha** | CHAR(32) | not null  |  | | 


### departamento

| Name        | Type          | Settings                      | References                    | Note                           |
|-------------|---------------|-------------------------------|-------------------------------|--------------------------------|
| **codigo** | INTEGER | 🔑 PK, not null , autoincrement |  | |
| **nome** | VARCHAR(50) | not null  |  | | 


### produto

| Name        | Type          | Settings                      | References                    | Note                           |
|-------------|---------------|-------------------------------|-------------------------------|--------------------------------|
| **codigo** | INTEGER | 🔑 PK, not null , autoincrement |  | |
| **descricao** | VARCHAR(50) | not null  |  | |
| **preco** | DECIMAL(10,2) | not null  |  | |
| **qtde** | INTEGER | not null  |  | |
| **imagem** | VARCHAR(100) | not null  |  | |
| **coddep** | INTEGER | not null  | produto_coddep_fk | | 


### venda

| Name        | Type          | Settings                      | References                    | Note                           |
|-------------|---------------|-------------------------------|-------------------------------|--------------------------------|
| **codigo** | INTEGER | 🔑 PK, not null , autoincrement |  | |
| **total** | DECIMAL(10,2) | not null , default: 0 |  | |
| **datav** | TIMESTAMP | not null , default: CURRENT_TIMESTAMP |  | |
| **codcli** | INTEGER | not null  | venda_codcli_fk | | 


### item

| Name        | Type          | Settings                      | References                    | Note                           |
|-------------|---------------|-------------------------------|-------------------------------|--------------------------------|
| **codigo** | INTEGER | 🔑 PK, not null , autoincrement |  | |
| **qtde** | INTEGER | not null  |  | |
| **precounit** | DECIMAL(10,2) | not null  |  | |
| **codproduto** | INTEGER | not null  | item_codproduto_fk | |
| **codvenda** | INTEGER | not null  | item_codvenda_fk | | 


## Relationships

- **produto to departamento**: many_to_one
- **venda to cliente**: many_to_one
- **item to produto**: many_to_one
- **item to venda**: many_to_one

## Database Diagram

```mermaid
erDiagram
    produto ||--o{ departamento : references
    venda ||--o{ cliente : references
    item ||--o{ produto : references
    item ||--o{ venda : references

    cliente {
        INTEGER codigo
        VARCHAR(50) nome
        VARCHAR(50) login
        CHAR(32) senha
    }

    departamento {
        INTEGER codigo
        VARCHAR(50) nome
    }

    produto {
        INTEGER codigo
        VARCHAR(50) descricao
        DECIMAL(10,2) preco
        INTEGER qtde
        VARCHAR(100) imagem
        INTEGER coddep
    }

    venda {
        INTEGER codigo
        DECIMAL(10,2) total
        TIMESTAMP datav
        INTEGER codcli
    }

    item {
        INTEGER codigo
        INTEGER qtde
        DECIMAL(10,2) precounit
        INTEGER codproduto
        INTEGER codvenda
    }
```

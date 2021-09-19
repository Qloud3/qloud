-- Generado por Oracle SQL Developer Data Modeler 21.2.0.183.1957
--   en:        2021-09-19 11:40:45 COT
--   sitio:      Oracle Database 11g
--   tipo:      Oracle Database 11g



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE cliente (
    cedula VARCHAR2(30) NOT NULL
);

ALTER TABLE cliente ADD CONSTRAINT cliente_pk PRIMARY KEY ( cedula );

CREATE TABLE empleado (
    cedula        VARCHAR2(30) NOT NULL,
    nombre        VARCHAR2(30) NOT NULL,
    especialidad  VARCHAR2(50),
    num_celular   VARCHAR2(15) NOT NULL,
    fecha_ingreso DATE NOT NULL,
    usuario_id    INTEGER NOT NULL
);

CREATE UNIQUE INDEX empleado__idx ON
    empleado (
        usuario_id
    ASC );

ALTER TABLE empleado ADD CONSTRAINT empleado_pk PRIMARY KEY ( cedula );

CREATE TABLE pedido (
    id       INTEGER NOT NULL,
    venta_id INTEGER NOT NULL
);

ALTER TABLE pedido ADD CONSTRAINT pedido_pk PRIMARY KEY ( id );

CREATE TABLE usuario (
    id     INTEGER NOT NULL,
    nombre VARCHAR2(30),
    rol    VARCHAR2(05) NOT NULL
);

ALTER TABLE usuario ADD CONSTRAINT usuario_pk PRIMARY KEY ( id );

CREATE TABLE venta (
    id                INTEGER NOT NULL,
    cliente_cedula    VARCHAR2(30) NOT NULL,
    valor_total       INTEGER NOT NULL,
    fecha_inicial     DATE NOT NULL,
    fecha_futura_pago DATE NOT NULL,
    empleado_cedula   VARCHAR2(30) NOT NULL,
    estado            VARCHAR2(15) NOT NULL
);

ALTER TABLE venta ADD CONSTRAINT venta_pk PRIMARY KEY ( id );

ALTER TABLE empleado
    ADD CONSTRAINT empleado_usuario_fk FOREIGN KEY ( usuario_id )
        REFERENCES usuario ( id );

ALTER TABLE pedido
    ADD CONSTRAINT pedido_venta_fk FOREIGN KEY ( venta_id )
        REFERENCES venta ( id );

ALTER TABLE venta
    ADD CONSTRAINT venta_cliente_fk FOREIGN KEY ( cliente_cedula )
        REFERENCES cliente ( cedula );

ALTER TABLE venta
    ADD CONSTRAINT venta_empleado_fk FOREIGN KEY ( empleado_cedula )
        REFERENCES empleado ( cedula );



-- Informe de Resumen de Oracle SQL Developer Data Modeler: 
-- 
-- CREATE TABLE                             5
-- CREATE INDEX                             1
-- ALTER TABLE                              9
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          0
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0

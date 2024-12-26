USE SI_BDSqlSnapMonitor

--================================================================
-- TABLA Usuario
--================================================================
IF EXISTS (SELECT * FROM sys.sysobjects WHERE name = 'Usuario' AND xtype = 'U')
BEGIN
	DROP TABLE Usuario
END

CREATE TABLE Usuario (
	idUsuario INT PRIMARY KEY IDENTITY(1,1),
	cHashUsuarioUID CHAR(32) UNIQUE NOT NULL,
	cUsuario VARCHAR(64) NOT NULL,
	cServer VARCHAR(64) NOT NULL,
	cAliasServer VARCHAR(64) NOT NULL,
	dFechaRegistro DATETIME NOT NULL,
	lVigente BIT DEFAULT 1 NOT NULL
)

-- Agregar propiedades extendidas a la tabla
EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Tabla que almacena información de usuarios SQL.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'Usuario'

-- Agregar propiedades extendidas a las columnas
EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Identificador único de la tabla Usuario.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'Usuario',
	@level2type = N'COLUMN', @level2name = N'idUsuario'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Hash (MD5) de 32 bits generado como identificador único para un usuario a partir de (cUusario, cServer).', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'Usuario',
	@level2type = N'COLUMN', @level2name = N'cHashUsuarioUID'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Nombre SQL del usuario.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'Usuario',
	@level2type = N'COLUMN', @level2name = N'cUsuario'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Nombre del servidor al que pertenece el usuario.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'Usuario',
	@level2type = N'COLUMN', @level2name = N'cServer'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Alias del nombre del servidor (cuando es un servidor externo).', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'Usuario',
	@level2type = N'COLUMN', @level2name = N'cAliasServer'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Fecha y hora en la que se registró el usuario.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'Usuario',
	@level2type = N'COLUMN', @level2name = N'dFechaRegistro'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Vigencia de un usuario (1: activo, 2: inactivo).', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'Usuario',
	@level2type = N'COLUMN', @level2name = N'lVigente'


--================================================================
-- TABLA TipoAccion
--================================================================
IF EXISTS (SELECT * FROM sys.sysobjects WHERE name = 'TipoAccion' AND xtype = 'U')
BEGIN
	DROP TABLE TipoAccion
END

CREATE TABLE TipoAccion (
	idTipoAccion INT PRIMARY KEY IDENTITY(1,1),
	cNombre VARCHAR(64) NOT NULL,
	cDescripcion VARCHAR(200),
	lVigente BIT DEFAULT 1 NOT NULL
)

-- Agregar propiedades extendidas a la tabla
EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Tabla que almacena el tipo de acción al consultar los objetos.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'TipoAccion'

-- Agregar propiedades extendidas a las columnas
EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Identificador único de la tabla TipoAccion.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'TipoAccion',
	@level2type = N'COLUMN', @level2name = N'idTipoAccion'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Nombre del tipo de acción.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'TipoAccion',
	@level2type = N'COLUMN', @level2name = N'cNombre'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Descripción del tipo de acción.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'TipoAccion',
	@level2type = N'COLUMN', @level2name = N'cDescripcion'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Vigencia del tipo de acción (1: Vigente, 2: No vigente).', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'TipoAccion',
	@level2type = N'COLUMN', @level2name = N'lVigente'

--================================================================
-- TABLA LogAcceso
--================================================================
IF EXISTS (SELECT * FROM sys.sysobjects WHERE name = 'LogAcceso' AND xtype = 'U')
BEGIN
	DROP TABLE LogAcceso
END

CREATE TABLE LogAcceso (
	idLogAcceso INT PRIMARY KEY IDENTITY(1,1),
	idUsuario INT NOT NULL,
	cDatabase VARCHAR(64) NOT NULL,
	dFechaAcceso DATETIME NOT NULL
)

-- Agregar propiedades extendidas a la tabla
EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Tabla que almacena información de usuarios.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'LogAcceso'

-- Agregar propiedades extendidas a las columnas
EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Identificador único de la tabla LogAcceso.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'LogAcceso',
	@level2type = N'COLUMN', @level2name = N'idLogAcceso'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Identificador único de usuario - Referencia (Usuario).', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'LogAcceso',
	@level2type = N'COLUMN', @level2name = N'idUsuario'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Nombre de la base de datos accedida.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'LogAcceso',
	@level2type = N'COLUMN', @level2name = N'cDatabase'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Fecha y hora en la que se accedió.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'LogAcceso',
	@level2type = N'COLUMN', @level2name = N'dFechaAcceso'

--================================================================
-- TABLA LogBusqueda
--================================================================
IF EXISTS (SELECT * FROM sysobjects WHERE name = 'LogBusqueda' AND xtype = 'U')
BEGIN
	DROP TABLE LogBusqueda
END

CREATE TABLE LogBusqueda (
	idLogBusqueda INT PRIMARY KEY IDENTITY(1,1),
	idUsuario INT,
	idTipoAccion INT NOT NULL,
	cDatabase VARCHAR(64) NOT NULL,
	cSchema VARCHAR(64) NOT NULL,
	cBusqueda VARCHAR(128) NOT NULL,
	lProduccion BIT NOT NULL,
	dFechaBusqueda DATETIME NOT NULL
)

-- Agregar propiedades extendidas a la tabla
EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Tabla que almacena información de usuarios.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'LogBusqueda'

-- Agregar propiedades extendidas a las columnas
EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Identificador único de la tabla LogBusqueda', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'LogBusqueda',
	@level2type = N'COLUMN', @level2name = N'idLogBusqueda'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Identificador único de usuario - Referencia (Usuario).', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'LogBusqueda',
	@level2type = N'COLUMN', @level2name = N'idUsuario'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Identificador del tipo de accion realizado en la busqueda - Referencia (TipoAccion).', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'LogBusqueda',
	@level2type = N'COLUMN', @level2name = N'idTipoAccion'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Nombre de la base de datos que pertenece el objeto recuperado.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'LogBusqueda',
	@level2type = N'COLUMN', @level2name = N'cDatabase'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Nombre del esquema al que pertenece la búsqueda.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'LogBusqueda',
	@level2type = N'COLUMN', @level2name = N'cSchema'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Nombre del objeto que ha buscado el usuario.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'LogBusqueda',
	@level2type = N'COLUMN', @level2name = N'cBusqueda'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Indica si el objeto recuperado es de produccion (1: produccion, 2: no es de produccion).', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'LogBusqueda',
	@level2type = N'COLUMN', @level2name = N'lProduccion'

EXEC sp_addextendedproperty 
	@name = N'Description', 
	@value = N'Fecha y hora de busqueda y recuperacion de objeto.', 
	@level0type = N'SCHEMA', @level0name = N'dbo', 
	@level1type = N'TABLE',  @level1name = N'LogBusqueda',
	@level2type = N'COLUMN', @level2name = N'dFechaBusqueda'

--================================================================
-- TABLA Favorito
--================================================================
IF EXISTS (SELECT * FROM sysobjects WHERE name = 'Favorito' AND xtype = 'U')
BEGIN
	DROP TABLE Favorito
END

CREATE TABLE Favorito (
	idFavorito INT PRIMARY KEY IDENTITY(1,1),
	idUsuario INT NOT NULL,
	idTipoAccion INT NOT NULL,
	cDatabase VARCHAR(64) NOT NULL,
	cSchema VARCHAR(64) NOT NULL,
	cNombreObjeto VARCHAR(128) NOT NULL,
	dFecha DATETIME NOT NULL,
	lVigente BIT DEFAULT 1 NOT NULL
)

--================================================================
-- TABLA BusquedaReciente
--================================================================
IF EXISTS (SELECT * FROM sysobjects WHERE name = 'BusquedaReciente' AND xtype = 'U')
BEGIN
	DROP TABLE BusquedaReciente
END

CREATE TABLE BusquedaReciente (
	idBusquedaReciente INT PRIMARY KEY IDENTITY(1,1),
	idUsuario INT NOT NULL,
	idTipoAccion INT NOT NULL,
	cDatabase VARCHAR(64) NOT NULL,
	cSchema VARCHAR(64) NOT NULL,
	cNombreObjeto VARCHAR(128) NOT NULL,
	dFecha DATETIME NOT NULL,
	lVigente BIT DEFAULT 1 NOT NULL
)

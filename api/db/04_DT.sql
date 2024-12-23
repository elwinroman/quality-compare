--====================================
--INSERTAR TIPOS DE ACCION TipoAccion
--====================================
IF NOT EXISTS(SELECT 1 FROM dbo.TipoAccion WHERE cNombre = 'sqldefinition')
BEGIN
	INSERT INTO dbo.TipoAccion (cNombre, cDescripcion, lVigente) VALUES ('sqldefinition', 'B�squeda y recuperaci�n de la definici�n de un objeto SQL local', 1)
END

IF NOT EXISTS(SELECT 1 FROM dbo.TipoAccion WHERE cNombre = 'usertable')
BEGIN
	INSERT INTO dbo.TipoAccion (cNombre, cDescripcion, lVigente) VALUES ('usertable', 'B�squeda y recuperaci�n de una tabla de usuario local', 1)
END

IF NOT EXISTS(SELECT 1 FROM dbo.TipoAccion WHERE cNombre = 'forcompare')
BEGIN
	INSERT INTO dbo.TipoAccion (cNombre, cDescripcion, lVigente) VALUES ('forcompare', 'Recuperaci�n de la definici�n de un objeto SQL de pre-producci�n mediante comparaci�n', 1)
END

DO $$
DECLARE 
    ultimoID INTEGER;
BEGIN
    IF to_regclass('secuencia_pais') IS NULL THEN
        
        SELECT COALESCE(MAX(id), 0) + 1 INTO ultimoID
        FROM pais;

        EXECUTE 'CREATE SEQUENCE secuencia_pais START ' || ultimoID;
        
    END IF;

	IF to_regclass('secuencia_moneda') IS NULL THEN
        
        SELECT COALESCE(MAX(id), 0) + 1 INTO ultimoID
        FROM moneda;

        EXECUTE 'CREATE SEQUENCE secuencia_moneda START ' || ultimoID;
        
    END IF;
END $$;
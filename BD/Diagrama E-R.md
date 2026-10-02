```mermaid
erDiagram
    MONEDA ||--o{ CAMBIOMONEDA : vale
    MONEDA ||--o{ PAIS : tranza

    MONEDA { 
        Id MonedaID PK
        varchar Moneda
        varchar Sigla
        varchar Simbolo
        varchar Emisor
        blob Imagen
    }

    CAMBIOMONEDA {
        Id CambioMonedaID PK
        int IdMonedaID FK
        date Fecha
        double Cambio 
    }

    PAIS {
        int PaisID PK
        varchar Nombre
        varchar TipoAutor
        int IdMonedaID FK
    }


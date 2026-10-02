```mermaid
graph TD
    %% Módulo Presentación
    subgraph Presentacion [Módulo: presentacion]
        ApiApp[ApiApplication @SpringBootApplication]
        Controladores[MonedaControlador / PaisControlador / UsuarioControlador]
        Configuracion[ConfiguracionSeguridad / SwaggerConfig]
        Handlers[ExcepcionesGlobalesHandler]
        DtosPresentacion[ErrorRespuesta]
    end

    %% Módulo Aplicación
    subgraph Aplicacion [Módulo: aplicacion]
        ServiciosApp[MonedaServicio / PaisServicio / UsuarioServicio]
        SeguridadApp[FiltroSeguridad / SeguridadServicio / UsuarioDetalleServicio / UsuarioDetalles]
    end

    %% Módulo Core
    subgraph Core [Módulo: core]
        InterfacesServicio[IMonedaServicio / IPaisServicio / IUsuarioServicio]
        InterfacesRepo[IMonedaRepositorio / IPaisRepositorio<br/>ICambioRepositorio / IUsuarioRepositorio]
        InterfacesIntegracion[IPaisServicioExterno]
    end

    %% Módulo Dominio
    subgraph Dominio [Módulo: dominio]
        Entidades[Moneda / Pais / Cambio / Usuario]
        DTOs[CapitalDto / PeriodoDto / UsuarioLoginDto]
    end

    %% Módulo Infraestructura
    subgraph Infraestructura [Módulo: infraestructura]
        RepositoriosImpl[MonedaRepositorio / PaisRepositorio<br/>CambioRepositorio / UsuarioRepositorio]
        RepositoriosJPA[IMonedaRepositorioJpa / IPaisRepositorioJpa<br/>ICambioRepositorioJpa / IUsuarioRepositorioJpa]
        EntidadesJPA[MonedaEntidad / PaisEntidad<br/>CambioEntidad / UsuarioEntidad]
        Mapeadores[MonedaMapeador / PaisMapeador<br/>CambioMapeador / UsuarioMapeador]
        IntegracionExt[PaisServicioExterno / AppConfig]
        DB[(Base de Datos: PostgreSQL)]
        APIExterna[API Externa Capitales]
    end

    %% Relaciones Presentación -> Aplicación / Core / Dominio
    Controladores -->|Inyecta| InterfacesServicio
    Controladores -->|Usa| DTOs
    Controladores -->|Usa| Entidades
    Configuracion -->|Usa| SeguridadApp

    %% Relaciones Aplicación -> Core / Dominio
    ServiciosApp -.->|Implementa| InterfacesServicio
    ServiciosApp -->|Inyecta| InterfacesRepo
    ServiciosApp -->|Inyecta| InterfacesIntegracion
    ServiciosApp -->|Maneja| Entidades
    SeguridadApp -->|Inyecta| InterfacesRepo

    %% Relaciones Infraestructura -> Core / Dominio
    RepositoriosImpl -.->|Implementa| InterfacesRepo
    RepositoriosImpl -->|Inyecta| RepositoriosJPA
    RepositoriosImpl -->|Usa| Mapeadores

    Mapeadores -->|Transforma| Entidades
    Mapeadores -->|Transforma| EntidadesJPA

    PaisServicioExterno -.->|Implementa| InterfacesIntegracion
    PaisServicioExterno -->|RestTemplate / GET| APIExterna

    %% Relaciones JPA -> Base de Datos
    RepositoriosJPA -->|Spring Data JPA / SQL| DB
    EntidadesJPA -->|Mapeo ORM @Entity| DB
    ```
package monedas.api.infraestructura.persistencia.repositorios.interfaces;

import java.util.List;
import java.util.Optional;

import monedas.api.infraestructura.persistencia.entidades.MonedaEntidad;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IMonedaRepositorioJpa extends JpaRepository<MonedaEntidad, Integer> {

    @Query("SELECT m FROM MonedaEntidad m WHERE m.nombre LIKE '%' || ?1 || '%'")
    List<MonedaEntidad> buscarPorNombre(String nombre);

    // Consulta relacionando PaisEntity y MonedaEntidad
    @Query("SELECT p.moneda FROM PaisEntidad p WHERE LOWER(p.nombre) = LOWER(?1)")
    Optional<MonedaEntidad> buscarPorPais(String nombrePais);

}

package monedas.api.infraestructura.persistencia.repositorios.interfaces;

import java.util.List;

import monedas.api.infraestructura.persistencia.entidades.PaisEntidad;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IPaisRepositorioJpa extends JpaRepository<PaisEntidad, Integer> {

    @Query("SELECT p FROM PaisEntidad p WHERE p.nombre LIKE '%' || ?1 || '%'")
    List<PaisEntidad> buscar(String nombre);

}
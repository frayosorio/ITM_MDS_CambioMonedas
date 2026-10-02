package monedas.api.infraestructura.persistencia.repositorios.interfaces;

import java.util.List;
import java.time.LocalDate;

import monedas.api.infraestructura.persistencia.entidades.CambioEntidad;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ICambioRepositorioJpa extends JpaRepository<CambioEntidad, Integer>{

    @Query("SELECT c FROM CambioEntidad c  WHERE c.moneda.id=?1 AND c.fecha >= ?2 AND c.fecha <= ?3")
    public List<CambioEntidad> listarPorPeriodo(int idMoneda, LocalDate fecha1, LocalDate fecha2);

    @Query("SELECT c FROM CambioEntidad c  WHERE c.moneda.id=?1 ORDER BY c.fecha DESC")
    public List<CambioEntidad> listarPorMoneda(int idMoneda);

}

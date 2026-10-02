package monedas.api.core.repositorios;

import java.util.List;
import java.time.LocalDate;
import java.util.Optional;
import monedas.api.dominio.entidades.Cambio;

public interface ICambioRepositorio {

    List<Cambio> listarPorMoneda(int idMoneda);

    List<Cambio> listarPorPeriodo(int idMoneda, LocalDate fecha1, LocalDate fecha2);

    Optional<Cambio> obtenerPorId(int id);

    Cambio guardar(Cambio cambio);

    boolean eliminar(int id);
}

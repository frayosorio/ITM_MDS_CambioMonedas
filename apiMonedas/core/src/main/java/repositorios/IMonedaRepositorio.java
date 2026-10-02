package monedas.api.core.repositorios;

import java.util.List;
import java.util.Optional;
import monedas.api.dominio.entidades.Moneda;

public interface IMonedaRepositorio {

    List<Moneda> listar();

    Optional<Moneda> obtenerPorId(int id);

    List<Moneda> buscarPorNombre(String nombre);

    Moneda buscarPorPais(String nombrePais);

    Moneda guardar(Moneda moneda);

    boolean eliminar(int id);
}
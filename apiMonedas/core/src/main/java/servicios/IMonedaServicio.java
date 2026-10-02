package monedas.api.core.servicios;

import monedas.api.dominio.entidades.Moneda;
import monedas.api.dominio.entidades.Cambio;
import java.util.List;
import java.time.LocalDate;

public interface IMonedaServicio {

    List<Moneda> listar();

    Moneda obtener(int id);

    List<Moneda> buscar(String nombre);

    Moneda buscarPorPais(String nombre);

    Moneda agregar(Moneda moneda);

    Moneda modificar(Moneda moneda);

    boolean eliminar(int id);

    //********** Cambios  

    Cambio agregarCambio(Cambio moneda);

    Cambio modificarCambio(Cambio moneda);

    boolean eliminarCambio(int id);

    List<Cambio> listarPorMoneda(int idMoneda);
	
	List<Cambio> listarPorPeriodo(int idMoneda, LocalDate fecha1, LocalDate fecha2);
    
}

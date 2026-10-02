package monedas.api.core.servicios;

import monedas.api.dominio.entidades.Pais;
import monedas.api.dominio.dtos.CapitalDto;
import java.util.List;


 public interface IPaisServicio {

     List<Pais> listar();

     Pais obtener(int id);

     List<Pais> buscar(String nombre);

     Pais agregar(Pais pais);

     Pais modificar(Pais pais);

     boolean eliminar(int id);

     CapitalDto getCapital(String nombre);
}

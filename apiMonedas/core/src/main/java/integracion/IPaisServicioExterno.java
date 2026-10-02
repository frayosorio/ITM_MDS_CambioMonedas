package monedas.api.core.integracion;

import monedas.api.dominio.dtos.*;

public interface IPaisServicioExterno  {

    CapitalDto getCapital(String nombre);
}

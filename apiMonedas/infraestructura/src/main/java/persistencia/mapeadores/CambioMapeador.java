package monedas.api.infraestructura.persistencia.mapeadores;

import monedas.api.dominio.entidades.Cambio;
import monedas.api.infraestructura.persistencia.entidades.CambioEntidad;

public class CambioMapeador {

    public static Cambio toModelo(CambioEntidad entidad) {
        if (entidad == null) {
            return null;
        }
        return new Cambio(
            entidad.getId(),
            MonedaMapeador.toModelo(entidad.getMoneda()), 
            entidad.getValor(),
            entidad.getFecha()
        );
    }

    public static CambioEntidad toEntidad(Cambio cambio) {
        if (cambio == null) {
            return null;
        }
        return new CambioEntidad(
            cambio.getId(),
            MonedaMapeador.toEntidad(cambio.getMoneda()), 
            cambio.getValor(),
            cambio.getFecha()
        );
    }
}
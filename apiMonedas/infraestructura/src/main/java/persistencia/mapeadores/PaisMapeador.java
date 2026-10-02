package monedas.api.infraestructura.persistencia.mapeadores;

import monedas.api.dominio.entidades.Pais;
import monedas.api.infraestructura.persistencia.entidades.PaisEntidad;

public class PaisMapeador {

    public static Pais toModelo(PaisEntidad entidad) {
        if (entidad == null) {
            return null;
        }
        return new Pais(
                entidad.getId(),
                entidad.getNombre(),
                entidad.getCodigoAlfa2(),
                entidad.getCodigoAlfa3(),
                MonedaMapeador.toModelo(entidad.getMoneda())
            );
    }

    public static PaisEntidad toEntidad(Pais pais) {
        if (pais == null) {
            return null;
        }
        return new PaisEntidad(
                pais.getId(),
                pais.getNombre(),
                pais.getCodigoAlfa2(),
                pais.getCodigoAlfa3(),
                MonedaMapeador.toEntidad(pais.getMoneda())
            );
    }
}

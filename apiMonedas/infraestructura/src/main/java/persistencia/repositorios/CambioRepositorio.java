package monedas.api.infraestructura.persistencia.repositorios;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import monedas.api.dominio.entidades.Cambio;
import monedas.api.core.repositorios.ICambioRepositorio;
import monedas.api.infraestructura.persistencia.entidades.CambioEntidad;
import monedas.api.infraestructura.persistencia.mapeadores.CambioMapeador;
import monedas.api.infraestructura.persistencia.repositorios.interfaces.ICambioRepositorioJpa;

@Component
public class CambioRepositorio implements ICambioRepositorio {

    @Autowired
    private ICambioRepositorioJpa repositorio;

    @Override
    public List<Cambio> listarPorMoneda(int idMoneda) {
        return repositorio.listarPorMoneda(idMoneda)
                .stream()
                .map(CambioMapeador::toModelo)
                .collect(Collectors.toList());
    }

    @Override
    public List<Cambio> listarPorPeriodo(int idMoneda, LocalDate fecha1, LocalDate fecha2) {
        return repositorio.listarPorPeriodo(idMoneda, fecha1, fecha2)
                .stream()
                .map(CambioMapeador::toModelo)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Cambio> obtenerPorId(int id) {
        return repositorio.findById(id)
                .map(CambioMapeador::toModelo);
    }

    @Override
    public Cambio guardar(Cambio cambio) {
        CambioEntidad cambioEntidad = CambioMapeador.toEntidad(cambio);
        CambioEntidad guardado = repositorio.save(cambioEntidad);
        return CambioMapeador.toModelo(guardado);
    }

    @Override
    public boolean eliminar(int id) {
        try {
            if (repositorio.existsById(id)) {
                repositorio.deleteById(id);
                return true;
            }
            return false;
        } catch (Exception ex) {
            return false;
        }
    }

}

package monedas.api.infraestructura.persistencia.repositorios;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import monedas.api.dominio.entidades.Moneda;
import monedas.api.core.repositorios.IMonedaRepositorio;
import monedas.api.infraestructura.persistencia.entidades.MonedaEntidad;
import monedas.api.infraestructura.persistencia.mapeadores.MonedaMapeador;
import monedas.api.infraestructura.persistencia.repositorios.interfaces.IMonedaRepositorioJpa;

@Component
public class MonedaRepositorio implements IMonedaRepositorio {

    @Autowired
    private IMonedaRepositorioJpa repositorio;

    @Override
    public List<Moneda> listar() {
        return repositorio.findAll()
                .stream()
                .map(MonedaMapeador::toModelo)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Moneda> obtenerPorId(int id) {
        return repositorio.findById(id)
                .map(MonedaMapeador::toModelo);
    }

    @Override
    public List<Moneda> buscarPorNombre(String nombre) {
        return repositorio.buscarPorNombre(nombre)
                .stream()
                .map(MonedaMapeador::toModelo)
                .collect(Collectors.toList());
    }

    @Override
    public Moneda buscarPorPais(String nombrePais) {
        return repositorio.buscarPorPais(nombrePais)
                .map(MonedaMapeador::toModelo)
                .orElse(null);
    }

    @Override
    public Moneda guardar(Moneda moneda) {
        MonedaEntidad monedaEntidad = MonedaMapeador.toEntidad(moneda);
        MonedaEntidad guardado = repositorio.save(monedaEntidad);
        return MonedaMapeador.toModelo(guardado);
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

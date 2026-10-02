package monedas.api.infraestructura.persistencia.repositorios;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import monedas.api.dominio.entidades.Pais;
import monedas.api.core.repositorios.IPaisRepositorio;
import monedas.api.infraestructura.persistencia.entidades.PaisEntidad;
import monedas.api.infraestructura.persistencia.mapeadores.PaisMapeador;
import monedas.api.infraestructura.persistencia.repositorios.interfaces.IPaisRepositorioJpa;


@Component
public class PaisRepositorio implements IPaisRepositorio {

    @Autowired
    private IPaisRepositorioJpa repositorio;

    @Override
    public List<Pais> listar() {
        return repositorio.findAll()
                .stream()
                .map(PaisMapeador::toModelo)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Pais> obtenerPorId(int id) {
        return repositorio.findById(id)
                .map(PaisMapeador::toModelo);
    }

    @Override
    public List<Pais> buscarPorNombre(String nombre) {
        return repositorio.buscar(nombre)
                .stream()
                .map(PaisMapeador::toModelo)
                .collect(Collectors.toList());
    }

    @Override
    public Pais guardar(Pais pais) {
        PaisEntidad paisEntidad = PaisMapeador.toEntidad(pais);
        PaisEntidad guardado = repositorio.save(paisEntidad);
        return PaisMapeador.toModelo(guardado);
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

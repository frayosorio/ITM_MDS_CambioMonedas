package monedas.api.infraestructura.persistencia.repositorios;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import monedas.api.dominio.entidades.Usuario;
import monedas.api.core.repositorios.IUsuarioRepositorio;
import monedas.api.infraestructura.persistencia.entidades.UsuarioEntidad;
import monedas.api.infraestructura.persistencia.mapeadores.UsuarioMapeador;
import monedas.api.infraestructura.persistencia.repositorios.interfaces.IUsuarioRepositorioJpa;

@Component
public class UsuarioRepositorio implements IUsuarioRepositorio {

    @Autowired
    private IUsuarioRepositorioJpa repositorio;

    @Override
    public Usuario login(String nombreUsuario, String clave) {
        return repositorio.login(nombreUsuario, clave)
                .map(UsuarioMapeador::toModelo)
                .orElse(null);
    }

    @Override
    public List<Usuario> listar() {
        return repositorio.findAll()
                .stream()
                .map(UsuarioMapeador::toModelo)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Usuario> obtenerPorId(int id) {
        return repositorio.findById(id)
                .map(UsuarioMapeador::toModelo);
    }

    @Override
    public Optional<Usuario> obtener(String usuario) {
        return repositorio.obtener(usuario)
                .map(UsuarioMapeador::toModelo);
    }

    @Override
    public List<Usuario> buscarPorNombre(String nombre) {
        return repositorio.buscar(nombre)
                .stream()
                .map(UsuarioMapeador::toModelo)
                .collect(Collectors.toList());
    }

    @Override
    public Usuario guardar(Usuario usuario) {
        UsuarioEntidad usuarioEntidad = UsuarioMapeador.toEntidad(usuario);
        UsuarioEntidad guardado = repositorio.save(usuarioEntidad);
        return UsuarioMapeador.toModelo(guardado);
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

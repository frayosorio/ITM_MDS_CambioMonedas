package monedas.api.core.servicios;

import java.util.List;

import monedas.api.dominio.entidades.*;
import monedas.api.dominio.dtos.*;

public interface IUsuarioServicio {

    public UsuarioLoginDto login(String nombreUsuario, String clave);

    public List<Usuario> listar();

    public Usuario obtener(int id);

    public List<Usuario> buscar(String nombre);

    public Usuario agregar(Usuario Usuario);

    public Usuario modificar(Usuario Usuario);

    public boolean eliminar(int id);
}

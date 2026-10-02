package monedas.api.infraestructura.persistencia.repositorios.interfaces;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import monedas.api.infraestructura.persistencia.entidades.UsuarioEntidad;

@Repository
public interface IUsuarioRepositorioJpa extends JpaRepository<UsuarioEntidad, Integer> {

    @Query("SELECT u FROM UsuarioEntidad u  WHERE u.nombre LIKE '%' || ?1 || '%'")
    List<UsuarioEntidad> buscar(String nombre);

    @Query("SELECT u FROM UsuarioEntidad u  WHERE u.usuario = ?1")
    Optional<UsuarioEntidad> obtener(String usuario);
    
    @Query("SELECT u FROM UsuarioEntidad u WHERE u.usuario=?1 AND u.clave=?2")
    Optional<UsuarioEntidad> login(String usuario, String clave);
}

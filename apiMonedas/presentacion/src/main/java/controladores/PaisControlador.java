package monedas.api.presentacion.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import monedas.api.dominio.entidades.*;
import monedas.api.dominio.dtos.*;
import monedas.api.core.servicios.*;

@RestController
@RequestMapping("/api/paises")
public class PaisControlador {

    @Autowired
    private IPaisServicio servicio;

    @GetMapping(value = "/")
    public List<Pais> listar() {
        return servicio.listar();
    }

    @GetMapping(value = "/obtener/{id}")
    public Pais obtener(@PathVariable int id) {
        return servicio.obtener(id);
    }

    @RequestMapping(value = "/buscar/{nombre}", method = RequestMethod.GET)
    public List<Pais> buscar(@PathVariable String nombre) {
        return servicio.buscar(nombre);
    }

    @PostMapping(value = "/")
    public Pais crear(@RequestBody Pais pais) {
        return servicio.agregar(pais);
    }

    @PutMapping(value = "/")
    public Pais actualizar(@RequestBody Pais pais) {
        return servicio.modificar(pais);
    }

    @DeleteMapping(value = "/{id}")
    public boolean eliminar(@PathVariable int id) {
        return servicio.eliminar(id);
    }


    @GetMapping(value = "/capital/{pais}")
    public CapitalDto getCapital(@PathVariable String pais) {
        return servicio.getCapital(pais);
    }
}

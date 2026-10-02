package monedas.api.presentacion.controladores;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import monedas.api.core.servicios.*;
import monedas.api.dominio.entidades.*;
import monedas.api.dominio.dtos.*;

@RestController
@RequestMapping("/api/monedas")
public class MonedaControlador {

    private final IMonedaServicio servicio;

    // Inyección por constructor (recomendada en Spring moderno)
    public MonedaControlador(IMonedaServicio servicio) {
        this.servicio = servicio;
    }

    // ==========================================
    // Operaciones de Moneda
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Moneda>> listar() {
        return ResponseEntity.ok(servicio.listar());
    }

    @GetMapping("/obtener/{id}")
    public ResponseEntity<Moneda> obtener(@PathVariable int id) {
        Moneda moneda = servicio.obtener(id);
        if (moneda == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(moneda);
    }

    @PostMapping
    public ResponseEntity<Moneda> agregar(@RequestBody Moneda moneda) {
        Moneda creada = servicio.agregar(moneda);
        return ResponseEntity.status(HttpStatus.CREATED).body(creada);
    }

    @PutMapping
    public ResponseEntity<Moneda> modificar(@RequestBody Moneda moneda) {
        return ResponseEntity.ok(servicio.modificar(moneda));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable int id) {
        boolean eliminado = servicio.eliminar(id);
        if (eliminado) {
            return ResponseEntity.noContent().build(); // HTTP 204
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/pais/{nombre}")
    public ResponseEntity<Moneda> buscarPorPais(@PathVariable String nombre) {
        Moneda moneda = servicio.buscarPorPais(nombre);
        if (moneda == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(moneda);
    }

    // ==========================================
    // Operaciones de Cambios
    // ==========================================

    @PostMapping("/cambio")
    public ResponseEntity<Cambio> agregarCambio(@RequestBody Cambio cambio) {
        Cambio creado = servicio.agregarCambio(cambio);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/cambio")
    public ResponseEntity<Cambio> modificarCambio(@RequestBody Cambio cambio) {
        return ResponseEntity.ok(servicio.modificarCambio(cambio));
    }

    @DeleteMapping("/cambio/{id}")
    public ResponseEntity<Void> eliminarCambio(@PathVariable int id) {
        boolean eliminado = servicio.eliminarCambio(id);
        if (eliminado) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/cambiosporperiodo")
    public ResponseEntity<List<Cambio>> listarPorPeriodo(@RequestBody PeriodoDto periodo) {
        List<Cambio> lista = servicio.listarPorPeriodo(
                periodo.getIdMoneda(), 
                periodo.getDesde(), 
                periodo.getHasta()
        );
        return ResponseEntity.ok(lista);
    }

    @GetMapping("/cambios/{idmoneda}")
    public ResponseEntity<List<Cambio>> listarPorMoneda(@PathVariable int idmoneda) {
        return ResponseEntity.ok(servicio.listarPorMoneda(idmoneda));
    }
}
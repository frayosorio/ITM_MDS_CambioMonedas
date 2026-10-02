package monedas.api.aplicacion.servicios;

import java.util.Optional;
import java.util.List;
import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import monedas.api.core.servicios.*;
import monedas.api.core.repositorios.*;
import monedas.api.dominio.entidades.*;


@Service
public class MonedaServicio implements IMonedaServicio {

    @Autowired
    private IMonedaRepositorio repositorio;

    @Autowired
    private ICambioRepositorio repositorioCambio;

    public List<Moneda> listar() {
        return repositorio.listar();
    }

    public Moneda obtener(int id) {
        return repositorio.obtenerPorId(id).orElse(null);
    }

    public List<Moneda> buscar(String nombre) {
        return repositorio.buscarPorNombre(nombre);
    }

    public Moneda buscarPorPais(String nombre) {
        return repositorio.buscarPorPais(nombre);
    }

    public Moneda agregar(Moneda moneda) {
        moneda.setId(0);
        return repositorio.guardar(moneda);
    }

    public Moneda modificar(Moneda moneda) {
        var monedaEncontrada = repositorio.obtenerPorId(moneda.getId());
        return monedaEncontrada.isEmpty() ? null : repositorio.guardar(moneda);
    }

    public boolean eliminar(int id) {
        return repositorio.eliminar(id);
    }

    // ********** Cambios

    public Cambio agregarCambio(Cambio cambio) {
        cambio.setId(0);
        return repositorioCambio.guardar(cambio);
    }

    public Cambio modificarCambio(Cambio cambio) {
        var cambioEncontrado = repositorioCambio.obtenerPorId(cambio.getId());
        return cambioEncontrado.isEmpty() ? null : repositorioCambio.guardar(cambio);
    }

    public boolean eliminarCambio(int id) {
        return repositorioCambio.eliminar(id);
    }

    public List<Cambio> listarPorMoneda(int idMoneda) {
        return repositorioCambio.listarPorMoneda(idMoneda);
    }

    public List<Cambio> listarPorPeriodo(int idMoneda, LocalDate fecha1, LocalDate fecha2) {
        return repositorioCambio.listarPorPeriodo(idMoneda, fecha1, fecha2);
    }

}

package monedas.api.aplicacion.servicios;

import java.util.List;
import java.util.Date;
import java.util.Optional;

import org.springframework.stereotype.Service;

import Servicios.IMonedaServicio;
import entidades.CambioMoneda;
import entidades.Moneda;
import monedas.api.dominio.entidades.*;
import monedas.api.core.servicios.*;
import monedas.api.infraestructura.repositorios.*;
import repositorios.ICambioMonedaRepositorio;
import repositorios.IMonedaRepositorio;

@Service
public class MonedaServicio implements IMonedaServicio {

private IMonedaRepositorio repositorio;
private ICambioMonedaRepositorio repositorioCambio;

public MonedaServicio(IMonedaRepositorio repositorio,
                        ICambioMonedaRepositorio repositorioCambio){
    this.repositorio=repositorio;
    this.repositorioCambio=repositorioCambio;
}

    @Override
    public List<Moneda> listar(){
        return repositorio.findAll();
     }

    @Override
    public Moneda obtener(Long id){
        var moneda = repositorio.findById(id);
        return moneda.isEmpty()? null : moneda.get();
     }

    @Override
    public List<Moneda> buscar(String nombre){ 
        return repositorio.buscar(nombre);
    }

    @Override
    public Moneda buscarPorPais(String nombre){ 
        return repositorio.buscarPorPais(nombre);
    }

    @Override
    public Moneda agregar(Moneda moneda){ 
        moneda.setId(0);
        return repositorio.save(moneda);
    }

    @Override
    public Moneda modificar(Moneda moneda){ 
        Optional<Moneda> monedaEncontrado = repositorio.findById(moneda.getId());
        if (!monedaEncontrado.isEmpty()) {
            return repositorio.save(moneda);
        } else {
            return null;
        }
    }

    @Override
    public boolean eliminar(Long id){ 
        try {
            repositorio.deleteById(id);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
	
    @Override
	public List<CambioMoneda> listarPorPeriodo(long idMoneda, Date fecha1, Date fecha2){ 
        return repositorioCambio.listarPorPeriodo(idMoneda, fecha1, fecha2);
    }

        /* 
    public async Task<IEnumerable<AnalisisInversionDTO>> AnalizarInversionDolar(
            string siglaMoneda,
            DateTime desde,
            DateTime hasta,
            double umbralCambioPorcentaje = 1.0 // 1% por defecto
        )
        {
            var moneda = (await repositorio.Buscar(1, siglaMoneda)).FirstOrDefault();
            if (moneda == null)
                throw new Exception($"Moneda con sigla '{siglaMoneda}' no encontrada.");

            var cambios = (await repositorio.ObtenerHistorialCambios(moneda.Id, desde, hasta))
                          .OrderBy(c => c.Fecha)
                          .ToList();

            if (!cambios.Any())
                throw new Exception("No hay datos de cambio disponibles para ese período.");

            var resultado = new List<AnalisisInversionDTO>();
            string? tendenciaActual = null;
            DateTime? fechaInicio = null;
            double cambioInicio = 0;

            for (int i = 1; i < cambios.Count; i++)
            {
                var anterior = cambios[i - 1];
                var actual = cambios[i];

                double variacionPorcentaje = Math.Abs((actual.Cambio - anterior.Cambio) / anterior.Cambio * 100);

                string nuevaTendencia = variacionPorcentaje >= umbralCambioPorcentaje
                    ? (actual.Cambio > anterior.Cambio ? "Vender USD" : "Comprar USD")
                    : tendenciaActual ?? "Sin cambio";

                if (nuevaTendencia != tendenciaActual)
                {
                    if (tendenciaActual != null && fechaInicio.HasValue)
                    {
                        resultado.Add(new AnalisisInversionDTO
                        {
                            SiglaMonedaA = siglaMoneda,
                            SiglaMonedaB = "USD",
                            FechaInicio = fechaInicio.Value,
                            FechaFin = anterior.Fecha,
                            CambioMonedaAInicio = cambioInicio,
                            CambioMonedaAFin = anterior.Cambio,
                            Recomendacion = tendenciaActual
                        });
                    }

                    fechaInicio = anterior.Fecha;
                    cambioInicio = anterior.Cambio;
                    tendenciaActual = nuevaTendencia;
                }
            }

            var ultimo = cambios.Last();
            if (fechaInicio.HasValue)
            {
                resultado.Add(new AnalisisInversionDTO
                {
                    SiglaMonedaA = siglaMoneda,
                    SiglaMonedaB = "USD",
                    FechaInicio = fechaInicio.Value,
                    FechaFin = ultimo.Fecha,
                    CambioMonedaAInicio = cambioInicio,
                    CambioMonedaAFin = ultimo.Cambio,
                    Recomendacion = tendenciaActual!
                });
            }

            return resultado;
        }


    }
*/


}

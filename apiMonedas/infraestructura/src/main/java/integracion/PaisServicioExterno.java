package monedas.api.infraestructura.integracion;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

import monedas.api.dominio.dtos.*;
import monedas.api.core.integracion.*;

@Service
public class PaisServicioExterno implements IPaisServicioExterno {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${servicioexterno.paises.url}")
    private String urlBase;

    @Override
    public CapitalDto getCapital(String nombre) {
        String url = urlBase + "/capital/" + nombre;

        ResponseEntity<CapitalDto> response = restTemplate.exchange(url, HttpMethod.GET, null, CapitalDto.class);

        return response.getBody();
    }

}

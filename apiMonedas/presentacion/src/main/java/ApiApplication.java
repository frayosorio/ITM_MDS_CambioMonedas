package monedas.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
    "monedas.api",                  // Escanea todos los paquetes bajo monedas.api
    "monedas.api.infraestructura"   // Asegura el escaneo explicito de la infraestructura
})
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

}

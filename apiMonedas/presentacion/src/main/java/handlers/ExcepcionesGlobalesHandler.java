package monedas.api.presentacion.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import monedas.api.presentacion.dtos.*;

@ControllerAdvice
public class ExcepcionesGlobalesHandler {

    @ExceptionHandler(HttpClientErrorException.BadRequest.class)
    public ResponseEntity<?> manejarBadRequest(HttpClientErrorException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ErrorRespuesta("Error de validación desde API externa", ex.getResponseBodyAsString()));
    }

    @ExceptionHandler(HttpClientErrorException.NotFound.class)
    public ResponseEntity<?> manejarNotFound(HttpClientErrorException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ErrorRespuesta("País no encontrado"));
    }

    @ExceptionHandler(HttpClientErrorException.class)
    public ResponseEntity<?> manejarHttpClient(HttpClientErrorException ex) {
        return ResponseEntity.status(ex.getStatusCode()).body(
                new ErrorRespuesta("Error en API externa", ex.getResponseBodyAsString()));
    }

    @ExceptionHandler(HttpServerErrorException.class)
    public ResponseEntity<?> manejarServerError(HttpServerErrorException ex) {
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(
                new ErrorRespuesta("Error en servicio externo"));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> manejarGeneral(Exception ex) {

        ex.printStackTrace(); 

        return ResponseEntity.status(500).body(
                new ErrorRespuesta("Error interno", ex.getMessage()));
    }

}

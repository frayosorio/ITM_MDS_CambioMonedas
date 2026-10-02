package monedas.api.presentacion.dtos;

public class ErrorRespuesta {
    private String mensaje;
    private String detalle;

    public ErrorRespuesta(String mensaje) {
        this.mensaje = mensaje;
    }

    public ErrorRespuesta(String mensaje, String detalle) {
        this.mensaje = mensaje;
        this.detalle = detalle;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

}

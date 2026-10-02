package monedas.api.dominio.entidades;

import java.time.LocalDate;

public class Cambio {

    private int id;
    private Moneda moneda;
    private double valor;
    private LocalDate fecha;

    public Cambio() {
    }

    public Cambio(int id, Moneda moneda, double valor, LocalDate fecha) {
        this.id = id;
        this.moneda = moneda;
        this.valor = valor;
        this.fecha = fecha;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Moneda getMoneda() {
        return moneda;
    }

    public void setMoneda(Moneda moneda) {
        this.moneda = moneda;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

}

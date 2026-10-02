package monedas.api.infraestructura.persistencia.entidades;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "cambiomoneda")
public class CambioEntidad {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "secuencia_cambio")
    @SequenceGenerator(name = "secuencia_cambio", sequenceName = "secuencia_cambio", allocationSize = 1)
    private int id;

    @ManyToOne
    @JoinColumn(name = "idmoneda", referencedColumnName = "id")
    private MonedaEntidad moneda;

    @Column(name = "cambio")
    private double valor;

    @Column(name = "fecha")
    private LocalDate fecha;

    public CambioEntidad() {
    }

    public CambioEntidad(int id, MonedaEntidad moneda, double valor, LocalDate fecha) {
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

    public MonedaEntidad getMoneda() {
        return moneda;
    }

    public void setMoneda(MonedaEntidad moneda) {
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

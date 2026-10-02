package monedas.api.infraestructura.persistencia.entidades;

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
@Table(name = "pais")
public class PaisEntidad {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "secuencia_pais")
    @SequenceGenerator(name = "secuencia_pais", sequenceName = "secuencia_pais", allocationSize = 1)
    private int id;

    @Column(name = "pais", length = 100)
    private String nombre;

    @Column(name = "codigoalfa2", length = 5)
    private String codigoAlfa2;

    @Column(name = "codigoalfa3", length = 5)
    private String codigoAlfa3;

    @ManyToOne
    @JoinColumn(name = "idmoneda", referencedColumnName = "id")
    private MonedaEntidad moneda;

    public PaisEntidad() {
    }

    public PaisEntidad(int id, String nombre, String codigoAlfa2, String codigoAlfa3, MonedaEntidad moneda) {
        this.id = id;
        this.nombre = nombre;
        this.codigoAlfa2 = codigoAlfa2;
        this.codigoAlfa3 = codigoAlfa3;
        this.moneda = moneda;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCodigoAlfa2() {
        return codigoAlfa2;
    }

    public void setCodigoAlfa2(String codigoAlfa2) {
        this.codigoAlfa2 = codigoAlfa2;
    }

    public String getCodigoAlfa3() {
        return codigoAlfa3;
    }

    public void setCodigoAlfa3(String codigoAlfa3) {
        this.codigoAlfa3 = codigoAlfa3;
    }

    public MonedaEntidad getMoneda() {
        return moneda;
    }

    public void setMoneda(MonedaEntidad moneda) {
        this.moneda = moneda;
    }



}

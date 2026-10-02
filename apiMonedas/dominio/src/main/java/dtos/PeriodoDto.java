package monedas.api.dominio.dtos;

import java.time.LocalDate;

public class PeriodoDto {
    private int idMoneda;
    private LocalDate desde;
    private LocalDate hasta;

    public PeriodoDto(int idMoneda, LocalDate desde, LocalDate hasta) {
        this.idMoneda = idMoneda;
        this.desde = desde;
        this.hasta = hasta;
    }

    public int getIdMoneda() {
        return idMoneda;
    }

    public void setIdMoneda(int idMoneda) {
        this.idMoneda = idMoneda;
    }

    public LocalDate getDesde() {
        return desde;
    }

    public void setDesde(LocalDate desde) {
        this.desde = desde;
    }

    public LocalDate getHasta() {
        return hasta;
    }

    public void setHasta(LocalDate hasta) {
        this.hasta = hasta;
    }


}

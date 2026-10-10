import { Moneda } from "./moneda";

export class CambioMoneda {
    constructor(
        public idMoneda: number,
        public moneda: Moneda | null,
        public fecha: Date,
        public valor: number
    ) {
    }
}
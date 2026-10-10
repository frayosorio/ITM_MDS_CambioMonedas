import { Moneda } from "./moneda";

export class Pais {
    
    constructor(
        public id: number,
        public nombre: string,
        public codigoAlfa2: string,
        public codigoAlfa3: string,
        public idMoneda: number,
        public moneda?: Moneda,
    ) {
    }
}
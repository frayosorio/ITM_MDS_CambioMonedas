import { Routes } from '@angular/router';
import { InicioComponent } from './features/componentes/inicio/inicio.component';
import { MonedaComponent } from './features/componentes/moneda/moneda.component';
import { PaisComponent } from './features/componentes/pais/pais.component';
import { CambioMonedaComponent } from './features/componentes/cambio-moneda/cambio-moneda.component';

export const routes: Routes = [
    { path: "inicio", component: InicioComponent },
    { path: 'monedas', component: MonedaComponent },
    { path: 'paises', component: PaisComponent },
    { path: 'cambios', component: CambioMonedaComponent },

    { path: "**", redirectTo: "inicio" },
];

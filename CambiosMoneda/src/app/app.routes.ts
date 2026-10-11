import {Routes} from '@angular/router';
import {InicioComponent} from './features/componentes/inicio/inicio.component';
import {MonedaComponent} from './features/componentes/moneda/moneda.component';
import {PaisComponent} from './features/componentes/pais/pais.component';
import {CambioMonedaComponent} from './features/componentes/cambio-moneda/cambio-moneda.component';
import {AutorizacionGuard} from "./core/guardas/autorizacion.guard";

export const RUTA_DEFAULT = '/inicio';

export const routes: Routes = [
  {path: "", redirectTo: "inicio", pathMatch: "full"},
  {path: "inicio", component: InicioComponent},
  {path: 'monedas', component: MonedaComponent, canActivate: [AutorizacionGuard]},
  {path: 'paises', component: PaisComponent, canActivate: [AutorizacionGuard]},
  {path: 'cambios', component: CambioMonedaComponent, canActivate: [AutorizacionGuard]},

  {path: "**", redirectTo: "inicio"},
];

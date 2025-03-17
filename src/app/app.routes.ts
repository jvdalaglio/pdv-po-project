import { Routes } from '@angular/router';
import { ListarClientesComponent } from './clientes/listar/listar-clientes.component';

export const routes: Routes = [
  {
    path: '',
    component: ListarClientesComponent
  },
  {
    path: 'clientes/listar',
    component: ListarClientesComponent
  }
];

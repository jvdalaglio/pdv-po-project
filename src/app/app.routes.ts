import { Routes } from '@angular/router';
import { CadastrarClientesComponent } from './clientes/cadastrar/cadastrar-clientes/cadastrar-clientes.component';
import { ListarClientesComponent } from './clientes/listar/listar-clientes.component';

export const routes: Routes = [
  {
    path: '',
    component: ListarClientesComponent
  },
  {
    path: 'clientes/listar',
    component: ListarClientesComponent
  },
  {
    path: 'clientes/cadastrar',
    component: CadastrarClientesComponent
  }
];

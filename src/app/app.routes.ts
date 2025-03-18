import { Routes } from '@angular/router';
import { CadastrarClientesComponent } from './clientes/cadastrar/cadastrar-clientes.component';
import { ListarClientesComponent } from './clientes/listar/listar-clientes.component';
import { ListarProdutosComponent } from './produtos/listar/listar-produtos.component';

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
  },
  {
    path: 'produtos/listar',
    component: ListarProdutosComponent
  }
];

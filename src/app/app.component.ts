import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  PoIconModule,
  PoMenuItem,
  PoMenuModule,
  PoPageModule,
  PoToolbarModule,
} from '@po-ui/ng-components';
import { ClientesService } from './core/services/clientes/clientes.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    PoIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ClientesService, AngularFirestore]
})
export class AppComponent {
  private router: Router = new Router();
  public menuItemSelected: string = '';
  readonly menus: Array<PoMenuItem> = [
    { label: 'Início', action: this.onClick.bind(this), link: '/', icon: 'an-fill an-home' },
    { label: 'Clientes', subItems: [
      { label: 'Listar', action: this.onClick.bind(this), link: '/clientes/listar' },
      { label: 'Cadastrar', action: this.onClick.bind(this), link: '/clientes/cadastrar' }
    ] },
    { label: 'Produtos', subItems: [
      { label: 'Listar', action: this.onClick.bind(this), link: '/produtos/listar' },
      { label: 'Cadastrar', action: this.onClick.bind(this), link: '/produtos/cadastrar' }
    ] },
  ];

  private onClick(menu: PoMenuItem) {
    this.menuItemSelected = menu.label
    this.router.navigate([menu.link]);
  }
}

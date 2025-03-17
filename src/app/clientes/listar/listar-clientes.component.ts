import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PoTableColumn, PoTableModule } from '@po-ui/ng-components';
import { ClientesService } from '../../core/services/clientes/clientes.service';
import { Cliente } from '../../models/clientes';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, PoTableModule],
  templateUrl: './listar-clientes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListarClientesComponent {
    private clientesService: ClientesService = inject(ClientesService);
    public clientes: Array<Cliente> = [];
    public loading: boolean = false;
    public columns: PoTableColumn[] = [
      { property: 'id', label: 'id' },
      { property: 'nome', label: 'Nome' },
      { property: 'email', label: 'E-mail' },
      { property: 'endereco', label: 'Endereço' },
      { property: 'telefone', label: 'Telefone' },
      { property: 'dataCadastro', label: 'Data de cadastro' },
    ]
  ngOnInit() {
    this.listarClientes();
  }

  private listarClientes() {
    this.loading = true;
    this.clientesService.listarClientes().subscribe((data) => {
      console.log('data', data);
      this.clientes = data.map((e: any) => {
        this.loading = false;
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
        };
      });
      console.log('this.clientes', this.clientes);
    });
  }
}

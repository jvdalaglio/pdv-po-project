import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { PoButtonModule, PoDialogService, PoDividerModule, PoIconModule, PoModalComponent, PoModalModule, PoNotificationService, PoTableAction, PoTableColumn, PoTableComponent, PoTableModule, PoToasterModule, PoToasterType } from '@po-ui/ng-components';
import { ClientesService } from '../../core/services/clientes/clientes.service';
import { Cliente } from '../../models/clientes';

interface Toastr {
  message: string;
  type: PoToasterType;
  show: boolean;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, PoTableModule, PoDividerModule, PoModalModule, PoButtonModule, PoIconModule, PoToasterModule],
  templateUrl: './listar-clientes.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [PoDialogService]
})

export class ListarClientesComponent {
  constructor(private poNotification: PoNotificationService) {

  }
  @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent;
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
    private clientesService: ClientesService = inject(ClientesService);
    public clientes: Array<Cliente> = [];
    public loading: boolean = false;
    public details: any;

    public columns: PoTableColumn[] = [
      { property: 'id', label: 'ID', width: '15%' },
      { property: 'nome', label: 'Nome', width: '25%' },
      { property: 'email', label: 'E-mail', width: '15%' },
      { property: 'endereco', label: 'Endereço', width: '25%' },
      { property: 'telefone', label: 'Telefone', width: '10%' },
      { property: 'cpf', label: 'CPF', width: '10%' },
      { property: 'dataCadastro', label: 'Data de cadastro', width: '10%' },
    ]

    public actions: Array<PoTableAction> = [
      { action: this.remove.bind(this), icon: 'po-icon an an-trash', label: 'Excluir' }
    ];

  ngOnInit() {
    this.listarClientes();
  }

  private listarClientes() {
    this.loading = true;
    this.clientesService.listarClientes().subscribe((data) => {
      this.loading = false;
      this.clientes = data.map((e: any) => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
          dataCadastro: new Date(e.payload.doc.data().dataCadastro.toDate()).toLocaleDateString('pt-BR'),
        };
      });
    });
  }

  public deletarCliente(cliente: any) {
    this.clientesService.excluirCliente(cliente.id).then(() => {
      this.poModal.close();
      this.poNotification.success('Cliente excluído com sucesso');
      this.listarClientes();
    }).catch((error) => {
      this.poNotification.error('Erro ao excluir cliente');
      console.error(error);
    });

  }

  remove(item: { [key: string]: any }) {
    this.details = item;
    this.poModal.open();
  }
}

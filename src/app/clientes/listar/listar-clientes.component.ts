import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { PoButtonModule, PoDialogService, PoDividerModule, PoIconModule, PoModalComponent, PoModalModule, PoNotificationService, PoTableAction, PoTableColumn, PoTableComponent, PoTableModule, PoToasterModule } from '@po-ui/ng-components';
import { ClientesService } from '../../core/services/clientes/clientes.service';
import { Cliente } from '../../models/clientes';
import { CadastrarClientesComponent } from '../cadastrar/cadastrar-clientes.component';

interface Modal {
  title: string;
  type: string;
  buttons: Array<any>;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, PoTableModule, PoDividerModule, PoModalModule, PoButtonModule, PoIconModule, PoToasterModule, CadastrarClientesComponent],
  templateUrl: './listar-clientes.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [PoDialogService]
})

export class ListarClientesComponent {
  // DECORATORS
  @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent;
  @ViewChild(PoModalComponent, { static: true }) poModal!: PoModalComponent;
  // INJECTABLES
    private clientesService: ClientesService = inject(ClientesService);
    private poNotification: PoNotificationService = inject(PoNotificationService);
  //VARIABLES
    public clientes: Array<Cliente> = [];
    public loading: boolean = false;
    public details: any;
    public modaltype: Modal = {
      title: '',
      buttons: [],
      type: ''
    };

    public columns: PoTableColumn[] = [
      { property: 'nome', label: 'Nome', width: '25%', sortable: true },
      { property: 'email', label: 'E-mail', width: '15%', sortable: false},
      { property: 'endereco', label: 'Endereço', width: '25%', sortable: false },
      { property: 'telefone', label: 'Telefone', width: '10%', sortable: false },
      { property: 'cpf', label: 'CPF', width: '10%', sortable: false },
      { property: 'dataCadastro', label: 'Data de cadastro', width: '10%', sortable: false },
    ]

    public actions: Array<PoTableAction> = [
      { action: this.remove.bind(this), icon: 'po-icon an an-trash', label: 'Excluir' },
      { action: this.edit.bind(this), icon: 'po-icon an an-edit', label: 'Editar' },
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

  public editarCliente(cliente: any) {
    this.clientesService.atualizarCliente(cliente.id, cliente).then(() => {
      this.poModal.close();
      this.poNotification.success('Cliente atualizado com sucesso');
      this.listarClientes();
    }).catch((error) => {
      this.poNotification.error('Erro ao atualizar cliente');
      console.error(error);
    });
  }

  remove(item: { [key: string]: any }) {
    this.modaltype = { title: 'Excluir cliente', type: 'delete', buttons: [{ label: 'Excluir', action: this.deletarCliente.bind(this) }] };
    this.details = item;
    this.poModal.open();
  }

  edit(item: { [key: string]: any }) {
    this.modaltype = { title: 'Editar cliente', type: 'edit', buttons: [{ label: 'Salvar', action: this.editarCliente.bind(this) }] };
    this.details = item;
    this.poModal.open();
  }
}

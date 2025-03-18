import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PoButtonModule, PoDynamicFormField, PoDynamicModule, PoNotificationService } from '@po-ui/ng-components';
import { ClientesService } from '../../core/services/clientes/clientes.service';
import { Cliente } from '../../models/clientes';

@Component({
  selector: 'app-cadastrar-clientes',
  standalone: true,
  imports: [PoDynamicModule, PoButtonModule],
  templateUrl: './cadastrar-clientes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PoDynamicModule]
})
export class CadastrarClientesComponent {
  @ViewChild('dynamicForm') dynamicForm!: any;
  @Input() person: Cliente = {
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    dataCadastro: new Date().toLocaleDateString('pt-BR'),
  }
  @Input() salvarEditar: boolean = false
  @Output() editarEmitter: EventEmitter<any> = new EventEmitter();
  constructor(
    public poNotification: PoNotificationService,
    private clientesService: ClientesService
  ) {}
  validateFields: Array<string> = ['state'];

  fields: Array<PoDynamicFormField> = [
    {
      property: 'nome',
      divider: ('Informe os dados cadastrais do cliente').toUpperCase(),
      required: true,
      minLength: 4,
      maxLength: 50,
      gridColumns: 6,
      gridSmColumns: 12,
      order: 1,
      placeholder: 'Insira o nome do cliente',
      label: 'Nome',
    },
    { property: 'cpf', gridColumns: 6, label: 'CPF', mask: '999.999.999-99' },
    { property: 'email', divider: 'Contatos', gridColumns: 6, icon: 'an an-envelope', label: 'E-mail' },
    { property: 'telefone', mask: '(99) 99999-9999', gridColumns: 6, label: 'Telefone' },
    { property: 'endereco', gridColumns: 6, label: 'Endereço' },
  ];



  cadastrarCliente() {
    this.clientesService.adicionarCliente(this.person).then((res) => {
      this.poNotification.success('Cliente cadastrado com sucesso');
      this.dynamicForm.form.reset();
    }).catch((error) => {
      this.poNotification.error('Erro ao cadastrar cliente');
      console.error(error);
    })
  }

  editarCliente() {
    this.editarEmitter.emit(this.person);
  }
}

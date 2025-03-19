import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PoDividerModule, PoTableAction, PoTableColumn, PoTableModule } from '@po-ui/ng-components';
import { ProdutosService } from '../../core/services/produtos/produtos.service';
import { Produto } from '../../models/produtos';

@Component({
  selector: 'app-listar-produtos',
  standalone: true,
  imports: [PoTableModule, PoDividerModule],
  templateUrl: './listar-produtos.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ListarProdutosComponent {
  //INJECTABLES
  private produtosService: ProdutosService = inject(ProdutosService);
  //VARIABLES
  public produtos: Produto[] = [];
  public loading: boolean = false;
  public columns: PoTableColumn[] = [
    { property: 'codigo', label: 'Código', width: '25%', sortable: true },
    { property: 'nome', label: 'Nome', width: '25%', sortable: true },
    { property: 'categoria', label: 'Categoria', width: '15%', sortable: false},
    { property: 'descricao', label: 'Descrição', width: '25%', sortable: false },
    { property: 'quantidadeEstoque', label: 'Quantidade', width: '10%', sortable: true },
    { property: 'preco', label: 'Preço', width: '10%', sortable: true },
    { property: 'total', label: 'Total', width: '10%', sortable: true },
    { property: 'dataCadastro', label: 'Data de cadastro', width: '10%', sortable: false }
  ]
  public actions: Array<PoTableAction> = [
    { action: this.remove.bind(this), icon: 'po-icon an an-trash', label: 'Excluir' },
    { action: this.edit.bind(this), icon: 'po-icon an an-edit', label: 'Editar' },
  ];

  ngOnInit() {
    this.listarProdutos();
  }

  listarProdutos() {
    this.loading = true;
    this.produtosService.listarProdutos().subscribe((data) => {
      this.produtos = data.map((e: any) => {
        this.loading = false;
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data(),
          preco: e.payload.doc.data().preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          total: (e.payload.doc.data().quantidadeEstoque * e.payload.doc.data().preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        }
      })
    })
  }

  remove(item: { [key: string]: any }) {
    // this.modaltype = { title: 'Excluir cliente', type: 'delete', buttons: [{ label: 'Excluir', action: this.deletarCliente.bind(this) }] };
    // this.details = item;
    // this.poModal.open();
  }

  edit(item: { [key: string]: any }) {
    // this.modaltype = { title: 'Editar cliente', type: 'edit', buttons: [{ label: 'Salvar', action: this.editarCliente.bind(this) }] };
    // this.details = item;
    // this.poModal.open();
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Produto } from '../../../models/produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  constructor(private firestore: AngularFirestore) {}
  adicionarProduto(produto: Produto) {
    return this.firestore.collection('produtos').add(produto);
  }

  listarProdutos() {
    return this.firestore.collection('produtos').snapshotChanges();
  }

  atualizarProdutos(produtoId: string, dados: Partial<Produto>) {
    return this.firestore.collection('produtos').doc(produtoId).update(dados);
  }


  excluirProduto(produtoId: string) {
    return this.firestore.collection('produtos').doc(produtoId).delete();
  }

}

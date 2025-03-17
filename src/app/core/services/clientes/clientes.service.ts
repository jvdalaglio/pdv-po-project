import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  constructor(private firestore: AngularFirestore) {}
  adicionarCliente(cliente: any) {
    return this.firestore.collection('clientes').add(cliente);
  }

  listarClientes() {
    return this.firestore.collection('clientes').stateChanges();
  }

  atualizarCliente(clienteId: string, dados: any) {
    return this.firestore.collection('clientes').doc(clienteId).update(dados);
  }


  excluirCliente(clienteId: string) {
    return this.firestore.collection('clientes').doc(clienteId).delete();
  }

}

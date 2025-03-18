import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cliente } from '../../../models/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  constructor(private firestore: AngularFirestore) {}
  adicionarCliente(cliente: Cliente) {
    return this.firestore.collection('clientes').add(cliente);
  }

  listarClientes() {
    return this.firestore.collection('clientes').snapshotChanges();
  }

  atualizarCliente(clienteId: string, dados: Partial<Cliente>) {
    return this.firestore.collection('clientes').doc(clienteId).update(dados);
  }


  excluirCliente(clienteId: string) {
    return this.firestore.collection('clientes').doc(clienteId).delete();
  }

}

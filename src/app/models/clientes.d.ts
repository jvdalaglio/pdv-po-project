import { Timestamp } from "rxjs";

export interface Cliente {
  dataCadastro: Timestamp;
  email: string;
  id?: string;
  nome: string;
  telefone: string;
  endereco: string;
}

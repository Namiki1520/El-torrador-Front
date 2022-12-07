import { IProduto } from "../produto/produto.model";

export interface IPedido {
  id: number;
  customerCpf: string;
  customerName: string;
  product: IProduto;
  quantity: number;
  orderValue: number;
  requestDate: Date;
  currentStatus: number;
}

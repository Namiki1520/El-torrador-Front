import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPedido } from './pedido/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private api: string = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) {}

  public cadastrarPedido(novoPedido: IPedido): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.api}/order`, novoPedido);
  }

  public buscarPedidos(): Observable<IPedido[]> {
    return this.httpClient.get<IPedido[]>(`${this.api}/order`);
  }

  public deletarPedido(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.api}/order/${id}` );
  }

  public buscarPedidoPorId(id:number): Observable<IPedido> {
    return this.httpClient.get<IPedido>(`${this.api}/order/${id}`);
  }

  public alterarStatus(pedido: IPedido): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${this.api}/order?id=${pedido.id}&status=${pedido.currentStatus}`,pedido.id);
  }
}

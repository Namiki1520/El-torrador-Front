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
}

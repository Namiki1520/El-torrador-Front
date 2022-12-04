import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduto } from './produto/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private api: string = 'http://localhost:5000';

  constructor(private httpClient: HttpClient) {}

  public cadastrarProduto(novoProduto: IProduto): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.api}/product`, novoProduto);
  }

  public buscarProdutos(): Observable<IProduto[]> {
    return this.httpClient.get<IProduto[]>(`${this.api}/product`);
  }

  public buscarProdutosAtivos(): Observable<IProduto[]> {
    return this.httpClient.get<IProduto[]>(`${this.api}/product/active`);
  }

  public editarProduto(ProdutoEditado: IProduto): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.api}/product`, ProdutoEditado);
  }

  public buscarProdutosPorId(id: number): Observable<IProduto> {
    return this.httpClient.get<IProduto>(`${this.api}/product/${id}`);
  }

  public ativarDesativarProduto(produto: IProduto): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${this.api}/product/active`, produto);
  }

  public editarEstoque(produtoEditado: IProduto): Observable<boolean> {
    return this.httpClient.patch<boolean>(`${this.api}/product`, produtoEditado);
  }
}

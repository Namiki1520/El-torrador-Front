import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ProdutoService } from '../../produto.service';
import { IProduto } from '../produto.model';

@Component({
  selector: 'app-gerenciar-produto',
  templateUrl: './gerenciar-produto.component.html',
  styleUrls: ['./gerenciar-produto.component.css'],
})
export class GerenciarProdutoComponent implements OnInit {
  public produtos: IProduto[] = [];

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    this.produtoService
      .buscarProdutos()
      .pipe(take(1))
      .subscribe((dados: IProduto[]) => {
        this.produtos = dados;
      });
  };

  public estoque(id: number) {
    this.router.navigate(['/produto/estoque', id]);
  };

  public editar(id:number){
    this.router.navigate(['/produto/editar', id]);
  };

  public desativar(produto: IProduto) {
    if (produto.active) {
      if (confirm(`Você deseja desativar o produto ${produto.description}?`)) {
        produto.active = false;
        this.produtoService
          .ativarDesativarProduto(produto)
          .pipe(take(1))
          .subscribe(() => {
            alert(`${produto.description} foi desativado!`);
          });
      }
    } 
    else {
      if (confirm(`Você deseja ativar o produto ${produto.description}?`)) {
        produto.active = true;
        this.produtoService
          .ativarDesativarProduto(produto)
          .pipe(take(1))
          .subscribe(() => {
            alert(`${produto.description} foi ativado!`);
          });
      }
    }
  };
}

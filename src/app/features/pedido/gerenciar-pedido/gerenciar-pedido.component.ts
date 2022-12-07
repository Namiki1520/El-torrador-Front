import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { PedidoService } from '../../pedido.service';
import { IPedido } from '../pedido.model';

@Component({
  selector: 'app-gerenciar-pedido',
  templateUrl: './gerenciar-pedido.component.html',
  styleUrls: ['./gerenciar-pedido.component.css'],
})
@Input()
export class GerenciarPedidoComponent implements OnInit {
  public pedidos: IPedido[] = [];

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit(): void {
    this.pedidoService
      .buscarPedidos()
      .pipe(take(1))
      .subscribe((dados: IPedido[]) => {
        this.pedidos = dados;
      });
  }

  public alterarStatus(id: number) {
    this.router.navigate(['/pedido/status', id]);
  }

  public acompanhar(id: number) {
    this.router.navigate(['/pedido/acompanhar', id]);
  }

  public deletar(id: number) {
    if (confirm(`Você deseja deletar o pedido ${id}?`)) {
      this.pedidoService
        .deletarPedido(id)
        .pipe(take(1))
        .subscribe(() => {
          alert(`O pedido ${id} foi ativado!`);
        });
    }
    location.reload();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { PedidoService } from '../../pedido.service';
import { IPedido } from '../pedido.model';

@Component({
  selector: 'app-gerenciar-pedido',
  templateUrl: './gerenciar-pedido.component.html',
  styleUrls: ['./gerenciar-pedido.component.css']
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
        console.table(this.pedidos)
      });
  }

  // public editar(id: number) {
  //   this.router.navigate(['/cliente/editar', id]);
  // }

  // public deletar(cpfCLiente: string) {
  //   this.clienteService
  //     .deleteCliente(cpfCLiente)
  //     .pipe(take(1))
  //     .subscribe(() => {
  //       alert(`O cliente com CPF: ${cpfCLiente} foi deletado com sucesso!`);
  //     });
  // }
}


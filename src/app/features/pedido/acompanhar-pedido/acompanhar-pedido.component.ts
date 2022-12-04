import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { PedidoService } from '../../pedido.service';
import { IPedido } from '../pedido.model';

@Component({
  selector: 'app-acompanhar-pedido',
  templateUrl: './acompanhar-pedido.component.html',
  styleUrls: ['./acompanhar-pedido.component.css'],
})
export class AcompanharPedidoComponent implements OnInit {
  public id = 0;
  public pedido: IPedido = {} as IPedido;
  constructor(
    private pedidoService: PedidoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.pedidoService
      .buscarPedidoPorId(this.id)
      .pipe(take(1))
      .subscribe((dados: IPedido) => {
        this.pedido = dados;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { PedidoService } from '../../pedido.service';
import { IPedido } from '../pedido.model';

@Component({
  selector: 'app-status-pedido',
  templateUrl: './status-pedido.component.html',
  styleUrls: ['./status-pedido.component.css'],
})
export class StatusPedidoComponent implements OnInit {
  public id = 0;
  public pedido: IPedido = {} as IPedido;
  public form!: FormGroup;
  constructor(
    private pedidoService: PedidoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      currentStatus: new FormControl(null, [Validators.required]),
    });

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

  public alterarStatus() {
    const pedido: IPedido = {
      id: this.pedido.id,
      customerCpf: this.pedido.customerCpf,
      customerName: this.pedido.customerName,
      product: this.pedido.product,
      quantity: this.pedido.quantity,
      orderValue: this.pedido.orderValue,
      requestDate: this.pedido.requestDate,
      currentStatus: this.form.get('currentStatus')?.value,
    };
    if(this.pedido.currentStatus != 2)
    {
      this.pedidoService
      .alterarStatus(pedido)
      .pipe(take(1))
      .subscribe(() => {
        alert('O status foi alterado!');
        this.router.navigate(['/pedido/gerenciar']);
      });
    }else{
      alert('Pedidos Finalizados não podem ser alterados ou excluídos!');
        this.router.navigate(['/pedido/gerenciar']);
    }
    
  }
}

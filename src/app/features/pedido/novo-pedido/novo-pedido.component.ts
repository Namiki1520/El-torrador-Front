import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { PedidoService } from '../../pedido.service';
import { ProdutoService } from '../../produto.service';
import { IProduto } from '../../produto/produto.model';
import { IPedido } from '../pedido.model';

@Component({
  selector: 'app-novo-pedido',
  templateUrl: './novo-pedido.component.html',
  styleUrls: ['./novo-pedido.component.css'],
})
export class NovoPedidoComponent implements OnInit {
  public form!: FormGroup;
  public produtos: IProduto[] = [];
  public produto: IProduto = {} as IProduto;
  constructor(
    private pedidoService: PedidoService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      customerCpf: new FormControl(null),
      product: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
    });

    this.produtoService
      .buscarProdutosAtivos()
      .pipe(take(1))
      .subscribe((dados: IProduto[]) => {
        this.produtos = dados;
      });
  }

  public salvar(): void {
    this.produtoService
      .buscarProdutosPorId(this.form.get('product')?.value)
      .pipe(take(1))
      .subscribe((dados: IProduto) => {
        this.produto = dados;
      });

    const novoPedido: IPedido = {
      id: 0,
      customerCpf: this.form.get('customerCpf')?.value,
      customerName: '',
      product: this.produto,
      quantity: this.form.get('quantity')?.value,
      orderValue: 0,
      requestDate: new Date(),
      currentStatus: 0,
    };

    console.log(novoPedido);
    this.pedidoService
      .cadastrarPedido(novoPedido)
      .pipe(take(1))
      .subscribe(() => {
        alert('Pedido cadastrado com sucesso!');
      });
  }

  public limpar() {
    this.form.reset();
  }
}

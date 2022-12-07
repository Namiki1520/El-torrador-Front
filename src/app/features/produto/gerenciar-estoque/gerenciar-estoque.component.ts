import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ProdutoService } from '../../produto.service';
import { IProduto } from '../produto.model';

@Component({
  selector: 'app-gerenciar-estoque',
  templateUrl: './gerenciar-estoque.component.html',
  styleUrls: ['./gerenciar-estoque.component.css'],
})
export class GerenciarEstoqueComponent implements OnInit {
  public produto: IProduto = {} as IProduto;
  public form!: FormGroup;
  public id: number = 0;
  constructor(
    private service: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      quantityInStock: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.pattern("[0-9]{11}")
      ]),
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.service
      .buscarProdutosPorId(this.id)
      .pipe(take(1))
      .subscribe((dados: IProduto) => {
        this.produto = dados;
        this.produto.expirationDate = new Date(this.produto.expirationDate);
      });
  }
  public salvar(): void {
    if (this.form.valid) {
      const produtoEstoque: IProduto = {
        id: this.produto.id,
        description: this.produto.description,
        price: this.produto.price,
        expirationDate: this.produto.expirationDate,
        quantityInStock: this.form.get('quantityInStock')?.value,
        active: this.produto.active,
      };

      this.service
        .editarEstoque(produtoEstoque)
        .pipe(take(1))
        .subscribe(() => {
          alert('Produto alterado com sucesso!');
        });
        this.router.navigate(['/produto/gerenciar'])
    }
  }

  public limpar() {
    this.form.reset();
  }
}

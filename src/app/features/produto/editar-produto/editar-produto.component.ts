import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ProdutoService } from '../../produto.service';
import { IProduto } from '../produto.model';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css'],
})
export class EditarProdutoComponent implements OnInit {
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
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      price: new FormControl(null, [Validators.required, Validators.min(1)]),
      expirationDate: new FormControl(null, [Validators.required]),
    });

    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.service
      .buscarProdutosPorId(this.id)
      .pipe(take(1))
      .subscribe((dados: IProduto) => {
        this.produto = dados;
      });
  }
  public editar(): void {
    if (this.form.valid) {
      const produtoEditado: IProduto = {
        id: this.produto.id,
        description: this.form.get('description')?.value,
        price: this.form.get('price')?.value,
        expirationDate: this.form.get('expirationDate')?.value,
        quantityInStock: this.produto.quantityInStock,
        active: this.produto.active,
      };

      this.service
        .editarProduto(produtoEditado)
        .pipe(take(1))
        .subscribe(() => {
          alert('Produto alterado com sucesso!');
        });
      this.router.navigate(['/produto/gerenciar']);
    }
  }

  public limpar() {
    this.form.reset();
  }
}

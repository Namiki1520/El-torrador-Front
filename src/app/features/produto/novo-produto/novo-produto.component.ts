import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ProdutoService } from '../../produto.service';
import { IProduto } from '../produto.model';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.css']
})
export class NovoProdutoComponent implements OnInit {
  public form!: FormGroup;
  public dataAtual:Date = new Date();
  constructor(private produtoService: ProdutoService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      description: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      price: new FormControl(null, [Validators.required, Validators.min(1), Validators.pattern("[0-9]{11}")]),
      expirationDate: new FormControl(null, [Validators.required])
    });
  };

  public salvar(){
    if(this.form.valid){
      const novoProduto: IProduto = {
        id:0,
        description: this.form.get('description')?.value,
        price: this.form.get('price')?.value,
        expirationDate: this.form.get('expirationDate')?.value,
        quantityInStock: 0,
        active: true
      };
      
      this.produtoService.cadastrarProduto(novoProduto)
      .pipe(take(1)).subscribe(() => {
        alert('Produto cadastrado com sucesso!')
        this.router.navigate(['/produto/gerenciar']);
      });
    };
  };

  public limpar(){
    this.form.reset();
  };
}

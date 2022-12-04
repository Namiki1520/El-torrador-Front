import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      descricao: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      preco: new FormControl(null, [Validators.required, Validators.min(1)]),
      dataVencimento: new FormControl(null, [Validators.required])
    })
  }
  public salvar(){
    if(this.form.valid){
      const novoProduto: IProduto = {
        id:0,
        description: this.form.get('descricao')?.value,
        price: this.form.get('preco')?.value,
        expirationDate: this.form.get('dataVencimento')?.value,
        quantityInStock: 0,
        active: true
      }
      this.produtoService.cadastrarProduto(novoProduto)
      .pipe(take(1)).subscribe(() => {
        alert('Produto cadastrado com sucesso!')
      })
    }
  };

  public limpar(){
    this.form.reset();
  }
}

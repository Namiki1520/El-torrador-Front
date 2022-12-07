import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ClienteService } from '../../cliente.service';
import { ICliente } from '../cliente.model';

@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrls: ['./novo-cliente.component.css'],
})
export class NovoClienteComponent implements OnInit {
  public form!: FormGroup;
  public dataAtual: Date = new Date();
  constructor(private service: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      cpf: new FormControl(null, [
        Validators.required,
        Validators.pattern("[0-9]{11}")
      ]),
      birthDate: new FormControl(null, [Validators.required]),
    });
  }
  public salvar(): void {
    if (this.form.valid) {
      const novoCliente: ICliente = {
        id: 0,
        name: this.form.get('name')?.value,
        cpf: this.form.get('cpf')?.value,
        birthDate: this.form.get('birthDate')?.value,
        fidelityPoints: 0,
      };

      this.service
        .cadastrarCliente(novoCliente)
        .pipe(take(1))
        .subscribe(() => {
          alert('Cliente cadastrado com sucesso!');
          this.router.navigate(['/cliente/gerenciar']);
        });
    }
  }

  public limpar() {
    this.form.reset();
  }
}

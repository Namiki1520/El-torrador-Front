import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private service: ClienteService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      cpf: new FormControl(null, [Validators.required, Validators.min(11)]),
      dataNascimento: new FormControl(null, [Validators.required]),
    });
  }
  public salvar(): void {
    if (this.form.valid) {
      const novoCliente: ICliente = {
        id: 0,
        name: this.form.get('nome')?.value,
        cpf: this.form.get('cpf')?.value,
        birthDate: this.form.get('dataNascimento')?.value,
        fidelityPoints: 0,
      };

      this.service
        .cadastrarCliente(novoCliente)
        .pipe(take(1))
        .subscribe(() => {
          alert('Cliente cadastrado com sucesso!');
        });
    }
  }

  public limpar() {
    this.form.reset();
  }
}

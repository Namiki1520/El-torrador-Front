import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ClienteService } from '../../cliente.service';
import { ICliente } from '../cliente.model';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  public cliente: ICliente= {} as ICliente;
  public form!: FormGroup;
  public id:number = 0;
  constructor(private service: ClienteService,private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      cpf: new FormControl(null, [
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11),
        Validators.pattern("[0-9]{11}")
      ]),
      birthDate: new FormControl(null, [Validators.required]),
    });

    this.route.params.subscribe(params =>{
      this.id = params['id'];
    });
    
    this.service.buscarClientesPorId(this.id)
    .pipe(take(1)).subscribe((dados: ICliente)=>{
      this.cliente = dados;
    })
    

  }
  public editar(): void {
    if (this.form.valid) {
      const clienteEditado: ICliente = {
        id:this.cliente.id,
        name: this.form.get('name')?.value,
        cpf: this.form.get('cpf')?.value,
        birthDate: this.form.get('birthDate')?.value,
        fidelityPoints: this.cliente.fidelityPoints,
      };

      this.service
        .editarCLiente(clienteEditado)
        .pipe(take(1))
        .subscribe(() => {
          alert('Cliente alterado com sucesso!');
        });
        location.reload();
    }
  }

  public limpar() {
    this.form.reset();
  }

}

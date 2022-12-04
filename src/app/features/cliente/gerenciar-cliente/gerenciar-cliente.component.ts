import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { ClienteService } from '../../cliente.service';
import { ICliente } from '../cliente.model';

@Component({
  selector: 'app-gerenciar-cliente',
  templateUrl: './gerenciar-cliente.component.html',
  styleUrls: ['./gerenciar-cliente.component.css'],
})
export class GerenciarClienteComponent implements OnInit {
  public clientes: ICliente[] = [];

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.clienteService
      .buscarClientes()
      .pipe(take(1))
      .subscribe((dados: ICliente[]) => {
        this.clientes = dados;
      });
  }

  public editar(id: number) {
    this.router.navigate(['/cliente/editar', id]);
  }

  public deletar(cpfCLiente: string) {
    this.clienteService
      .deleteCliente(cpfCLiente)
      .pipe(take(1))
      .subscribe(() => {
        alert(`O cliente com CPF: ${cpfCLiente} foi deletado com sucesso!`);
      });
      location.reload();
  }
}

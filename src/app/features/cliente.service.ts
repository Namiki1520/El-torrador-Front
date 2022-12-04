import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICliente } from "./cliente/cliente.model";

@Injectable({
  providedIn: "root",
})
export class ClienteService {
  private api: string = "http://localhost:5000";

  constructor(private httpClient: HttpClient) {}

  public cadastrarCliente(novoCliente: ICliente): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.api}/customer`, novoCliente);
  }

  public buscarClientes(): Observable<ICliente[]> {
    return this.httpClient.get<ICliente[]>(`${this.api}/customer`);
  }

  public editarCLiente(clienteEditado: ICliente): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.api}/customer`, clienteEditado);
  }

  public buscarClientesPorId(id: number): Observable<ICliente> {
    return this.httpClient.get<ICliente>(`${this.api}/customer/${id}`);
  }

  public deleteCliente(cpfCliente: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.api}/customer/${cpfCliente}` );
  }
}

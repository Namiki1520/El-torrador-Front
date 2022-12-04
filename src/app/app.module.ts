import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteService } from './features/cliente.service';
import { NovoClienteComponent } from './features/cliente/novo-cliente/novo-cliente.component';
import { GerenciarClienteComponent } from './features/cliente/gerenciar-cliente/gerenciar-cliente.component';
import { EditarClienteComponent } from './features/cliente/editar-cliente/editar-cliente.component';
import { NovoProdutoComponent } from './features/produto/novo-produto/novo-produto.component';
import { ProdutoService } from './features/produto.service';
import { GerenciarProdutoComponent } from './features/produto/gerenciar-produto/gerenciar-produto.component';
import { GerenciarEstoqueComponent } from './features/produto/gerenciar-estoque/gerenciar-estoque.component';
import { EditarProdutoComponent } from './features/produto/editar-produto/editar-produto.component';
import { GerenciarPedidoComponent } from './features/pedido/gerenciar-pedido/gerenciar-pedido.component';
import { NovoPedidoComponent } from './features/pedido/novo-pedido/novo-pedido.component';
import { PedidoService } from './features/pedido.service';
import { StatusPedidoComponent } from './features/pedido/status-pedido/status-pedido.component';
import { AcompanharPedidoComponent } from './features/pedido/acompanhar-pedido/acompanhar-pedido.component';

@NgModule({
  declarations: [
    AppComponent,
    NovoClienteComponent,
    GerenciarClienteComponent,
    EditarClienteComponent,
    NovoProdutoComponent,
    GerenciarProdutoComponent,
    GerenciarEstoqueComponent,
    EditarProdutoComponent,
    GerenciarPedidoComponent,
    NovoPedidoComponent,
    StatusPedidoComponent,
    AcompanharPedidoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    ClienteService,
    ProdutoService,
    PedidoService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

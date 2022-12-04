import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { EditarClienteComponent } from './features/cliente/editar-cliente/editar-cliente.component';
import { GerenciarClienteComponent } from './features/cliente/gerenciar-cliente/gerenciar-cliente.component';
import { NovoClienteComponent } from './features/cliente/novo-cliente/novo-cliente.component';
import { AcompanharPedidoComponent } from './features/pedido/acompanhar-pedido/acompanhar-pedido.component';
import { GerenciarPedidoComponent } from './features/pedido/gerenciar-pedido/gerenciar-pedido.component';
import { NovoPedidoComponent } from './features/pedido/novo-pedido/novo-pedido.component';
import { StatusPedidoComponent } from './features/pedido/status-pedido/status-pedido.component';
import { EditarProdutoComponent } from './features/produto/editar-produto/editar-produto.component';
import { GerenciarEstoqueComponent } from './features/produto/gerenciar-estoque/gerenciar-estoque.component';
import { GerenciarProdutoComponent } from './features/produto/gerenciar-produto/gerenciar-produto.component';
import { NovoProdutoComponent } from './features/produto/novo-produto/novo-produto.component';

const routes: Routes = [
  {
    path: 'cliente',
    children: [
      {
        path: 'cadastrar',
        component: NovoClienteComponent
      },
      {
        path: 'gerenciar',
        component: GerenciarClienteComponent
      },
      {
        path: 'editar/:id',
        component: EditarClienteComponent
      }
    ]
},
{
  path: 'produto',
  children: [
    {
      path: 'cadastrar',
      component: NovoProdutoComponent
    },
    {
      path: 'gerenciar',
      component: GerenciarProdutoComponent
    },
    {
      path: 'estoque/:id',
      component: GerenciarEstoqueComponent
    },
    {
      path: 'editar/:id',
      component: EditarProdutoComponent
    }
  ]
},
{
  path: 'pedido',
  children:[
    {
      path: 'cadastrar',
      component: NovoPedidoComponent
    },
    {
      path: 'gerenciar',
      component: GerenciarPedidoComponent
    },
    {
      path: 'status/:id',
      component: StatusPedidoComponent
    },
    {
      path: 'acompanhar/:id',
      component: AcompanharPedidoComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

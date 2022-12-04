import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarPedidoComponent } from './gerenciar-pedido.component';

describe('GerenciarPedidoComponent', () => {
  let component: GerenciarPedidoComponent;
  let fixture: ComponentFixture<GerenciarPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciarPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

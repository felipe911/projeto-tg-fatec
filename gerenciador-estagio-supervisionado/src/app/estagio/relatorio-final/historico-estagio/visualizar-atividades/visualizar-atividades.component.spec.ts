import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAtividadesComponent } from './visualizar-atividades.component';

describe('VisualizarAtividadesComponent', () => {
  let component: VisualizarAtividadesComponent;
  let fixture: ComponentFixture<VisualizarAtividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarAtividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarAtividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

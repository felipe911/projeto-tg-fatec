import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarDadosEmpresaComponent } from './visualizar-dados-empresa.component';

describe('VisualizarDadosEmpresaComponent', () => {
  let component: VisualizarDadosEmpresaComponent;
  let fixture: ComponentFixture<VisualizarDadosEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarDadosEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarDadosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

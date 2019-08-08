import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasConsultaComponent } from './empresas-consulta.component';

describe('EmpresasConsultaComponent', () => {
  let component: EmpresasConsultaComponent;
  let fixture: ComponentFixture<EmpresasConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresasConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

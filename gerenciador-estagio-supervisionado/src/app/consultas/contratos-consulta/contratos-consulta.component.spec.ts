import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosConsultaComponent } from './contratos-consulta.component';

describe('ContratosConsultaComponent', () => {
  let component: ContratosConsultaComponent;
  let fixture: ComponentFixture<ContratosConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratosConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

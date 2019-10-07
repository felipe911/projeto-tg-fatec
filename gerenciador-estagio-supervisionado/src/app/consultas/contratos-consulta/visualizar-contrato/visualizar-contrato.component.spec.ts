import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarContratoComponent } from './visualizar-contrato.component';

describe('VisualizarContratoComponent', () => {
  let component: VisualizarContratoComponent;
  let fixture: ComponentFixture<VisualizarContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

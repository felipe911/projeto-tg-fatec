import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarEstagiariosEmpresaComponent } from './visualizar-estagiarios-empresa.component';

describe('VisualizarEstagiariosEmpresaComponent', () => {
  let component: VisualizarEstagiariosEmpresaComponent;
  let fixture: ComponentFixture<VisualizarEstagiariosEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarEstagiariosEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarEstagiariosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

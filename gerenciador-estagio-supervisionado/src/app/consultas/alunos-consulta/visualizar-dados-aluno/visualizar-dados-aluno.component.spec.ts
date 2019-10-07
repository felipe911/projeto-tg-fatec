import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarDadosAlunoComponent } from './visualizar-dados-aluno.component';

describe('VisualizarDadosAlunoComponent', () => {
  let component: VisualizarDadosAlunoComponent;
  let fixture: ComponentFixture<VisualizarDadosAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarDadosAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarDadosAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

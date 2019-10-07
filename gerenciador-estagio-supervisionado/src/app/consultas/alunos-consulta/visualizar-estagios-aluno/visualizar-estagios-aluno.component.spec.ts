import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarEstagiosAlunoComponent } from './visualizar-estagios-aluno.component';

describe('VisualizarEstagiosAlunoComponent', () => {
  let component: VisualizarEstagiosAlunoComponent;
  let fixture: ComponentFixture<VisualizarEstagiosAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarEstagiosAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarEstagiosAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

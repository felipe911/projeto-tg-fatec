import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioPesquisaAlunoComponent } from './relatorio-pesquisa-aluno.component';

describe('RelatorioPesquisaAlunoComponent', () => {
  let component: RelatorioPesquisaAlunoComponent;
  let fixture: ComponentFixture<RelatorioPesquisaAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioPesquisaAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioPesquisaAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

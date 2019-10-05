import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoGerenciamentoComponent } from './aluno-gerenciamento.component';

describe('AlunoGerenciamentoComponent', () => {
  let component: AlunoGerenciamentoComponent;
  let fixture: ComponentFixture<AlunoGerenciamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunoGerenciamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoGerenciamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

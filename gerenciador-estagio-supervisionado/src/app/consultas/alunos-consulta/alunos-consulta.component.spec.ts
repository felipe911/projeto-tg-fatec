import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosConsultaComponent } from './alunos-consulta.component';

describe('AlunosConsultaComponent', () => {
  let component: AlunosConsultaComponent;
  let fixture: ComponentFixture<AlunosConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunosConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunosConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

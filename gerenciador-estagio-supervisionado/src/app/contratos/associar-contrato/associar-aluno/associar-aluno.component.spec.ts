import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarAlunoComponent } from './associar-aluno.component';

describe('AssociarAlunoComponent', () => {
  let component: AssociarAlunoComponent;
  let fixture: ComponentFixture<AssociarAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociarAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociarAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

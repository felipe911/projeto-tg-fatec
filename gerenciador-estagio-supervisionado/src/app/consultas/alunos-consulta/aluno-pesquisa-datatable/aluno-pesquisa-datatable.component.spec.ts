import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoPesquisaDatatableComponent } from './aluno-pesquisa-datatable.component';

describe('AlunoPesquisaDatatableComponent', () => {
  let component: AlunoPesquisaDatatableComponent;
  let fixture: ComponentFixture<AlunoPesquisaDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlunoPesquisaDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlunoPesquisaDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

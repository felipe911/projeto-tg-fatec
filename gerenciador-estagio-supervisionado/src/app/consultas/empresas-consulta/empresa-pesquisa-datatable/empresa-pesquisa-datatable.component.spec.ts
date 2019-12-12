import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaPesquisaDatatableComponent } from './empresa-pesquisa-datatable.component';

describe('EmpresaPesquisaDatatableComponent', () => {
  let component: EmpresaPesquisaDatatableComponent;
  let fixture: ComponentFixture<EmpresaPesquisaDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaPesquisaDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaPesquisaDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

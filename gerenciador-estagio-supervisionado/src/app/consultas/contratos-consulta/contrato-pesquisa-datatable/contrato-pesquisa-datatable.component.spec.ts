import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoPesquisaDatatableComponent } from './contrato-pesquisa-datatable.component';

describe('ContratoPesquisaDatatableComponent', () => {
  let component: ContratoPesquisaDatatableComponent;
  let fixture: ComponentFixture<ContratoPesquisaDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoPesquisaDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoPesquisaDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

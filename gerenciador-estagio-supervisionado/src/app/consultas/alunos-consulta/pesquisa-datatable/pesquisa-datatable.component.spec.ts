import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaDatatableComponent } from './pesquisa-datatable.component';

describe('PesquisaDatatableComponent', () => {
  let component: PesquisaDatatableComponent;
  let fixture: ComponentFixture<PesquisaDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

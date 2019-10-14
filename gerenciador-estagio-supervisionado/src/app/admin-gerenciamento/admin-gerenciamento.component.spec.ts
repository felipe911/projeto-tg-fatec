import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGerenciamentoComponent } from './admin-gerenciamento.component';

describe('AdminGerenciamentoComponent', () => {
  let component: AdminGerenciamentoComponent;
  let fixture: ComponentFixture<AdminGerenciamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGerenciamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGerenciamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

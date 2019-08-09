import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioAdicionarComponent } from './relatorio-adicionar.component';

describe('RelatorioAdicionarComponent', () => {
  let component: RelatorioAdicionarComponent;
  let fixture: ComponentFixture<RelatorioAdicionarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioAdicionarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioAdicionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioExibicaoComponent } from './relatorio-exibicao.component';

describe('RelatorioExibicaoComponent', () => {
  let component: RelatorioExibicaoComponent;
  let fixture: ComponentFixture<RelatorioExibicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioExibicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioExibicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

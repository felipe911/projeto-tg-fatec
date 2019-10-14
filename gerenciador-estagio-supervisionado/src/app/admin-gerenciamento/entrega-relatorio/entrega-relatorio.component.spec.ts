import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaRelatorioComponent } from './entrega-relatorio.component';

describe('EntregaRelatorioComponent', () => {
  let component: EntregaRelatorioComponent;
  let fixture: ComponentFixture<EntregaRelatorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregaRelatorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

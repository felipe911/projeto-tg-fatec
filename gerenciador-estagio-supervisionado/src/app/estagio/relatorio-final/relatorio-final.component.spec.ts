import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioFinalComponent } from './relatorio-final.component';

describe('RelatorioFinalComponent', () => {
  let component: RelatorioFinalComponent;
  let fixture: ComponentFixture<RelatorioFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

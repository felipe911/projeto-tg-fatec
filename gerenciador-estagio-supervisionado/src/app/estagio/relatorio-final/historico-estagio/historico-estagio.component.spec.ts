import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoEstagioComponent } from './historico-estagio.component';

describe('HistoricoEstagioComponent', () => {
  let component: HistoricoEstagioComponent;
  let fixture: ComponentFixture<HistoricoEstagioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoEstagioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoEstagioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

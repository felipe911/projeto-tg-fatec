import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatoriosConsultaComponent } from './relatorios-consulta.component';

describe('RelatoriosConsultaComponent', () => {
  let component: RelatoriosConsultaComponent;
  let fixture: ComponentFixture<RelatoriosConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatoriosConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatoriosConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

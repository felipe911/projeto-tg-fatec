import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarContratoEstagioComponent } from './associar-contrato-estagio.component';

describe('AssociarContratoEstagioComponent', () => {
  let component: AssociarContratoEstagioComponent;
  let fixture: ComponentFixture<AssociarContratoEstagioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociarContratoEstagioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociarContratoEstagioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

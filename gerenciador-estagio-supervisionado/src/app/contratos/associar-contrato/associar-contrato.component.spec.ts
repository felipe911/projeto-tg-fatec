import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarContratoComponent } from './associar-contrato.component';

describe('AssociarContratoComponent', () => {
  let component: AssociarContratoComponent;
  let fixture: ComponentFixture<AssociarContratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociarContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociarContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

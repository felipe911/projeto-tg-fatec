import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarEmpresaComponent } from './associar-empresa.component';

describe('AssociarEmpresaComponent', () => {
  let component: AssociarEmpresaComponent;
  let fixture: ComponentFixture<AssociarEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociarEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociarEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

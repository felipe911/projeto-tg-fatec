import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarRegistroEstagioComponent } from './adicionar-registro-estagio.component';

describe('AdicionarRegistroEstagioComponent', () => {
  let component: AdicionarRegistroEstagioComponent;
  let fixture: ComponentFixture<AdicionarRegistroEstagioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarRegistroEstagioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarRegistroEstagioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

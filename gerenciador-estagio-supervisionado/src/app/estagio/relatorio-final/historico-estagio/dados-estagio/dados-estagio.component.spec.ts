import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosEstagioComponent } from './dados-estagio.component';

describe('DadosEstagioComponent', () => {
  let component: DadosEstagioComponent;
  let fixture: ComponentFixture<DadosEstagioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DadosEstagioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DadosEstagioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

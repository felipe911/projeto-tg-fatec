import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioParcialComponent } from './relatorio-parcial.component';

describe('RelatorioParcialComponent', () => {
  let component: RelatorioParcialComponent;
  let fixture: ComponentFixture<RelatorioParcialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioParcialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioParcialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

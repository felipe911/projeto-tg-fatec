import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAtividadeComponent } from './tipo-atividade.component';

describe('TipoAtividadeComponent', () => {
  let component: TipoAtividadeComponent;
  let fixture: ComponentFixture<TipoAtividadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoAtividadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

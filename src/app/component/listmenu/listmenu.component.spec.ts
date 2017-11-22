import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmenuComponent } from './listmenu.component';
import { NgModel } from '@angular/forms/src/directives';

describe('ListmenuComponent', () => {
  let component: ListmenuComponent;
  let fixture: ComponentFixture<ListmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListmenuComponent ],
      imports: [NgModel]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

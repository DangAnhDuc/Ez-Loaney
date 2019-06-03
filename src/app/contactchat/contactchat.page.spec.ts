import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactchatPage } from './contactchat.page';

describe('ContactchatPage', () => {
  let component: ContactchatPage;
  let fixture: ComponentFixture<ContactchatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactchatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactchatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

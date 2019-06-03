import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlistingPage } from './userlisting.page';

describe('UserlistingPage', () => {
  let component: UserlistingPage;
  let fixture: ComponentFixture<UserlistingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserlistingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlistingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

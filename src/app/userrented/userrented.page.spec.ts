import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrentedPage } from './userrented.page';

describe('UserrentedPage', () => {
  let component: UserrentedPage;
  let fixture: ComponentFixture<UserrentedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserrentedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserrentedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

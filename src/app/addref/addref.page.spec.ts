import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrefPage } from './addref.page';

describe('AddrefPage', () => {
  let component: AddrefPage;
  let fixture: ComponentFixture<AddrefPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrefPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

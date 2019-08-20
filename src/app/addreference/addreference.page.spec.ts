import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreferencePage } from './addreference.page';

describe('AddreferencePage', () => {
  let component: AddreferencePage;
  let fixture: ComponentFixture<AddreferencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddreferencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreferencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

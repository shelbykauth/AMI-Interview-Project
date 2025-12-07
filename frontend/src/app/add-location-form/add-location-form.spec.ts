import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationForm } from './add-location-form';

describe('AddLocationForm', () => {
  let component: AddLocationForm;
  let fixture: ComponentFixture<AddLocationForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLocationForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLocationForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

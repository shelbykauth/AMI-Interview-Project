import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { LocationsService } from '../locations';

@Component({
  selector: 'app-add-location-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-location-form.html',
  styleUrl: './add-location-form.css',
})
export class AddLocationForm {
  protected readonly locationService = inject(LocationsService);
  protected readonly formControls: FormGroup = new FormGroup({
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
  });

  addLocation() {
    this.locationService.addLocation(this.formControls.value);
  }
}

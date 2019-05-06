import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'my-app',
  template: `
   <form [formGroup]="myForm">
  
  <div formArrayName="phones">

      <div *ngFor="let phone of phoneForms.controls; let i=index" 
            [formGroupName]="i">

          <input formControlName="area">
          <input formControlName="prefix">
          <input formControlName="line">

          <button (click)="deletePhone(i)">Delete</button>

      </div>
  </div>

  <button (click)="addPhone()">Add Phone Number</button>

</form>
  `,
})
export class AppComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      email: '',
      phones: this.fb.array([this.createItem()])
    })

    console.log(this.myForm)
  }

  get phoneForms() {
    return this.myForm.get('phones') as FormArray
  }

  createItem(): FormGroup {
    return this.fb.group({
      area: [],
      prefix: [],
      line: [],
    });
  }

  addPhone() {
    const phone = this.fb.group({
      area: [],
      prefix: [],
      line: [],
    })

    this.phoneForms.push(phone);
    console.log(this.myForm)
  }

  deletePhone(i) {
    this.phoneForms.removeAt(i)
    console.log(this.myForm)

  }
}

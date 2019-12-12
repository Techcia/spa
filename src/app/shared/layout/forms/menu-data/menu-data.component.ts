import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'form-menu-data',
  templateUrl: './menu-data.component.html',
  styleUrls: ['./menu-data.component.scss']
})
export class MenuDataComponent implements OnInit {

  formMenu: FormGroup;
  daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  @Output() nextStep = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formMenu = this.fb.group({
      name: ['', Validators.required],
      startActivationDate: ['', Validators.required],
      endActivationDate: ['', Validators.required],
      openning: this.fb.array([
        this.fb.group({
          weekDay: [1, Validators.required],
          startHour: ['', Validators.required],
          endHour: ['', Validators.required],
        }),
        this.fb.group({
          weekDay: [2, Validators.required],
          startHour: ['', Validators.required],
          endHour: ['', Validators.required],
        }),

        this.fb.group({
          weekDay: [3, Validators.required],
          startHour: ['', Validators.required],
          endHour: ['', Validators.required],
        }),

        this.fb.group({
          weekDay: [4, Validators.required],
          startHour: ['', Validators.required],
          endHour: ['', Validators.required],
        }),
        this.fb.group({
          weekDay: [5, Validators.required],
          startHour: ['', Validators.required],
          endHour: ['', Validators.required],
        }),
        this.fb.group({
          weekDay: [6, Validators.required],
          startHour: ['', Validators.required],
          endHour: ['', Validators.required],
        }),
        this.fb.group({
          weekDay: [7, Validators.required],
          startHour: ['', Validators.required],
          endHour: ['', Validators.required],
        }),
      ])
    })
  }

  onSubmit() {
    if (!this.formMenu.valid)
      return false;

    this.nextStep.emit({ formName: 'formMenu', form: this.formMenu });
  }

}

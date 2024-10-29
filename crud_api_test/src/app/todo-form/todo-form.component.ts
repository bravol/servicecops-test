import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
    this.todoForm = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
        ],
      ],
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    if (this.todoForm.valid) {
      console.log('hello');
      this.todoForm.reset();
    }
  }
}

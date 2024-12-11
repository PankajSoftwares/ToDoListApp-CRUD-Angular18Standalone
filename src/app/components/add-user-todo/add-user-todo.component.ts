import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user-todo',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './add-user-todo.component.html',
  styleUrls: ['./add-user-todo.component.css'],
})
export class AddUserTodoComponent {
  redirectToViewTasks(): void {
    this.router.navigate(['/view-user-todo']);
  }

  addTodoForm: FormGroup;
  public states = [
    'Andhra Pradesh',
   'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands'
  ];

  constructor(private todoService: TodoService, private router: Router) {
    this.addTodoForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.min(3), Validators.max(25)]),
      age: new FormControl('', [Validators.required,Validators.min(3), Validators.max(100)]),
      state: new FormControl(''),
      task: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    });
  }

  ngOnInit() {
    console.log('Todos from service on Init:', this.todoService.getTodos());
  }

  onSubmit() {
    if (this.addTodoForm.valid) {
      this.todoService.addTodo(this.addTodoForm.value);
      alert('Todo added successfully!');
      this.router.navigate(['/view-user-todo']);
    }
  }
}

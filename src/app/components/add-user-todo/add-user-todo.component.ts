import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { Observable, startWith, map, of } from 'rxjs';

@Component({
  selector: 'app-add-user-todo',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule],
  templateUrl: './add-user-todo.component.html',
  styleUrls: ['./add-user-todo.component.css'],
})
export class AddUserTodoComponent {
  addTodoForm: FormGroup;
  filteredStates: Observable<string[]> = of([]);
  showDropdown = false; // Controls dropdown visibility

  public states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands'
  ];

  constructor(private todoService: TodoService, private router: Router) {
    this.addTodoForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      age: new FormControl('', [Validators.required, Validators.min(3), Validators.max(100)]),
      state: new FormControl(''),
      task: new FormControl('', [Validators.required, Validators.maxLength(150)]),
    });

    this.filteredStates = this.addTodoForm.controls['state'].valueChanges.pipe(
      startWith(''),
      map(value => (value.length > 0 ? this.filterStates(value) : [])) // Hide list when empty
    );
  }

  private filterStates(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(state => state.toLowerCase().includes(filterValue));
  }

  selectState(state: string) {
    this.addTodoForm.controls['state'].setValue(state);
    this.showDropdown = false; // Hide dropdown after selection
  }

  hideDropdown() {
    setTimeout(() => this.showDropdown = false, 200); // Small delay to allow click selection
  }

  onSubmit() {
    if (this.addTodoForm.valid) {
      this.todoService.addTodo(this.addTodoForm.value);
      alert('Todo added successfully!');
      this.router.navigate(['/view-user-todo']);
    }
  }
}

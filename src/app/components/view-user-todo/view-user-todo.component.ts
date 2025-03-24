  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { TodoService } from '../../services/todo.service';
  import { CommonModule } from '@angular/common';
  import { ReactiveFormsModule } from '@angular/forms';

  @Component({
    selector: 'app-view-user-todo',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './view-user-todo.component.html',
    styleUrls: ['./view-user-todo.component.css'],
  })
  export class ViewUserTodoComponent implements OnInit {
    todos: any[] = [];
    selectedTodo: any = null;
    editTodoForm!: FormGroup;
    isBulkEditDisabled = false;
  
    // List of predefined Indian states
    states: string[] = [
      'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
      'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
      'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
      'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
      'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ];
    filteredStates: string[] = [];
  
    constructor(
      private todoService: TodoService,
      private fb: FormBuilder,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.loadTodos();
      this.initEditForm();
  
      // Reload todos when navigating within the app
      this.router.events.subscribe(() => {
        this.loadTodos();
      });
    }
  
    loadTodos(): void {
      this.todos = this.todoService.getTodos();
    }
  
    initEditForm(): void {
      this.editTodoForm = this.fb.group({
        name: ['', [Validators.required]],
        age: [
          '',
          [Validators.required, Validators.min(0), Validators.max(100)] // Age must be between 0 and 100
        ],
        state: [''],
        task: ['', [Validators.required, Validators.maxLength(100)]],
      });      
    }
  
    // Filter states based on user input
    filterStates(): void {
      const query = this.editTodoForm.get('state')?.value.toLowerCase() || '';
      this.filteredStates = this.states.filter(state => 
        state.toLowerCase().includes(query)
      );
    }
  
    // Select a state and close the dropdown
    selectState(state: string): void {
      this.editTodoForm.patchValue({ state });
      this.filteredStates = []; // Hide dropdown after selection
    }
  
    // editTodo(todo: any): void {
    //   this.selectedTodo = { ...todo };
    //   this.editTodoForm.patchValue({
    //     name: this.selectedTodo.name,
    //     age: this.selectedTodo.age,
    //     state: this.selectedTodo.state,
    //     task: this.selectedTodo.task,
    //   });
    // }

    // editTodo(todo: any): void {
    //   this.selectedTodo = { ...todo };
    //   this.editTodoForm.setValue({
    //     name: this.selectedTodo.name || '',
    //     age: this.selectedTodo.age ? Number(this.selectedTodo.age).toFixed(0) : '',
    //     state: this.selectedTodo.state || '',
    //     task: this.selectedTodo.task || '',
    //   });
    
    //   // Mark all controls as touched to trigger validation immediately
    //   Object.keys(this.editTodoForm.controls).forEach(field => {
    //     const control = this.editTodoForm.get(field);
    //     control?.markAsTouched();
    //     control?.updateValueAndValidity();
    //   });
    // }
    
    editTodo(todo: any): void {
      this.selectedTodo = { ...todo };
    
      let validAge = this.selectedTodo.age;
      if (validAge > 100) validAge = 100;
      if (validAge < 0) validAge = 0;
    
      this.editTodoForm.setValue({
        name: this.selectedTodo.name || '',
        age: validAge.toString(), // Ensure it's a valid string for input
        state: this.selectedTodo.state || '',
        task: this.selectedTodo.task || '',
      });
    
      // Mark form fields as touched to trigger validation messages
      Object.keys(this.editTodoForm.controls).forEach(field => {
        const control = this.editTodoForm.get(field);
        control?.markAsTouched();
        control?.updateValueAndValidity();
      });
    }
    
    
  
    onEditSubmit(): void {
      if (this.editTodoForm.valid && this.selectedTodo) {
        const updatedTodo = { ...this.selectedTodo, ...this.editTodoForm.value };
        const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
          this.todoService.updateTodo(updatedTodo);
        }
        this.closeModal();
      }
    }
  
    closeModal(): void {
      this.editTodoForm.reset();
      this.selectedTodo = null;
    }
  
    toggleSelectAll(event: Event): void {
      const isChecked = (event.target as HTMLInputElement).checked;
      this.todos.forEach(todo => (todo.selected = isChecked));
      this.updateEditState();
    }
  
    isAllSelected(): boolean {
      return this.todos.every(todo => todo.selected);
    }
  
    onCheckboxChange(todo: any): void {
      todo.selected = !todo.selected;
      this.updateEditState();
    }
  
    updateEditState(): void {
      const selectedCount = this.todos.filter(todo => todo.selected).length;
      this.isBulkEditDisabled = selectedCount > 1;
      this.todos.forEach(todo => {
        todo.isEditDisabled = todo.selected && this.isBulkEditDisabled;
      });
    }
  
    deleteTodo(todo: any): void {
      if (todo.selected) {
        const selectedTodos = this.todos.filter(t => t.selected);
        if (selectedTodos.length > 1) {
          if (confirm('Are you sure you want to delete all selected tasks?')) {
            selectedTodos.forEach(selectedTodo =>
              this.todoService.deleteTodo(selectedTodo.id)
            );
          }
        } else {
          if (confirm(`Are you sure you want to delete task "${todo.task}"?`)) {
            this.todoService.deleteTodo(todo.id);
          }
        }
      } else {
        if (confirm(`Are you sure you want to delete task "${todo.task}"?`)) {
          this.todoService.deleteTodo(todo.id);
        }
      }
      this.loadTodos();
      this.updateEditState();
    }
  
    redirectToAddTask(): void {
      this.router.navigateByUrl('/app-add-user-todo');
    }
  }

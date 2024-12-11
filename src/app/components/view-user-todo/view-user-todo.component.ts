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

    constructor(
      private todoService: TodoService,
      private fb: FormBuilder,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.loadTodos();
      this.initEditForm();
      this.updateActionState();

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
        age: ['', [Validators.required, Validators.min(3)]],
        state: [''],
        task: ['', [Validators.required, Validators.maxLength(100)]],
      });
    }

    toggleSelectAll(event: Event): void {
      const isChecked = (event.target as HTMLInputElement).checked;
      this.todos.forEach(todo => (todo.selected = isChecked));
      this.updateActionState();
    }

    isAllSelected(): boolean {
      return this.todos.every(todo => todo.selected);
    }

    onCheckboxChange(todo: any): void {
      todo.selected = !todo.selected;
      this.updateActionState();
    }

    updateActionState(): void {
      const selectedCount = this.todos.filter(todo => todo.selected).length;
      this.isBulkEditDisabled = selectedCount > 1;
      this.todos.forEach(todo => {
        todo.isEditDisabled = todo.selected && this.isBulkEditDisabled;
      });
    }

    editTodo(todo: any): void {
      this.selectedTodo = { ...todo };
      this.editTodoForm.patchValue({
        name: this.selectedTodo.name,
        age: this.selectedTodo.age,
        state: this.selectedTodo.state,
        task: this.selectedTodo.task,
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
      this.updateActionState();
    }


    deleteSelectedTodos(): void {
      const selectedTodos = this.todos.filter(todo => todo.selected);
      if (selectedTodos.length > 0) {
        if (confirm('Are you sure you want to delete all selected tasks?')) {
          selectedTodos.forEach(todo => this.todoService.deleteTodo(todo.id));
          this.loadTodos();
          this.updateActionState();
        }
      } else {
        alert('No tasks are selected for deletion.');
      }
    }


    redirectToAddTask(): void {
      this.router.navigate(['/app-add-user-todo']);
    }
  }

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: any[] = [];

  private generateId(): number {
    return Date.now();
  }

  getTodos(): any[] {
    return [...this.todos];
  }


  addTodo(todo: any): void {
    const todoWithId = { ...todo, id: this.generateId() };
    this.todos.push(todoWithId);
    this.syncTodos();
  }


  //instead use splic
  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.syncTodos();
  }

  updateTodo(updatedTodo: any): boolean {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.syncTodos();
      return true;
    }
    return false;
  }

  private syncTodos(): void {
    // Keeps the todos in sync for the session (could integrate persistent storage here if needed)
  }
}

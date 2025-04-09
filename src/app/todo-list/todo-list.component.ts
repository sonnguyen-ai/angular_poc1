// src/app/todo-list/todo-list.component.ts
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TodoListComponent {
  todos: Todo[] = [];
  newTodoText = '';
  filter: 'all' | 'active' | 'completed' = 'all';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Only try to load from localStorage if we're in the browser
    if (this.isBrowser) {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
      }
    }
  }

  addTodo(): void {
    if (this.newTodoText.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now(),
      text: this.newTodoText,
      completed: false
    };
    
    this.todos.push(newTodo);
    this.newTodoText = '';
    this.saveTodos();
  }

  toggleTodo(todo: Todo): void {
    todo.completed = !todo.completed;
    this.saveTodos();
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveTodos();
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filter = filter;
  }

  get filteredTodos(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else {
      return this.todos.filter(todo => todo.completed);
    }
  }

  get activeTodosCount(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  get completedTodosCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  private saveTodos(): void {
    // Only try to save to localStorage if we're in the browser
    if (this.isBrowser) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
}
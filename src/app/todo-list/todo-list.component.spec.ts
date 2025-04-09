// src/app/todo-list/todo-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';
import { PLATFORM_ID } from '@angular/core';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, TodoListComponent],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new todo when addTodo is called with valid text', () => {
    // Arrange
    component.newTodoText = 'Test Todo';
    const initialLength = component.todos.length;
    
    // Act
    component.addTodo();
    
    // Assert
    expect(component.todos.length).toBe(initialLength + 1);
    expect(component.todos[component.todos.length - 1].text).toBe('Test Todo');
    expect(component.newTodoText).toBe('');
  });

  it('should not add a todo when text is empty', () => {
    // Arrange
    component.newTodoText = '   ';
    const initialLength = component.todos.length;
    
    // Act
    component.addTodo();
    
    // Assert
    expect(component.todos.length).toBe(initialLength);
  });

  it('should toggle todo completion status', () => {
    // Arrange
    const todo = { id: 1, text: 'Test Todo', completed: false };
    component.todos = [todo];
    
    // Act
    component.toggleTodo(todo);
    
    // Assert
    expect(todo.completed).toBe(true);
    
    // Act again (toggle back)
    component.toggleTodo(todo);
    
    // Assert
    expect(todo.completed).toBe(false);
  });

  it('should delete a todo', () => {
    // Arrange
    const todo1 = { id: 1, text: 'Test Todo 1', completed: false };
    const todo2 = { id: 2, text: 'Test Todo 2', completed: true };
    component.todos = [todo1, todo2];
    
    // Act
    component.deleteTodo(1);
    
    // Assert
    expect(component.todos.length).toBe(1);
    expect(component.todos[0].id).toBe(2);
  });

  it('should clear completed todos', () => {
    // Arrange
    const todo1 = { id: 1, text: 'Test Todo 1', completed: false };
    const todo2 = { id: 2, text: 'Test Todo 2', completed: true };
    const todo3 = { id: 3, text: 'Test Todo 3', completed: true };
    component.todos = [todo1, todo2, todo3];
    
    // Act
    component.clearCompleted();
    
    // Assert
    expect(component.todos.length).toBe(1);
    expect(component.todos[0].id).toBe(1);
  });

  it('should filter todos correctly', () => {
    // Arrange
    const todo1 = { id: 1, text: 'Test Todo 1', completed: false };
    const todo2 = { id: 2, text: 'Test Todo 2', completed: true };
    const todo3 = { id: 3, text: 'Test Todo 3', completed: false };
    component.todos = [todo1, todo2, todo3];
    
    // Test 'all' filter
    component.setFilter('all');
    expect(component.filteredTodos.length).toBe(3);
    
    // Test 'active' filter
    component.setFilter('active');
    expect(component.filteredTodos.length).toBe(2);
    expect(component.filteredTodos[0].id).toBe(1);
    expect(component.filteredTodos[1].id).toBe(3);
    
    // Test 'completed' filter
    component.setFilter('completed');
    expect(component.filteredTodos.length).toBe(1);
    expect(component.filteredTodos[0].id).toBe(2);
  });

  it('should calculate active todos count correctly', () => {
    // Arrange
    const todo1 = { id: 1, text: 'Test Todo 1', completed: false };
    const todo2 = { id: 2, text: 'Test Todo 2', completed: true };
    const todo3 = { id: 3, text: 'Test Todo 3', completed: false };
    component.todos = [todo1, todo2, todo3];
    
    // Assert
    expect(component.activeTodosCount).toBe(2);
  });

  it('should calculate completed todos count correctly', () => {
    // Arrange
    const todo1 = { id: 1, text: 'Test Todo 1', completed: false };
    const todo2 = { id: 2, text: 'Test Todo 2', completed: true };
    const todo3 = { id: 3, text: 'Test Todo 3', completed: true };
    component.todos = [todo1, todo2, todo3];
    
    // Assert
    expect(component.completedTodosCount).toBe(2);
  });
});
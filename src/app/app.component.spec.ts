// src/app/app.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TodoListComponent, FormsModule],
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the title 'Todo App'`, () => {
    expect(app.title).toEqual('Todo App');
  });

  it('should render the todo-list component', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-todo-list')).not.toBeNull();
  });
});
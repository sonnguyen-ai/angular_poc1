// src/app/app.component.ts
import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [TodoListComponent]
})
export class AppComponent {
  title = 'Todo App';
}
import { Component, Inject } from '@angular/core';
import { Event, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TodoModule } from './todo/todo.module';
import { FormComponent } from "./todo/form/form.component";
import { ListComponent } from "./todo/list/list.component";
import { CommonModule } from '@angular/common';
import { ITodo } from './models/model';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo/todo.service';
import { AuthService } from './todo/todo.auth';
import { StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoModule, FormComponent, ListComponent, CommonModule, FormsModule, RouterLink,StoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent {
  title = 'todo-app';
  todoItems: ITodo[] = [];

  constructor(@Inject(TodoService) private todoService: TodoService, @Inject(AuthService) public authService: AuthService, private router: Router) {
  
  }

  ngOnInit(): void {
    this.todoItems = this.todoService.getTodos();
  }

  addTodo(value: ITodo): void {
    this.todoService.addTodo(value);
    this.todoItems = this.todoService.getTodos();
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

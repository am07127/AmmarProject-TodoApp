import { Injectable } from '@angular/core';
import { ITodo, Priority } from '../models/model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class TodoService {
  private todos: ITodo[] = [
    { _id: "1", title: 'Sample Task 1', description: 'Description 1', priority: Priority.LOW, date: new Date('2022-04-25') },
    { _id: "2", title: 'Sample Task 2', description: 'Description 2', priority: Priority.HIGH, date: new Date('2022-04-26') }
  ];


  completed: ITodo[] = [];
  private completedSubject = new BehaviorSubject<ITodo[]>([]);
  completed$ = this.completedSubject.asObservable();


  constructor(private http: HttpClient) { }

  getTodos(): ITodo[] {
    return [...this.todos];
  }

  getAsyncTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>('https://shrimo.com/fake-api/todos');
  }



  addTodo(todo: ITodo): Observable<{ message: string, data: ITodo }> {
    console.log('I was called with:', todo);
    const payload = {
      ...todo,
      dueDate: '2024-12-31',
      priority: 'Medium',
      status: 'Not Started',
      tags: []
    };

    return this.http.post<{
      message: string,
      data: ITodo
    }>('https://shrimo.com/fake-api/todos', payload);

    // Remove the .subscribe() - let the effect handle it
  }

  deleteTodo(_id: string): void {
    this.http.delete(`https://shrimo.com/fake-api/todos/${_id}`).subscribe({
      next: (response) => {
        console.log('Todo deleted successfully:', response);
        this.completed.push((response as { data: any }).data);
        this.completedSubject.next([...this.completed]);

      },
      error: (err) => {
        console.error('Error deleting todo:', err);
      },
      complete: () => {
        console.log('Todo deletion completed');
      }
    });
  }

  completeTodo(index: number): void {
    const todo = this.todos.splice(index, 1)[0];
    if (todo) this.completed.push(todo);
  }

  saveTodos(): void {
    // Simulate saving to backend
    console.log('Todos saved:', this.todos, this.completed);
  }
}
import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";

import { Observable } from "rxjs";

import { ITodo } from "../../models/model";
import { addTodo } from "./todo.actions";

@Injectable({
  providedIn: 'root'
})
export class TodoStoreService {
  constructor(private store: Store) {}

  addTodo(todo: ITodo): void {
    // Dispatch the addTodo action to the store
    console.log('Dispatching addTodo action with:', todo);
    this.store.dispatch(addTodo({ todo }));
  }

}   
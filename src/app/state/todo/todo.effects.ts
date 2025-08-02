import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { TodoService } from "../../todo/todo.service";

import { addTodo,todoAdded, todoAddFailed } from "./todo.actions";


@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {
    console.log('TodoEffects created, actions$ is:', actions$);
  }

  addTodo$ = createEffect(() =>
  
  this.actions$.pipe(
    ofType(addTodo),
    switchMap(action =>
      this.todoService.addTodo(action.todo).pipe(
        map(response => todoAdded({ todo: response.data })),
        catchError(error => of(todoAddFailed({ error: error.message })))
      )
    )
  )
);

 


}
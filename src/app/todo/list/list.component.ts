import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { ITodo } from '../../models/model';
import { TodoService } from '../todo.service';
import { TodoStoreService } from '../../state/todo/todo.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, AsyncPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements AfterViewInit, OnDestroy {
  // @Input() todoItems: ITodo[] = [];
  completedItems: ITodo[] = [];
  private autoSaveInterval: any;
  todoItems$!: Observable<ITodo[]>; 

  @ViewChild('newTaskInput') newTaskInput!: ElementRef;

  constructor(@Inject(TodoService) private todoService: TodoService, private todoFacade: TodoStoreService) {}

  

  ngOnInit(): void {
    this.todoItems$ = this.todoFacade.alltodos$;
  }


  ngAfterViewInit(): void {
    if (this.newTaskInput) {
      this.newTaskInput.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
    }
  }

  async onDelete(_id: string): Promise<void> {
    this.todoService.deleteTodo(_id);
    this.todoService.getAsyncTodos().subscribe(todos => {
      // this.todoItems = todos;
      this.todoService.completed$.subscribe(completed => {
        this.completedItems = completed;
        console.log('The completed items have been updated:', this.completedItems);
      });
    });
  }
}
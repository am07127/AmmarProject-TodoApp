import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { ITodo } from '../../models/model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() todoItems: ITodo[] = [];
  completedItems: ITodo[] = [];
  private autoSaveInterval: any;

  @ViewChild('newTaskInput') newTaskInput!: ElementRef;

  constructor(@Inject(TodoService) private todoService: TodoService) {}

  ngOnInit(): void {
    if (this.todoItems.length === 0) {
      this.todoService.getAsyncTodos().subscribe(todos => {
        this.todoItems = todos;
      });
    }
    this.autoSaveInterval = setInterval(() => {
      this.todoService.saveTodos();
    }, 5000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.todoService.getAsyncTodos().subscribe(todos => {
      this.todoItems = todos;
    });
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
      this.todoItems = todos;
      this.todoService.completed$.subscribe(completed => {
        this.completedItems = completed;
        console.log('The completed items have been updated:', this.completedItems);
      });
    });
  }
}
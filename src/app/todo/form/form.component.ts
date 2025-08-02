import { Component, EventEmitter, Output } from '@angular/core';
import { ITodo, Priority } from '../../models/model'
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from '../todo.service';
import { Router } from '@angular/router';
import { StepperStep } from '../../models/step';
import { StepperComponent } from '../stepper/stepper.component';
import { TodoStoreService } from '../../state/todo/todo.store';
import { Observable } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, NgFor, StepperComponent, StoreModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  title: string = '';
  description: string = '';
  priority: Priority | null = Priority.LOW;
  date?: Date;

  constructor(private snackBar: MatSnackBar, private todoService: TodoService, private router: Router, private todoFacade: TodoStoreService) {}

  priorities: Priority[] = [Priority.LOW, Priority.MEDIUM, Priority.HIGH];
  
  @Output() onSubmit: EventEmitter<ITodo> = new EventEmitter<ITodo>();

   stepList: StepperStep[] = [
    {
      label: 'Enter Detail',
      content: 'Please fill out your name, age, and contact details.',
      status: 'pending',
      optional: false,
      icon: 'person',
      tooltip: 'Basic user information'
    },
    {
      label: 'Enter Detail',
      content: 'Enter your current residential address.',
      status: 'pending',
      optional: false,
      icon: 'home',
      tooltip: 'Location and mailing address'
    },
    {
      label: 'Enter Detail',
      content: 'List your last 3 jobs and duration.',
      status: 'pending',
      optional: true,
      icon: 'work',
      tooltip: 'Optional employment data'
    },
    {
      label: 'Enter Detail',
      content: 'Provide your educational background.',
      status: 'pending',
      optional: true,
      icon: 'school',
      tooltip: 'Optional education details'
    },
    {
      label: 'Enter Detail',
      content: 'Share your skills and certifications.',
      status: 'pending',
      optional: true,
      icon: 'star',
      tooltip: 'Optional skills and certifications'
    },
    {
      label: 'Enter Detail',
      content: 'Review and submit your information.',
      status: 'pending',
      optional: false,
      icon: 'check_circle',
      tooltip: 'Final review before submission'
    }
  ];

currentStep = 0; // This will mark Step 2 as In Progress



  // onChangeTitle(event: any): void {
  //   this.title = event.target.value;
  // }

  // onChangeDesc(event: any): void {
  //   this.description = event.target.value;
  // }
 


  onSubmitForm(): void {
    this.onClickNextStep();
    if (!this.title || !this.title.trim()) {
      this.showErrorToast('Title is required');
      return;
    }
      const newTodo: ITodo = {
        _id: Date.now().toString(), // Using timestamp as a unique ID
        title: this.title,
        description: this.description,
        priority: this.priority || Priority.LOW, // Default to LOW if no priority is set
        date: this.date ? new Date(this.date) : undefined
      };  
      // this.onSubmit.emit(newTodo);
      this.todoFacade.addTodo(newTodo);
      this.router.navigate(['/list']);
      this.title = '';
      this.description = '';
      this.priority = Priority.LOW; // Reset to default priority
      this.date = undefined; // Reset date
      this.showSuccessToast('Todo item added successfully');
    }

  private showErrorToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['error-toast']
    });
  }

  private showSuccessToast(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-toast']
    });
  }

  onClickNextStep(): void {
    if (this.currentStep < this.stepList.length - 1) {
      this.stepList[this.currentStep].status = 'completed';
      if (this.currentStep + 1 < this.stepList.length) {
        this.stepList[this.currentStep + 1].status = 'in-progress';
      }
      this.currentStep++;
    } else {
      this.stepList[this.currentStep].status = 'completed';
      this.showSuccessToast('You have completed all steps!');
    }
  }

  whenStepChange(event: any): void {
    console.log('Step changed:', event);
  }
}

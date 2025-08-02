// stepper.component.ts
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { StepperStep } from '../../models/step';
import { StepIconComponent } from '../step-icon/step-icon.component';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    StepIconComponent
    
  ],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent{
  @Input() steps: StepperStep[] = [];
  @Input() currentStepIndex: number = 0;
  @Output() OnStepChange: EventEmitter<number> = new EventEmitter<number>();

  getActualStepStatus(index: number): string {
    if (index < this.currentStepIndex) {
      return 'completed';
    } else if (index === this.currentStepIndex) {
      return 'in-progress';
    } else {
      return 'pending';
    }
  }
  
  

  getStepState(status: string): string {
    switch (status) {
      case 'completed':
        return 'done';
      case 'in-progress':
        return 'edit';
      case 'pending':
      default:
        return 'number';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'pending':
      default:
        return 'Pending';
    }
  }

 
}
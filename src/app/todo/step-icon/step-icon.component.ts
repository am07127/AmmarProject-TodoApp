import { NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-step-icon',
  standalone: true,
  imports: [NgClass,NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './step-icon.component.html',
  styleUrl: './step-icon.component.scss'
})
export class StepIconComponent {

  @Input() status: string = 'pending'; // Default status
  @Input() stepNumber: number = 1;

  getIconClass(): string {
    return `icon-${this.status}`;
  }

}




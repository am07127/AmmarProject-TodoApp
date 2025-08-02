// stepper.model.ts


export interface StepperStep {
  label: string;
  content: string;
  status: 'pending' | 'in-progress' | 'completed';
  optional?: boolean;
  icon?: string;
  tooltip?: string;
}
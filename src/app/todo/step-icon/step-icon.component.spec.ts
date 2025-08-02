import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepIconComponent } from './step-icon.component';

describe('StepIconComponent', () => {
  let component: StepIconComponent;
  let fixture: ComponentFixture<StepIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

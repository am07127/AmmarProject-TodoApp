import { Routes } from '@angular/router';
import { FormComponent } from './todo/form/form.component';
import { ListComponent } from './todo/list/list.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { LoginComponent } from './todo/login/login.component';
import { StepperComponent } from './todo/stepper/stepper.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path:'form',
        component: FormComponent,
        canActivate: [AuthGuard] // Ensure the user is authenticated before accessing the form
    },
    {
        path: 'list',
        component: ListComponent,
        canActivate: [AuthGuard] // Ensure the user is authenticated before accessing the list
    },
    {
        path: 'login',
        component: LoginComponent

    },
    {
        path: 'stepper',
        component: StepperComponent
    }
];

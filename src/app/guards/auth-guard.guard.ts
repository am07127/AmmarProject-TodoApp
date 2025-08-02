import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router } from '@angular/router';

import { AuthService } from '../todo/todo.auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad  {
  constructor(private todoAuth: AuthService, private router: Router) {}

  canActivate(): boolean {
    return this.checkAuth();
  }

  canActivateChild(): boolean {
    return this.checkAuth();
  }


  canLoad(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    if (this.todoAuth.isAuthenticatedUser()) {
      return true;
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }

}
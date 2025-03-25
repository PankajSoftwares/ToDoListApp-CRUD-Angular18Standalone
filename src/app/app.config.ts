import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddUserTodoComponent } from './components/add-user-todo/add-user-todo.component';
import { ViewUserTodoComponent } from './components/view-user-todo/view-user-todo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' }, // Default route redirects to login
  { path: 'login', component: LoginComponent },         // Login route
  { path: 'signup', component: SignupComponent },       // Signup route
  { path: 'logout', component: SignupComponent },         // Login route after logout

  {
    path: 'app-add-user-todo',
    component: AddUserTodoComponent                     // Add User ToDo route
  },
  {
    path: 'view-user-todo',
    component: ViewUserTodoComponent                    // View All User ToDos route
  }
];

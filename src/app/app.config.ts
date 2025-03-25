import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddUserTodoComponent } from './components/add-user-todo/add-user-todo.component';
import { ViewUserTodoComponent } from './components/view-user-todo/view-user-todo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' }, 
  { path: 'signup', component: SignupComponent },       
  { path: 'login', component: LoginComponent },      
  { path: 'app-add-user-todo', component: AddUserTodoComponent }, 
  { path: 'view-user-todo', component: ViewUserTodoComponent }, 

  { path: 'logout', redirectTo: 'login', pathMatch: 'full' }, // Logout should go to login

  { path: '**', redirectTo: 'signup', pathMatch: 'full' }
];

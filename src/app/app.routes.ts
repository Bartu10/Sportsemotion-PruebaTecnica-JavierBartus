import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { UserTaskComponent } from './components/user-task/user-task.component';

export const routes: Routes = [

  {path: '',component: HomeComponent},
  {path: 'users', component: UsersComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'tasks/:id', component: UserTaskComponent},

  {
    path: '**',
    redirectTo: ''
  }



];

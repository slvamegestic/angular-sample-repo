import { Routes } from '@angular/router';
import { TaskComponent } from './task-component/task-component';

import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

export const routes: Routes = [
  { path: '', component: TaskComponent },
  { path: 'task/:id', component: TaskDetailsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserProfileComponent },
];

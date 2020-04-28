import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlMatchResult, UrlSegment } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ProjectListComponent } from './project-list/project-list.component';

export function tokenMatcher(url: UrlSegment[]): UrlMatchResult {
  const token = localStorage.getItem('token');
  return !token && (!url.length || url[0].path !== 'login') ? { consumed: url } : null;
}

const routes: Routes = [
  {
    matcher: tokenMatcher,
    redirectTo: 'login',
    pathMatch: 'prefix'
  },
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'prefix'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'tasks/:slug/:id',
    component: TaskListComponent
  },
  {
    path: 'projects',
    component: ProjectListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

// routes array
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'Users' },
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:id',
    component: UserInfoComponent,
    data: { title: 'User info' },
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:id/edit',
    component: UserEditComponent,
    data: { title: 'Editing of user #' },
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About' },
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: 'Page not found' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

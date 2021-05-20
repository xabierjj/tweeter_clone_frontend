import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
  {path:'login' , component:LoginComponent },
  {path:'home' , component:HomeComponent, canActivate: [AuthGuard] }, 
  {path:'admin' , component: DashboardComponent , canActivate: [AuthGuard,AdminGuard]},
  {path: '**', pathMatch: 'full' , redirectTo:'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =  [LoginComponent,HomeComponent]
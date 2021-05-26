import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminGuard } from './guard/admin.guard';
import { JwtGuard } from './guard/jwt.guard';

const routes: Routes = [
  {path:'login' , component:LoginComponent },
  {path:'home' , component:HomeComponent, canActivate: [JwtGuard] }, 
  {path:'admin' , component: DashboardComponent , canActivate: [JwtGuard,AdminGuard]},
  {path: '**', pathMatch: 'full' , redirectTo:'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =  [LoginComponent,HomeComponent]
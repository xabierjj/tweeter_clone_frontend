import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';
import { SearchComponent } from './components/shared/search/search.component';
import { TweetFormComponent } from './components/tweet-form/tweet-form.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    NavComponent,
    TweetComponent,
    SearchComponent,
    TweetFormComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule,
    FormsModule
  ],
  //sin multi:true da error
  providers: [AuthService,AuthGuard ,AdminGuard ,{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {


 }

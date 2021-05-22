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
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { FeedComponent } from './components/feed/feed.component';
import {NgxsModule}from '@ngxs/store'
import { NgbModule , NgbModal} from '@ng-bootstrap/ng-bootstrap';


import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { UserState } from './store/user.state';
import { UserFormComponent } from './components/admin/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    NavComponent,
    TweetComponent,
    SearchComponent,
    TweetFormComponent,
    DashboardComponent,
    FeedComponent,
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule,
    FormsModule,
    InfiniteScrollModule,
    NgxsModule.forRoot( [UserState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgbModule,
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

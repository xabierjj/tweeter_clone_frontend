import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { AuthGuard } from './guard/auth.guard';
import { SearchComponent } from './components/shared/search/search.component';
import { TweetFormComponent } from './components/tweet-form/tweet-form.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    NavComponent,
    TweetComponent,
    SearchComponent,
    TweetFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService,AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule {


 }

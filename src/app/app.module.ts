import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IntroComponent } from './intro/intro.component';
import { RegisterComponent } from './register/register.component';
import { routing } from './app.routing';
import { AuthGuard } from './shared/auth.guard';
import { LoginService } from './services/login.service';
import { AccountsService } from './services/accounts.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    IntroComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    routing
  ],
  providers: [
    LoginService,
    AccountsService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
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
import { TippComponent } from './tipp/tipp.component';
import { MembersComponent } from './members/members.component';
import { AdminComponent } from './admin/admin.component';
import { AdminTeamsComponent } from './admin/teams/teams.component';
import { routing } from './app.routing';
import { AuthGuard } from './shared/auth.guard';
import { AuthAdminGuard } from './shared/authadmin.guard';
import { LoginService } from './services/login.service';
import { AccountsService } from './services/accounts.service';
import { TeamsService } from './services/teams.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    IntroComponent,
    RegisterComponent,
    TippComponent,
    MembersComponent,
    AdminComponent,
    AdminTeamsComponent,
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
    TeamsService,
    AuthGuard,
    AuthAdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
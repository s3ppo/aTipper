import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule, MdIconRegistry } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IntroComponent } from './intro/intro.component';
import { RegisterComponent } from './register/register.component';
import { TippComponent } from './tipp/tipp.component';
import { MembersComponent } from './members/members.component';
import { AdminComponent } from './admin/admin.component';
import { AdminTeamsComponent } from './admin/teams/teams.component';
import { AdminMatchesComponent } from './admin/matches/matches.component';
import { routing } from './app.routing';
import { AuthGuard } from './shared/auth.guard';
import { AuthAdminGuard } from './shared/authadmin.guard';
import { LoginService } from './services/login.service';
import { MembersService } from './services/members.service';
import { AccountsService } from './services/accounts.service';
import { TeamsService } from './services/teams.service';
import { MatchesService } from './services/matches.service';

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
    AdminMatchesComponent,
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
    MembersService,
    AccountsService,
    TeamsService,
    MatchesService,
    MdIconRegistry,
    AuthGuard,
    AuthAdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule, MdIconRegistry, MdDialog, Overlay, OVERLAY_PROVIDERS, InteractivityChecker } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RankingComponent } from './ranking/ranking.component';
import { IntroComponent } from './intro/intro.component';
import { RegisterComponent } from './register/register.component';
import { TippComponent } from './tipp/tipp.component';
import { TipperComponent } from './tipper/tipper.component';
import { MembersComponent } from './members/members.component';
import { AdminComponent } from './admin/admin.component';
import { AdminTeamsComponent } from './admin/teams/teams.component';
import { AdminMatchesComponent, AdminCategoryDialog } from './admin/matches/matches.component';
import { AdminMembersComponent } from './admin/members/members.component';
import { routing } from './app.routing';
import { AuthGuard } from './shared/auth.guard';
import { AuthAdminGuard } from './shared/authadmin.guard';
import { LoginService } from './services/login.service';
import { MembersService } from './services/members.service';
import { AdminMembersService } from './services/adminmembers.service';
import { AccountsService } from './services/accounts.service';
import { TeamsService } from './services/teams.service';
import { MatchesService } from './services/matches.service';
import { CategoriesService } from './services/categories.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RankingComponent,
    IntroComponent,
    RegisterComponent,
    TippComponent,
    TipperComponent,
    MembersComponent,
    AdminComponent,
    AdminTeamsComponent,
    AdminMatchesComponent,
    AdminCategoryDialog,
    AdminMembersComponent,
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
    CategoriesService,
    AdminMembersService,
    MdIconRegistry,
    MdDialog,
    Overlay,
    OVERLAY_PROVIDERS,
    InteractivityChecker,
    AuthGuard,
    AuthAdminGuard,
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    AdminCategoryDialog
  ]
})
export class AppModule {

}
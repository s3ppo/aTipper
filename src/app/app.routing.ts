import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent }  from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RankingComponent } from './ranking/ranking.component';
import { IntroComponent } from './intro/intro.component';
import { RegisterComponent } from './register/register.component';
import { TippComponent } from './tipp/tipp.component';
import { TipperComponent } from './tipper/tipper.component';
import { MembersComponent } from './members/members.component';
import { AdminComponent } from './admin/admin.component';
import { AdminTeamsComponent } from './admin/teams/teams.component';
import { AdminMatchesComponent } from './admin/matches/matches.component';
import { AdminMembersComponent } from './admin/members/members.component';

import { AuthGuard } from "./shared/auth.guard";
import { AuthAdminGuard } from "./shared/authadmin.guard";

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'introduction', component: IntroComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'ranking', component: RankingComponent, canActivate: [AuthGuard] },
    { path: 'tipp', component: TippComponent, canActivate: [AuthGuard] },
    { path: 'tipp/tipper', component: TipperComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthAdminGuard] },
    { path: 'admin/teams', component: AdminTeamsComponent, canActivate: [AuthAdminGuard] },
    { path: 'admin/matches', component: AdminMatchesComponent, canActivate: [AuthAdminGuard] },
    { path: 'admin/members', component: AdminMembersComponent, canActivate: [AuthAdminGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
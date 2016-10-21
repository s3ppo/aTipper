import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DomSanitizer } from '@angular/platform-browser';

import { TeamsModel } from '../../models/teams';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'Admin_Teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [],
})
export class AdminTeamsComponent implements OnInit {

  constructor(
    private teamsService: TeamsService,
    private _DomSanitizationService: DomSanitizer,
  ){}

  private teamsmodel = new TeamsModel('', null, '');
  private teamsmodelview: TeamsModel[];
  private teams_msg = ['',''];

  selectFile(event): void {
    this.teamsmodel.flag = event.srcElement.files[0];
  }

  doCreateTeam(): void {
    if(this.teamsmodel.flag == null || this.teamsmodel.flag == undefined){
      this.teams_msg[0] = 'error_msg';
      this.teams_msg[1] = 'Bitte eine Flagge hochladen!';
      return;
    }
    let createteamOperation:Observable<TeamsModel>;
    createteamOperation = this.teamsService.create(this.teamsmodel);
    createteamOperation.subscribe(
                            teams => { this.teamsmodel = new TeamsModel('', null, '');
                                       this.teams_msg[0] = 'success_msg';
                                       this.teams_msg[1] = 'Neues Team wurde erfolgreich angelegt.';
                                       this.getAllTeams(); }, 
                            err =>   { this.teams_msg[0] = 'error_msg'
                                       this.teams_msg[1] = 'Neues Team konnte nicht angelegt werden.' });
  }

  getAllTeams(): void {
    this.teamsService.getAll()
                     .subscribe(
                            teams => { this.teamsmodelview = teams }, 
                            err =>   { console.log(err) });
  }

  ngOnInit(): void {
    this.getAllTeams();
  }

}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

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
    private teamsService: TeamsService
  ){}

  private teamsmodel = new TeamsModel('', null, '');
  private teamsmodelview: TeamsModel[];

  selectFile(event): void {
    this.teamsmodel.flag = event.srcElement.files[0];
  }

  doCreateTeam(): void {
    let createteamOperation:Observable<TeamsModel>;
    createteamOperation = this.teamsService.create(this.teamsmodel);
    createteamOperation.subscribe(
                            teams => { this.teamsmodel = new TeamsModel('', null, '') }, 
                            err => {
                                //this.register_msg = err;
                            });
  }

  ngOnInit(): void {
    this.teamsService.getAll()
                     .subscribe(
                            teams => { this.teamsmodelview = teams }, 
                            err => {
                                //this.register_msg = err;
                            });
  }

}
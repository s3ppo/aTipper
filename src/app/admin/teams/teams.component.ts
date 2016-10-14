import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { TeamsModel } from '../../models/teams';
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'Admin_Teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: []
})
export class AdminTeamsComponent {

  constructor(
    private teamsService: TeamsService,
  ){}

  teamsmodel = new TeamsModel('', null, '');

  selectFile(event): void {
    this.teamsmodel.flag = event.srcElement.files[0];
    //this.readThis(this.teamsmodel.flag);
  }

  doCreateTeam(): void {
    let commentOperation:Observable<TeamsModel>;
    commentOperation = this.teamsService.create(this.teamsmodel);
    commentOperation.subscribe(
                            teams => {
                                this.teamsmodel = new TeamsModel('', null, '');
                            }, 
                            err => {
                                //this.register_msg = err;
                            });
  }

}
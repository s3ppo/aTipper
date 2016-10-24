import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { MatchesModelUI, MatchesModel } from '../../models/matches';
import { MatchesService } from '../../services/matches.service';

@Component({
  selector: 'Admin_Matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  providers: [],
})
export class AdminMatchesComponent implements OnInit{

  constructor(
    private teamsService: MatchesService
  ){}

  private matchesmodel = new MatchesModelUI('', '', '', '', '', '', '', '', '', '');
  private matchesmodelview: MatchesModel[];
  private matches_msg = ['', ''];

  doCreateMatch(): void {
    let creatematchOperation:Observable<MatchesModelUI>;
    creatematchOperation = this.teamsService.create(this.matchesmodel);
    creatematchOperation.subscribe(
                            teams => { this.matchesmodel = new MatchesModelUI('', '', '', '', '', '', '', '', '', '');
                                       this.matches_msg[0] = 'success_msg';
                                       this.matches_msg[1] = 'Neues Team wurde erfolgreich angelegt.';
                                       this.getAllMatches(); },
                            err =>   { this.matches_msg[0] = 'error_msg';
                                       this.matches_msg[1] = 'Neues Team konnte nicht angelegt werden.';
                                       this.getAllMatches(); });
  }

  getAllMatches(): void {
    this.teamsService.getAll()
                     .subscribe(
                            matches => { this.matchesmodelview = matches }, 
                            err =>   { console.log(err) });
  }

  ngOnInit(): void {
    this.getAllMatches();
  }

}
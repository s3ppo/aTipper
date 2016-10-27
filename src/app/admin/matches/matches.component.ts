import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { MdDialogRef, MdDialog, Overlay, MdDialogConfig } from '@angular/material';

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
    private matchesService: MatchesService,
    public dialog: MdDialog,
    public viewContainerRef: ViewContainerRef
  ){}

  dialogRef: MdDialogRef<AdminCategoryDialog>;
  private matchesmodel = new MatchesModelUI('', '', '', '', '', '', '', '', '', '', '');
  private matchesmodelview: MatchesModel[];
  private matches_msg = ['', ''];

  doCreateMatch(): void {
    let postmatch = new MatchesModel(this.matchesmodel.team1,this.matchesmodel.team2,this.matchesmodel.category,this.matchesmodel.matchlocation,'','','',parseInt(this.matchesmodel.multiplier));
    let matchdate: Date;
    let hours: number;
    let minutes: number;

    //Prepare Matchstart
    matchdate = new Date(this.matchesmodel.matchstart);
    hours = parseInt(this.matchesmodel.matchstarttime.substring(0,2));
    minutes = parseInt(this.matchesmodel.matchstarttime.substring(3));
    console.log(hours);
    console.log(minutes);
    matchdate.setHours(hours,minutes);
    postmatch.matchstart = matchdate.toUTCString();
    //Prepare Matchend
    matchdate = new Date(this.matchesmodel.matchend);
    hours = parseInt(this.matchesmodel.matchendtime.substring(0,2));
    minutes = parseInt(this.matchesmodel.matchendtime.substring(3));
    matchdate.setHours(hours,minutes);
    postmatch.matchend = matchdate.toUTCString();
    //Prepare Deadline
    matchdate = new Date(this.matchesmodel.deadline);
    hours = parseInt(this.matchesmodel.deadlinetime.substring(0,2));
    minutes = parseInt(this.matchesmodel.deadlinetime.substring(3));
    matchdate.setHours(hours,minutes);
    postmatch.deadline = matchdate.toUTCString();

    let creatematchOperation:Observable<MatchesModelUI>;
    creatematchOperation = this.matchesService.create(postmatch);
    creatematchOperation.subscribe(
                            matches => { this.matchesmodel = new MatchesModelUI('', '', '', '', '', '', '', '', '', '', '');
                                       this.matches_msg[0] = 'success_msg';
                                       this.matches_msg[1] = 'Neues Match wurde erfolgreich angelegt.';
                                       this.getAllMatches(); },
                            err =>   { this.matches_msg[0] = 'error_msg';
                                       this.matches_msg[1] = 'Neues Match konnte nicht angelegt werden.';
                                       this.getAllMatches(); });
  }

  getAllMatches(): void {
    this.matchesService.getAll()
                     .subscribe(
                            matches => { this.matchesmodelview = matches; console.log(matches) }, 
                            err =>   { console.log(err) });
  }

  delMatch(match): void {
    this.matchesService.delete(match)
                         .subscribe(
                            matches => { this.matches_msg[0] = 'success_msg';
                                       this.matches_msg[1] = 'Match wurde erfolgreich gelöscht.'; 
                                       this.getAllMatches(); }, 
                            err =>   { this.matches_msg[0] = 'error_msg';
                                       this.matches_msg[1] = 'Match konnte nicht gelöscht werden.'; });
  }

  ngOnInit(): void {
    this.getAllMatches();
  }

  openAddCategory() {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(AdminCategoryDialog, config);

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('result: ' + result);
      this.dialogRef = null;
    });
  }

}

@Component({
  selector: 'categories-dialog',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [],
})
export class AdminCategoryDialog {

  constructor(
    public dialogRef: MdDialogRef<AdminCategoryDialog>
  ){}

}
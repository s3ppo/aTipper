import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { MembersModel } from '../../models/members';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'Members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: []
})

export class AdminMembersComponent implements OnInit{

  constructor(
    private membersService: MembersService,
  ){}

  private membersmodel: MembersModel[];

  ngOnInit(): void {
    this.membersService.getAll().subscribe(
                                  teams => { this.membersmodel = teams }, 
                                  err =>   { console.log(err) });
  }

}
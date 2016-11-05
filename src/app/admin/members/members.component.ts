import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { AdminMembersModel } from '../../models/adminmembers';
import { AdminMembersService } from '../../services/adminmembers.service';

@Component({
  selector: 'Members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: []
})

export class AdminMembersComponent implements OnInit{

  constructor(
    private adminmembersService: AdminMembersService,
  ){}

  private adminmembersmodel: AdminMembersModel[];

  getAllMembers(): void {
    this.adminmembersService.getAll().subscribe(
                                  adminmembers  => { this.adminmembersmodel = adminmembers },
                                  err           => { console.log(err) });
  }

  ngOnInit(): void {
    this.getAllMembers();
  }

}
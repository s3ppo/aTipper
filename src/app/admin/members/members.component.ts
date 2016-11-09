import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { AdminMembersModel } from '../../models/adminmembers';
import { AdminMembersService } from '../../services/adminmembers.service';
import { AuthService } from '../../services/login.service';

@Component({
  selector: 'Members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MdSnackBar]
})

export class AdminMembersComponent implements OnInit{

  constructor(
    private adminmembersService: AdminMembersService,
    private snackBar: MdSnackBar,
    private viewContainerRef: ViewContainerRef
  ){}

  private adminmembersmodel: AdminMembersModel[];

  getAllMembers(): void {
    this.adminmembersService.getAll().subscribe(
                                  adminmembers  => { this.adminmembersmodel = adminmembers;
                                                     this.setadminflag(); },
                                  err           => { console.log(err) });
  }

  setadminflag(): void {
    this.adminmembersmodel.forEach(element => {
      if(element.roles == "admin") {
        element.admin = true;
      }
    });
  }

  ngOnInit(): void {
    this.getAllMembers();
  }

  changePaid(index: number): void {
    this.adminmembersService.change(this.adminmembersmodel[index], 'paid').subscribe(
                              adminmembers  => { this.adminmembersmodel[index]["_etag"] = adminmembers["_etag"]; },
                              err           => { console.log(err) });
  }

  changeAdmin(index: number): void {
    // User is not allowed to unadmin himself
    if(this.adminmembersmodel[index]['username'] == AuthService.getUserId()) {
      let config = new MdSnackBarConfig(this.viewContainerRef);
      this.snackBar.open('Bad Idea!', 'Close', config);
      return;
    }
    // Prepare roles attribute for service
    if(this.adminmembersmodel[index].admin == true){
      this.adminmembersmodel[index].roles = 'admin';
    } else {
      this.adminmembersmodel[index].roles = 'user';
    }

    this.adminmembersService.change(this.adminmembersmodel[index], 'roles').subscribe(
                              adminmembers  => { this.adminmembersmodel[index]["_etag"] = adminmembers["_etag"]; },
                              err           => { console.log(err) });
  }

}
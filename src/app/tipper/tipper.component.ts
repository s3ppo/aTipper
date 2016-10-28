import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'Tipper',
  templateUrl: './tipper.component.html',
  styleUrls: ['./tipper.component.css'],
  providers: []
})
export class TipperComponent implements OnInit{

  constructor(
    private router: Router,
  ){}


  ngOnInit(): void {

  }

}
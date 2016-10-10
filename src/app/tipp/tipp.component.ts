import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'Tipp',
  templateUrl: './tipp.component.html',
  styleUrls: ['./tipp.component.css'],
  providers: []
})
export class TippComponent {

  constructor(
    private router: Router
  ){}

}
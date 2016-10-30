import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DomSanitizer } from '@angular/platform-browser';

import { MatchesService } from '../services/matches.service'
import { MatchesModel } from '../models/matches';

@Component({
  selector: 'Tipper',
  templateUrl: './tipper.component.html',
  styleUrls: ['./tipper.component.css'],
  providers: []
})
export class TipperComponent implements OnInit{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matchesservice: MatchesService,
    private _DomSanitizationService: DomSanitizer,
  ){}

  private matchesmodelview: MatchesModel[];
  private categoryname: string;
  private numbermatches: string;

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let category = params['category'];
      this.matchesservice.getAll(category)
                     .subscribe(
                            matches => { this.matchesmodelview = matches;
                                         this.categoryname = matches[0]['category']['name'];
                                         this.numbermatches = matches.length.toString(); 
                                        },
                            err =>   { console.log(err) });
    });
  }

}
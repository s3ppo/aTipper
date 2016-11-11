import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DomSanitizer } from '@angular/platform-browser';

import { MatchesService } from '../services/matches.service';
import { TippsService } from '../services/tipps.service';
import { MatchesModel } from '../models/matches';
import { TippsModel } from '../models/tipps';

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
    private tippsservice: TippsService,
    private _DomSanitizationService: DomSanitizer,
  ){}

  private matchesmodelview: MatchesModel[];
  private categoryname: string;
  private tippsmodelview: TippsModel[];

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let category = params['category'];
      this.getAllTipps();
      this.getAllMatches(category);
    });
  }

  getAllMatches(category: string): void {
    //get matches for the selected category
    this.matchesservice.getAll(category)
                    .subscribe(
                          matches => {  this.matchesmodelview = matches;
                                        this.categoryname = matches[0]['category']['name'];
                                        //Parse Date for Output
                                        for(let i=0; i<this.matchesmodelview.length; i++){
                                          this.matchesmodelview[i].matchstart = new Date(this.matchesmodelview[i].matchstart).toLocaleString();
                                        }
                                        this.tippsmodelview = this.createTippsCollection(); },
                          err     => {  });
  }

  getAllTipps(): void {
    //get matches for the selected category
    this.tippsservice.getAll()
                    .subscribe(
                          tipps => { this.tippsmodelview = tipps; },
                          err   => { });
  }

  createTippsCollection(): TippsModel[] {
    let tipperlines = [];
    let tipp1: number;
    let tipp2: number;
    let etag: string;
    for(let i=0; i<this.matchesmodelview.length; i++) {
      tipp1 = 0;
      tipp2 = 0;
      etag = "";
      for(let a=0; a<this.tippsmodelview.length; a++) {
        if(this.tippsmodelview[a].matchid == this.matchesmodelview[i]['_id']) {
          tipp1 = this.tippsmodelview[a].tipp1;
          tipp2 = this.tippsmodelview[a].tipp2;
          etag = this.tippsmodelview[a]['_etag'];
        }
      }
      tipperlines.push(new TippsModel(this.matchesmodelview[i]['_id'], tipp1, tipp2));
      if(etag != "") {
        tipperlines['_etag'] = etag;
      }
    }
    return tipperlines;
  }

  submitTipps(): void {
    this.tippsmodelview.forEach(element => {
      if(!element.hasOwnProperty('_etag')) {
        // Create
        this.tippsservice.create(element)
                        .subscribe(
                            tipps => { element['_etag'] = tipps; console.log(tipps); },
                            err   => { });
      } else {
        // Update

      }
    });
  }

}
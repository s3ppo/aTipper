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

      //get matches for the selected category
      this.matchesservice.getAll(category)
                     .subscribe(
                            matches => { this.matchesmodelview = matches;
                                         this.categoryname = matches[0]['category']['name'];
                                         //Parse Date for Output
                                         for(let i=0; i<this.matchesmodelview.length; i++){
                                           this.matchesmodelview[i].matchstart = new Date(this.matchesmodelview[i].matchstart).toLocaleString();
                                         }
                                         this.tippsmodelview = this.createTippsCollection(this.matchesmodelview); },
                            err =>   { console.log(err) });
    });
  }

  createTippsCollection(matchesmodel): TippsModel[] {
    let tipperlines = [];
    for(let i=0; i<matchesmodel.length; i++) {
      tipperlines.push(new TippsModel(this.matchesmodelview[i]['_id'], 0, 0));
    }
    return tipperlines;
  }

  submitTipps(index): void {
    let createTippOperation:Observable<TippsModel>;
    createTippOperation = this.tippsservice.create(this.tippsmodelview[index]);
    createTippOperation.subscribe(
                            tipps => { },
                            err     => { });
  }

}
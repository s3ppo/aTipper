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
  private loading: boolean;

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let category = params['category'];
      this.getAllTipps(category);
    });
  }

  getAllMatches(category: string, tipps: Array<TippsModel>): void {
    //get matches for the selected category
    this.matchesservice.getAll(category)
                    .subscribe(
                          matches => {  this.categoryname = matches[0]['category']['name'];
                                        this.tippsmodelview = this.createTippsCollection(tipps, matches); 
                                        this.matchesmodelview = matches;
                                        //Parse Date for Output
                                        for(let i=0; i<this.matchesmodelview.length; i++){
                                          this.matchesmodelview[i].matchstart = new Date(this.matchesmodelview[i].matchstart).toLocaleString();
                                        }
                                     },
                          err     => {  });
  }

  getAllTipps(category: string): void {
    //get matches for the selected category
    this.tippsservice.getAll()
                    .subscribe(
                          tipps => { this.getAllMatches(category, tipps); },
                          err   => { });
  }

  createTippsCollection(tipps: Array<TippsModel>, matches: Array<MatchesModel>): TippsModel[] {
    let tippermodel = [];
    let matchexists: boolean;
    let newtipp: TippsModel;

    matches.forEach( matchesline => {
      matchexists = false;
      tipps.forEach( tippsline => {
        if(matchesline['_id'] == tippsline.matchid && matchexists == false) {
          matchexists = true;
          tippermodel.push(tippsline);
        }
      })
      if(matchexists == false) {
        // Create
        newtipp = new TippsModel(matchesline['_id'], -1, -1);
        tippermodel.push(newtipp);
        this.tippsservice.create(newtipp)
                         .subscribe(
                            tipps => { matchesline['_etag'] = tipps['_etag']; matchesline['_id'] = tipps['_id']; },
                            err   => { });
      }

    });
    return tippermodel;
  }

  submitTipps(): void {
    this.tippsmodelview.forEach(element => {
      // Update Tipps
      this.tippsservice.change(element)
                        .subscribe(
                          tipps => { element['_etag'] = tipps['_etag']; },
                          err   => { });
    });
  }

}
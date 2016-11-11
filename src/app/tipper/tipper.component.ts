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
      this.getAllTipps(category);
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
                                        this.tippsmodelview = this.createTippsCollection();},
                          err     => {  });
  }

  getAllTipps(category: string): void {
    //get matches for the selected category
    this.tippsservice.getAll()
                    .subscribe(
                          tipps => { this.tippsmodelview = tipps;
                                     this.getAllMatches(category); },
                          err   => { });
  }

  createTippsCollection(): TippsModel[] {
    let tippermodel = [];
    let matchexists: boolean;
    let newtipp: TippsModel;

    this.matchesmodelview.forEach( matchesline => {

      matchexists = false;
      this.tippsmodelview.forEach( tippsline => {
        if(matchesline['_id'] == tippsline['matchid'] && matchexists == false) {
          matchexists = true;
          tippermodel.push(tippsline);
        }
      })
      if(matchexists == false) {
        // Create
        newtipp = new TippsModel(matchesline['_id'], -1, -1);
        this.tippsservice.create(newtipp)
                         .subscribe(
                            tipps => { newtipp['_etag'] = tipps['_etag']; newtipp['_id'] = tipps['_id'];
                                       tippermodel.push(newtipp); },
                            err   => { });
      }

    });
    return tippermodel;
  }

  submitTipps(): void {
    this.tippsmodelview.forEach(element => {
      if(element.hasOwnProperty('_id')) {
        // Update Tipps
        this.tippsservice.change(element)
                         .subscribe(
                            tipps => { element['_etag'] = tipps['_etag']; },
                            err   => { });
      }
    });
  }

}
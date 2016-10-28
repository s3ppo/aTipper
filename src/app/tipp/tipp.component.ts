import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { CategoriesModel } from '../models/categories';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'Tipp',
  templateUrl: './tipp.component.html',
  styleUrls: ['./tipp.component.css'],
  providers: []
})
export class TippComponent {

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
  ){}

  private categoriesModelAll = [];

  getAllCategories(): void {
    this.categoriesService.getAll()
                     .subscribe(
                            matches => { this.categoriesModelAll = matches }, 
                            err =>   { console.log(err) });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }


}
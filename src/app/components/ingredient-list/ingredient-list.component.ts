import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../../models/ingredient';
import {IngredientService} from '../../services/ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  thePageNumber = 1;
  thePageSize = 5;
  theTotalElements = 0;
  order = 'asc';

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.getIngredients();
  }

  getIngredients() {
    this.ingredientService.getFullIngredientList(this.thePageNumber - 1, this.thePageSize, this.order)
                          .subscribe(this.processResults());
  }

  inverseOrder(): void {
    if (this.order === 'asc') {
      this.order = 'desc';
    } else {
      this.order = 'asc';
    }
    this.getIngredients();
  }

  private processResults() {
    return data  => {
      this.ingredients = data._embedded.ingredients;
      this.thePageNumber = data.page.number + 1;
      this.theTotalElements = data.page.totalElements;
    };
  }

}

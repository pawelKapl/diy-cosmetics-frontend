import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../../models/ingredient';
import {IngredientService} from '../../services/ingredient.service';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private ingredientService: IngredientService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.getIngredients());
  }

  getIngredients() {
    let id: number = +this.route.snapshot.paramMap.get('id');

    if (id > 0) {

      console.log(`ingredient id: ${id}`);

      this.ingredients.splice(0, this.ingredients.length);

      this.ingredientService.getIngredientById(id).subscribe(
        data => this.ingredients.push(data)
      );

    } else {
      this.ingredientService.getFullIngredientList(this.thePageNumber - 1, this.thePageSize, this.order)
        .subscribe(this.processResults());
    }
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

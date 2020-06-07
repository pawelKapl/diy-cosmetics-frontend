import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Ingredient} from '../../models/ingredient';
import {IngredientService} from '../../services/ingredient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {AuthenticationService} from '../../services/authentication.service';

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

  constructor(private ingredientService: IngredientService,
              private route: ActivatedRoute,
              private modal: ConfirmationModalComponent,
              private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.ingredientService.operationSuccessEvent.subscribe(() => this.getIngredients());
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

  inverseOrderAndRefresh(): void {
    this.order = this.order === 'asc' ? 'desc' : 'asc';
    this.ngOnInit();
  }

  private processResults() {
    return data  => {
      this.ingredients = data.content;
      this.thePageNumber = data.number + 1;
      this.theTotalElements = data.totalElements;
    };
  }

  open(content) {
    this.modal.open(content);
  }

  deleteIngredient(ingredient: Ingredient) {
    this.ingredientService.deleteIngredient(ingredient);
  }

  userCheck() {
    return this.authenticationService.isUserLoggedIn();
  }
}

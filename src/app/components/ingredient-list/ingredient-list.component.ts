import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../../models/ingredient';
import {IngredientService} from '../../services/ingredient.service';
import {ActivatedRoute} from '@angular/router';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';

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
              private modal: ConfirmationModalComponent) {}

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
    this.order = this.order === 'asc' ? 'desc' : 'asc';
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

    this.ingredientService.deleteIngredient(ingredient).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError)
    ).subscribe(
      res => console.log('HTTP response', res),
      err => console.log('HTTP Error', JSON.stringify(err)),
      () => console.log('HTTP request completed.')
    );
  }

  private handleError(err: HttpErrorResponse) {
    if (JSON.stringify(err).includes('Data Integrity Violation')) {

      this.modal.open(this.modal);

      return throwError(err.message);
    } else {
      return throwError(err.message);
    }
  }
}

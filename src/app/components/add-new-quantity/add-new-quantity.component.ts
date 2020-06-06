import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ingredient} from '../../models/ingredient';
import {UnitOfMeasure} from '../../models/unit-of-measure';
import {IngredientService} from '../../services/ingredient.service';
import {IngredientQuantityService} from '../../services/ingredient-quantity.service';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {Router} from '@angular/router';
import {IngredientQuantity} from '../../models/ingredient-quantity';

@Component({
  selector: 'app-add-new-quantity',
  templateUrl: './add-new-quantity.component.html',
  styleUrls: ['./add-new-quantity.component.css']
})
export class AddNewQuantityComponent implements OnInit {

  @Input()
  recipeId: number;
  ingredientQuantity: IngredientQuantity = new IngredientQuantity();

  quantityForm: FormGroup;

  ingredientList: Ingredient[] = [];
  unitOfMeasureList: UnitOfMeasure[] = [];

  constructor(private formBuilder: FormBuilder,
              private ingredientService: IngredientService,
              private ingredientQuantityService: IngredientQuantityService,
              private modal: ConfirmationModalComponent,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getIngredientList();
    this.getUnitOfMeasureList();

    this.quantityForm = this.formBuilder.group({
      ingredient: new FormControl(this.ingredientQuantity.ingredient, Validators.required),
      amount: new FormControl(this.ingredientQuantity.amount, [
        Validators.required,
        Validators.max(10000),
        Validators.min(1),
        Validators.pattern('[0-9]+')
      ]),
      unitOfMeasure: new FormControl(this.ingredientQuantity.unitOfMeasure, Validators.required)
    });
  }

  private getIngredientList() {
    this.ingredientService.getFullIngredientList(0, 100, 'asc').subscribe(
      data => this.ingredientList = data.content
    );
  }

  private getUnitOfMeasureList() {
    this.ingredientService.getUnitsOfMeasure().subscribe(
      data => this.unitOfMeasureList = data
    );
  }

  addQuantity() {
    console.log(JSON.stringify(this.quantityForm.value));
    this.ingredientQuantityService.addNewIngredientQuantityToRecipe(this.recipeId, this.quantityForm);
  }

  get ingredient() {
    return this.quantityForm.get('ingredient');
  }

  get amount() {
    return this.quantityForm.get('amount');
  }

  get uom() {
    return this.quantityForm.get('unitOfMeasure');
  }

  open(content) {
    this.modal.open(content);
  }

  reload() {
    setTimeout(() => this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([`/recipe/${this.recipeId}`])), 150);
  }
}

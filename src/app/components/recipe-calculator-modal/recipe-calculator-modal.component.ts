import {Component, Input, OnInit} from '@angular/core';
import {ConfirmationModalComponent} from '../confirmation-modal/confirmation-modal.component';
import {IngredientQuantity} from '../../models/ingredient-quantity';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recipe-calculator-modal',
  templateUrl: './recipe-calculator-modal.component.html',
  styleUrls: ['./recipe-calculator-modal.component.css']
})
export class RecipeCalculatorModalComponent implements OnInit {

  @Input()
  ingredients: IngredientQuantity[];

  userAmountForm: FormGroup;

  constructor(private modal: ConfirmationModalComponent,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.userAmountForm = this.formBuilder.group({
      userAmount: new FormControl(100, [
        Validators.required,
        Validators.max(1000),
        Validators.min(1),
        Validators.pattern('[0-9]+')
      ])
    });
  }

  open(content) {
    this.modal.open(content);
  }

  calculate() {
    console.log(this.userAmount.value);
    this.ingredients.forEach(i => {
      i.calculatedAmount = i.amount * (+this.userAmount.value / 100);
    });
  }

  get userAmount() {
    return this.userAmountForm.get('userAmount');
  }

}

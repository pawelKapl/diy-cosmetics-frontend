import {Component, OnInit} from '@angular/core';
import {IngredientQuantity} from '../../models/ingredient-quantity';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MDBModalRef} from 'angular-bootstrap-md';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-recipe-calculator-modal',
  templateUrl: './recipe-calculator-modal.component.html',
  styleUrls: ['./recipe-calculator-modal.component.css']
})
export class RecipeCalculatorModalComponent implements OnInit {

  ingredients: IngredientQuantity[];

  userAmountForm: FormGroup;

  action: Subject<any> = new Subject<any>();

  constructor(public modalRef: MDBModalRef,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.userAmountForm = this.formBuilder.group({
      userAmount: new FormControl(100, [
        Validators.required,
        Validators.min(1),
        Validators.pattern('[0-9]+')
      ])
    });
  }

  calculate() {
    console.log(this.userAmount.value);
    this.action.next(this.userAmount.value);
    this.ingredients.forEach(i => {
      i.calculatedAmount = i.amount * (+this.userAmount.value / 100);
    });
  }

  get userAmount() {
    return this.userAmountForm.get('userAmount');
  }

}

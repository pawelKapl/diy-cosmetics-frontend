import {Component, Input, OnInit} from '@angular/core';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {IngredientQuantity} from '../../../models/ingredient-quantity';
import {RecipeCalculatorModalComponent} from '../../recipe-calculator-modal/recipe-calculator-modal.component';

@Component({
  selector: 'app-calculator-modal',
  templateUrl: './calculator-modal.component.html',
  styleUrls: ['./calculator-modal.component.css']
})
export class CalculatorModalComponent implements OnInit {

  modalRef: MDBModalRef;

  @Input()
  ingredients: IngredientQuantity[];

  userAmount: any = '100';

  constructor(private modalService: MDBModalService) {
  }

  openModal() {
    this.modalRef = this.modalService.show(RecipeCalculatorModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-left',
      containerClass: '',
      animated: true,
      data: {
        ingredients: this.ingredients
      }
    });
    this.modalRef.content.action.subscribe((result: any) => this.userAmount = result);
  }

  ngOnInit(): void {
  }

}
